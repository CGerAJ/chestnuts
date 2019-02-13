/**
 *[once 只执行一次的函数]
 * @param {function} fn  只执行一次的函数
 */
function once(fn) {
  return function(...args) {
    if (fn) {
      let ret = fn.apply(this, args)
      fn = null
      return ret
    }
  }
}

/**
 * [throttle 函数节流]
 * @param {function} fn  需要节流的函数
 * @param {Number} time default 500ms
 */
function throttle(fn, time = 500) {
  let timer
  return function(...args) {
    if (timer == null) {
      console.log(...args)
      fn.apply(this, args)
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
  dur = dur || 100
  var timer
  return function() {
    clearInterval(timer)
    timer = setInterval(() => {
      fn.apply(this, arguments)
    }, dur)
  }
}

function consumer(fn, time) {
  let tasks = [],
    timer
  return function(...args) {
    tasks.push(fn.bind(this, ...args))
    if (timer == null) {
      timer = setInterval(() => {
        tasks.shift().call(this)
        if (tasks.length <= 0) {
          clearInterval(timer)
          timer = null
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
  return function(...args) {
    return args.reduce(fn.bind(this))
  }
}
/**
 *[toggle 多函数切换]
 * @param {Function} actions   
 * 
 switcher.onclick = toggle(
   evt => evt.target.className = 'warn',
   evt => evt.target.className = 'off',
   evt => evt.target.className = 'on'
 );
 */
function toggle(...actions) {
  return function(...args) {
    let action = actions.shift()
    actions.push(action)
    return action.apply(this, args)
  }
}

/**
 *[batch 批处理]
 * @param {Function} fn
 */
function batch(fn) {
  return function(target, ...args) {
    if (target.length >= 0) {
      return Array.from(target).map(item => fn.apply(this, [item, ...args]))
    } else {
      return fn.apply(this, [target, ...args])
    }
  }
}

/**
 *[queriable 查询]
 * @param {Function} fn
 */
function queriable(fn) {
  return function(selector, ...args) {
    if (typeof selector === 'string') {
      selector = document.querySelector(selector)
    } else {
      return fn.apply(this, [selector, ...args])
    }
  }
}

/**
 *[pack 打包处理]
 * @param {object} map
 */
function pack(map) {
  return function(el, obj) {
    for (let key in obj) {
      map[key].call(this, el, obj[key])
    }
  }
}

/**
 *[methodize]
 * @param {Function} fn
 * @param {*} prop
 */
function methodize(fn, prop) {
  return function(...args) {
    fn.apply(null, [prop ? this[prop] : this, ...args])
    return this
  }
}

const findSomeOneInArray = (f => f(f))(f =>
  (next => (x, y, i = 0) =>
    i >= x.length ? null : x[i] == y ? i : next(x, y, i + 1))((...args) =>
    f(f)(...args)
  )
)

/**
 * [memoized]
 * @param {*} fn
 */
const memoized = fn => {
  const lookupTable = {}
  return arg => lookupTable[arg] || (lookupTable[arg] = fn(arg))
}

/**
 * [memoized递归调用 组合高阶函数 主要作用是缓存前一次的计算值]
 * @param {function} fn
 */
const fastFactorial = memoized(n => {
  if (n === 0) {
    return 1
  }
  return n * fastFactorial(n - 1)
})

/**
 * [通用的单例验证方法]
 * @param {function} fn
 */
function getSingle(fn) {
  let result
  return function() {
    return result || (result = fn.apply(this, arguments))
  }
}

/**
 * [使用boolean 过滤数组中的所有假值]
 * compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])             // [ 1, 2, 3, 'a', 's', 34 ]
 * @param {Array} arr
 */
const compact = arr => arr.filter(Boolean)

//  取整 | 0
// 对一个数字| 0可以取整，负数也同样适用，num | 0
// 1.3 | 0         // 1
// -1.9 | 0        // -1

// 判断奇偶数 & 1
// 对一个数字& 1可以判断奇偶数，负数也同样适用，num & 1
// const num=3;
// !!(num & 1)                    // true
// !!(num % 2)                    // true

// 惰性载入函数
function foo() {
  if (a != b) {
    foo = function() {
      console.log('aaa')
    }
  } else {
    foo = function() {
      console.log('bbb')
    }
  }

  return foo()
}

// 字符串比较时间先后
// var a = '2014-08-08'
// var b = '2014-09-09'
// console.log(a > b, a < b) // false true
// console.log('21:00' < '09:10') // false
// console.log('21:00' < '9:10') // true   时间形式注意补0

/**
 * round(1.345, 1)
 * @param {Float} n
 * @param {Number} decimals
 */
const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)

/**
 * reduce方法同时实现map和filter
 * @param {Array} n
 */

// let n = [10,20,30,40]

const mapFilter = arr => {
  return arr.reduce((finalList, num) => {
    num = num * 2
    if (num > 50) {
      finalList.push(num)
    }
    return finalList
  }, [])
}

/**
 * 统计数组中相同项的个数
 * @param {Array} arr 数组
 */
const elementCount = arr => {
  return arr.reduce((obj, name) => {
    console.log(obj, name)

    obj[name] = obj[name] ? ++obj[name] : 1
    return obj
  }, {})
}

/**
 * 验证函数
 * @param {Object} schema
 * @param {Object} values
 */
const validate = (schema, values) => {
  for (field in schema) {
    if (schema[field].required) {
      if (!values[field]) {
        return false
      }
    }
  }

  return true
}

/**
 * [回文判断]
 * @param {String} str
 */
const checkPalindrom = str => {
  return (
    str ==
    str
      .split('')
      .reverse()
      .join('')
  )
}
