/*
自定义Promise
 */

(function (window) {

  /*
  Promise构造函数
  excutor: 内部同步执行的函数  (resolve, reject) => {}
   */
  function Promise(excutor) {

  }

  /*
  为promise指定成功/失败的回调函数
  函数的返回值是一个新的promise对象
   */
  Promise.prototype.then = function (onResolved, onRejected) {

  }

  /*
  为promise指定失败的回调函数
  是then(null, onRejected)的语法糖
   */
  Promise.prototype.catch = function (onRejected) {

  }

  /*
  返回一个指定了成功value的promise对象
   */
  Promise.resolve = function (value) {

  }

  /*
  返回一个指定了失败reason的promise对象
   */
  Promise.reject = function (reason) {

  }

  /*
  返回一个promise, 只有promises中所有promise都成功时, 才最终成功, 只要有一个失败就直接失败
   */
  Promise.all = function (promises) {

  }

  /*
  返回一个 promise， 一旦某个promise解决或拒绝， 返回的 promise就会解决或拒绝。
  */
  Promise.race = function (promises) {
    
  }

  // 暴露构造函数
  window.Promise = Promise
})(window)