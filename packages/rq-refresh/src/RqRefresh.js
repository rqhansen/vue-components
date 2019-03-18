import utils from './utils'

const MAXOFFSETY = 180 //最大滑动距离
let [startY, transLateY, isTouch] = [0, 0, false]

//获取刷新图标的包裹层
function getTargetEle(context) {
    return context['options'].targetEle
}

//判断滚动元素的大小和其相对于视口的位置
function getElementBoundingClientRect(ele) {
    if (!ele) throw new Error('element cant be null')
    return ele.getBoundingClientRect()
}

function getElePosition(context) {
    return (
        context.options.top - getElementBoundingClientRect(context).top ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset
    )
}

//阻止和移除默认事件
function setPreventDefault(e) {
    e.preventDefault()
}

/**
 *
 * @param {方法名称的字符串} methodName
 * @param {监听的事件名称的字符串} eventName
 * @param {监听的事件触发时调用的函数} handler
 *
 * eg:
 * HandlerDefaultListener('addEventListener','touchmove',setPreventDefault);
 * HandlerDefaultListener('removeEventListener','touchmove',setPreventDefault)
 */
function HandlerDefaultListener(methodName, eventName, listener) {
    return document.body[methodName](eventName, listener, { passive: false })
}

//设置偏移样式
function setTransLateY(context, y) {
    getTargetEle(context).style.transform = `translateY(${y / 75}rem)`
}

function touchStart(e) {
    let iconEle = getTargetEle(this).children[0]
    utils.removeClass(iconEle, 'active')
    startY = e.touches[0].clientY
    transLateY = 0
}

function touchMove(e) {
    if (getElePosition(this) > 0) return
    transLateY = parseInt(e.touches[0].clientY - startY)
    /**
     * 阻止默认滑动的条件：
     * 1.第一次滑动
     * 2.下滑
     * 3.scrollTop小于等于0
     */
    if (!isTouch && transLateY > 0) {
        HandlerDefaultListener(
            'addEventListener',
            'touchmove',
            setPreventDefault
        )
    }
    isTouch = true
    if (transLateY > MAXOFFSETY) transLateY = MAXOFFSETY
    setTransLateY(this, transLateY)
}

function touchEnd() {
    if (getElePosition(this) > 0) return
    if (transLateY >= MAXOFFSETY) {
        utils.addClass(getTargetEle(this).children[0], 'static')
        this.options.refresh().then(() => {
            utils.removeClass(getTargetEle(this).children[0], 'static')
            utils.addClass(getTargetEle(this).children[0], 'active')
            setTransLateY(this, 0)
        })
    } else {
        setTransLateY(this, 0)
    }
    HandlerDefaultListener(
        'removeEventListener',
        'touchmove',
        setPreventDefault
    )
    isTouch = false
}
/**
 * 如果有其它意外事件
 */
function touchCancle() {
    setTransLateY(this, 0)
    removePreventDefault()
}

export default {
    bind: function(el, binding) {
        el.options = {}
        if (typeof binding.value === 'function') {
            el.options.refresh = binding.value
        }
    },
    inserted: function(el, binding) {
        if (!binding.value) return
        let pos = getComputedStyle(el, null).position //外层容器添加类
        el.style.position = pos !== 'static' ? pos : 'relative'
        utils.addClass(el, 'rq-refresh-wrapper')

        let newChild = document.createElement('div')
        newChild.innerHTML = `<svg class="svg-icon" aria-hidden="true"><use xlink:href="#refresh"></use></svg>`
        utils.addClass(newChild, 'refresh-icon-wrapper')
        el.insertBefore(newChild, el.firstChild)

        //设置刷新区域的第一个元素为刷新图标
        el.options.targetEle = newChild
        //记录初始刷新区域距离dom顶部的距离
        el.options.top = el.getBoundingClientRect().top

        el.addEventListener('touchstart', touchStart, { passive: false })
        el.addEventListener('touchmove', touchMove, { passive: false })
        el.addEventListener('touchend', touchEnd, { passive: false })
        el.addEventListener('touchcancle', touchCancle, { passive: false })
    },
    unbind: function(el) {
        el.removeEventListener('touchstart', touchStart, { passive: false })
        el.removeEventListener('touchmove', touchMove, { passive: false })
        el.removeEventListener('touchend', touchEnd, { passive: false })
        el.addEventListener('touchcancle', touchCancle, { passive: false })
    }
}
