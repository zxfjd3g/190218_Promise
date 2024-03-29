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

    const self = this // 保存promise对象
    self.status = 'pending' // 初始化promise对象状态属性: pending代表未确定的
    self.data = undefined // 初始化promise的用来存储数据的属性: undefined代表结果数据不确定
    self.callbacks = [] // 用来保存待处理的成功与失败回调函数的数组容器
    /*
    callbacks的元素结构为: {onResolved: () => {}, onrejected: () => {}}


    p1: {id: 1}, p2: {id: 2}, p3: {id: 3}
    {
      [p1.id]: p1,
      2: p2,
      3: p3

    }
    */
    
    /* 
    指定promise的成功结果和成功数据
    1. 指定状态为成功: resolved
    2. 指定数据为成功的value
    3. 异步执行所有待处理的成功回调函数
    */
    function resolve(value) {
      // 如果当前状态不是pending, 直接结束
      if (self.status!=='pending') {
        return
      }

      // 1. 指定状态为成功: resolved
      self.status = 'resolved'
      // 2. 指定数据为成功的value
      self.data = value
      // 3. 立即异步执行所有待处理的成功回调函数
      if (self.callbacks.length>0) {
        setTimeout(() => {
          self.callbacks.forEach(callbackObj => {
            callbackObj.onResolved(value)
          })
        })
      }
    }

    /* 
    指定promise为失败结果和失败原因
    1. 指定状态为失败: rejected
    2. 指定数据为失败的reason
    3. 异步执行所有待处理的失败回调函数
    */
    function reject(reason) {

      // 如果当前状态不是pending, 直接结束
      if (self.status !== 'pending') {
        return
      }

      // 1. 指定状态为失败: rejected
      self.status = 'rejected'
      // 2. 指定数据为失败的reason
      self.data = reason
      // 3. 异步执行所有待处理的失败回调函数
      if (self.callbacks.length>0) {
        setTimeout(() => {
          self.callbacks.forEach(callbackObj => callbackObj.onRejected(reason))
        });
      }
    }

    try {
      // 立即同步执行执行器函数
      excutor(resolve, reject)
    } catch (error) { // 一旦捕获到异常, 当前promise变为失败
      reject(error)
    }
    
  }

  /* 
  then() 方法返回一个新的 Promise。 
  它最多需要有两个参数： Promise 的成功和失败情况的回调函数。

  绑定成功或失败回调函数

  */
  Promise.prototype.then = function (onResolved, onRejected) {
    const self = this
    const status = this.status
    // 如果onResolved没有指定为函数, 直接将接收到的value传递给新的promise
    onResolved = typeof onResolved === 'function' ? onResolved : value => value 
    // 如果onRejected没有指定为函数,直接将接收的reason抛出让新的promise进入失败
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

    return new Promise((resolve, reject) => {
      if (status === 'resolved') { // 当前promise已经成功了
        // 立即异步调用onResolved
        setTimeout(() => {
          try {
            const result = onResolved(self.data)
            // 如果回调函数执行的结果为promise对象
            // 将这个promise对象的结果为新的promise对象的结果
            if (result instanceof Promise) {
              /* result.then(
                value => resolve(value),
                reason => reject(reason)
              ) */
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
            
          } catch (error) {
            reject(error)
          }
        });
      } else if (status === 'rejected') { // 当前promise已经失败了
        // 立即异步调用onRejected
        setTimeout(() => {
          try {
            const result = onRejected(self.data)
            if (result instanceof Promise) {
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        });
      } else { // 当前promise的结果还未确定
        // 将2个回调函数保存到callbacks
        /* self.callbacks.push({
          onResolved,
          onResjected
        }) */

        self.callbacks.push({
          onResolved(value) {
            try {
              const result = onResolved(self.data)
              if (result instanceof Promise) {
                result.then(resolve, reject)
              } else {
                resolve(result)
              }
             
            } catch (error) {
              reject(error)
            }
          },
          onRejected(reason) {
            try {
              const result = onRejected(self.data)
              if (result instanceof Promise) {
                result.then(resolve, reject)
              } else {
                resolve(result)
              }
            } catch (error) {
              reject(error)
            }
          }
        })
      }
    })
  }

  /* 
  atch() 方法返回一个Promise， 并且处理拒绝的情况。 
  它的行为与调用Promise.prototype.then(undefined, onRejected) 相同
  */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
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
