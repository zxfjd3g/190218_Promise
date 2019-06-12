/*
整体结构
 */

(function (window) {

  /*
  Promise构造函数
  excutor: 内部同步执行的函数  (resolve, reject) => {}
   */
  function Promise(excutor) {

    const self = this


    self.status = 'pending' // 状态值, 初始状态为pending, 成功了变为resolved, 失败了变为rejected
    self.data = undefined // 用来保存成功value或失败reason的属性
    self.callbacks = [] // 用来保存所有待调用的包含onResolved和onRejected回调函数的对象的数组

    /*
    异步处理成功后应该调用的函数
    value: 将交给onResolve()的成功数据
     */
    function resolve(value) {

      if(self.status!==pending) { // 如果当前不是pending, 直接结束
        return
      }

      // 立即更新状态, 保存数据
      self.status = 'resolved'
      self.data = value

      // 异步调用所有待处理的onResolved成功回调函数
      setTimeout(() => {
        self.callbacks.forEach(obj => {
          obj.onResolved(value)
        })
      })
    }

    /*
    异步处理失败后应该调用的函数
    reason: 将交给onRejected()的失败数据
     */
    function reject(reason) {

      if(self.status!==pending) { // 如果当前不是pending, 直接结束
        return
      }

      // 立即更新状态, 保存数据
      self.status = 'rejected'
      self.data = reason

      // 异步调用所有待处理的onRejected回调函数
      setTimeout(() => {
        self.callbacks.forEach(obj => {
          obj.onRejected(reason)
        })
      })
    }

    try {
      // 立即同步调用excutor()处理
      excutor(resolve, reject)
    } catch (error) { // 如果出了异常, 直接失败
      reject(error)
    }
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