/* 
自定义Promise构造函数的模块
使用IIFE定义模块
*/
(function (window) {
  
  /* 
   Promise构造函数
   excutor: 执行器函数 (resolve, reject) => {}
  */
  function Promise(excutor) {
    
  }

  /* 
  then() 方法返回一个新的 Promise。 
  它最多需要有两个参数： Promise 的成功和失败情况的回调函数。
  */
  Promise.prototype.then = function (onResolved, onRejected) {
    
  }

  /* 
  atch() 方法返回一个Promise， 并且处理拒绝的情况。 
  它的行为与调用Promise.prototype.then(undefined, onRejected) 相同
  */
  Promise.prototype.catch = function (onRejected) {
    
  }

  /* 
  返回一个以给定值解析后的Promise 对象
  */
  Promise.resolve = function (value) {
    
  }

  /* 
  返回一个带有拒绝原因reason参数的Promise对象
  */
  Promise.reject = function (reason) {
    
  }

  /* 
  返回一个Promise对象, 只有当所有的promise都成功才最终成功(成功值是values数组), 
  只要有一个promise失败了最终就直接失败(失败的原因为reason)
  */
  Promise.all = function (promises) {

  }

  /* 
  返回一个Promise对象, 只要有一个promise有了结果, 这个结果就是最终的结果, 
  */
  Promise.race = function (promises) {

  }

  // 暴露Promise
  window.Promise = Promise

})(window)
