/**
 *[once 只执行一次的函数]
 * @param {function} fn  只执行一次的函数
 */
function once(fn) {
  return function (...args) {
    if (fn) {
      let ret = fn.apply(this, args);
      fn = null;
      return ret;
    }
  }
}

/**
 * [throttle 函数节流]
 * @param {function} fn  需要节流的函数
 * @param {Number} time default 500ms
 */
function throttle(fn, time = 500) {
  let timer;
  return function (...args) {
    if (timer == null) {
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null
      }, time)
    }
  }
}

/**
 *[debounce 函数防抖]
 * @param {Function} fn 需要防抖的函数
 * @param {Number} dur default 100ms
 */
function debounce(fn, dur) {
  dur = dur || 100;
  var timer;
  return function () {
    clearInterval(timer);
    timer = setInterval(() => {
      fn.apply(this, arguments)
    }, dur)
  }
}

function consumer(fn, time) {
  let tasks = [],
    timer;
  return function (...args) {
    tasks.push(fn.bind(this, ...args));
    if (timer == null) {
      timer = setInterval(() => {
        tasks.shift().call(this);
        if (tasks.length <= 0) {
          clearInterval(timer);
          timer = null;
        }
      }, time)
    }
  }
}
/**
 * [iterative]
 * @param {Function} fn
 */
function iterative(fn) {
  return function (...args) {
    return args.reduce(fn.bind(this));
  }
}
/**
 *[toggle 多函数切换]
 * @param {Function} actions   
 switcher.onclick = toggle(
   evt => evt.target.className = 'warn',
   evt => evt.target.className = 'off',
   evt => evt.target.className = 'on'
 );
 */
function toggle(...actions) {
  return function (...args) {
    let action = actions.shift();
    actions.push(action);
    return action.apply(this, args);
  }
}