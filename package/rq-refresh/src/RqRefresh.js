import utils from '@/assets/js/utils/index'
const MAXOFFSETY = 180 //最大滑动距离
let [startY, transLateY, isTouch] = [0, 0, false]
//获取targeteEle
function getTargetEle() {
    return this.options.targetEle
}
//判断滚动元素所在的位置
function getElePosition() {
    return (
        this.options.top -
            getTargetEle.call(this).parentNode.getBoundingClientRect().top ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset
    )
}
//阻止和移除默认事件
function setPreventDefault(e) {
    e.preventDefault()
}

function preventDefault() {
    document.body.addEventListener('touchmove', setPreventDefault, {
        passive: false
    })
}

function removePreventDefault() {
    document.body.removeEventListener('touchmove', setPreventDefault, {
        passive: false
    })
}

//设置偏移
function setTransLateY(y) {
    getTargetEle.call(this).style.transform = `translateY(${y / 75}rem)`
}

function touchStart(e) {
    //初始化
    utils.removeClass(getTargetEle.call(this).children[0], 'active')
    startY = e.touches[0].clientY
    transLateY = 0
}

function touchMove(e) {
    transLateY = parseInt(e.touches[0].clientY - startY)
    if (getElePosition.call(this) > 0) {
        //上拉
        if (this.options.changeStyle) {
            this.options.changeStyle(transLateY)
        }
        return
    }

    /**
     * 阻止默认滑动的条件：
     * 1.第一次滑动
     * 2.下滑
     * 3.scrollTop小于等于0
     */
    if (!isTouch && transLateY > 0) {
        preventDefault()
    }
    isTouch = true
    if (transLateY > MAXOFFSETY) transLateY = MAXOFFSETY
    setTransLateY.call(this, transLateY)
}

function touchEnd() {
    if (getElePosition.call(this) > 0) return
    if (transLateY >= MAXOFFSETY) {
        utils.addClass(getTargetEle.call(this).children[0], 'static')
        this.options.refresh().then(() => {
            utils.removeClass(getTargetEle.call(this).children[0], 'static')
            utils.addClass(getTargetEle.call(this).children[0], 'active')
            setTransLateY.call(this, 0)
        })
    } else {
        setTransLateY.call(this, 0)
    }
    removePreventDefault()
    isTouch = false
}
/**
 * 如果有其它意外事件
 */
function touchCancle() {
    setTransLateY.call(this, 0)
    removePreventDefault()
}

export default {
    bind: function(el, binding) {
        el.options = {}
        // el.options.refresh = binding.value
        if (typeof binding.value === 'function') {
            el.options.refresh = binding.value
        } else if (typeof binding.value === 'object') {
            //expression为对象
            let { funs, changeStyle } = binding.value
            el.options.refresh = funs
            el.options.changeStyle = changeStyle
        }
    },
    inserted: function(el, binding) {
        // if (!binding.value || typeof binding.value !== 'function') return
        if (!binding.value) return

        let pos = getComputedStyle(el, null).position //外层容器添加类
        el.style.position = pos !== 'static' ? pos : 'relative'
        utils.addClass(el, 'refresh-animation-wrap')

        let newChild = document.createElement('div') //创建新元素
        newChild.innerHTML = `<svg class="svg-icon" aria-hidden="true"><use xlink:href="#refresh"></use></svg>`
        utils.addClass(newChild, 'refresh-wrap')

        el.insertBefore(newChild, el.firstChild)
        el.options.targetEle = newChild
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
