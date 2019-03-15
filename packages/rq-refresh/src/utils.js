/**
 * @description 元素添加类
 */
function addClass(ele, className) {
    ele.classList.add(className)
}

/**
 * @description 元素移除类
 */
function removeClass(ele, className) {
    ele.classList.remove(className)
}

/**
 * @description 切换类
 */
function toggleClass(ele, className) {
    ele.classList.toggle(className)
}

/**
 * @description 判断包含某个类
 */
function hasClass(el, className) {
    el.classList.contains(className)
}

export default {
    addClass,
    removeClass,
    toggleClass,
    hasClass
}
