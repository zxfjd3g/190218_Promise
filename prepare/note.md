## 1. Promise是什么?
  1). 抽象表达: 
    Promise是JS中进行异步编程的新的解决方案(旧的是谁?)
  2). 具体表达:
    a. Promise 对象用于表示一个异步操作的最终状态（完成或失败），以及该异步操作的结果值
    b. 一个 Promise 就是一个对象，它代表了一个异步操作的最终完成或者失败
    c. Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。
      它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 
      这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象

## 2. 为什么要用Promise?
  1). 指定回调函数的方式更加灵活: 
    a. 旧的: 必须在启动异步任务前指定
    b. promise: 启动异步任务 => 返回promie对象 => 给promise对象绑定回调函数(甚至可以在异步任务结束后指定/多个)
  2). 支持链式调用, 可以解决回调地狱问题
    a. 什么是回调地狱? 回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调函数执行的条件
    b. 回调地狱的缺点?  不便于阅读 / 不便于异常处理
    c. promise链式调用解决
    d. async/await终极解决方案

## 3. 如何使用Promise?
  1). Promise构造函数: Promise (excutor) {}
  2). excutor函数: 同步执行  (resolve, reject) => {}
  3). resolve函数: 内部定义成功时我们调用的函数 value => {}
  4). reject函数: 内部定义失败时我们调用的函数 reason => {}
  5). Promise.prototype.then方法: (onResolved, onRejected) => {}
  6). onResolved函数: 成功的回调函数  (value) => {}
  7). onRejected函数: 失败的回调函数 (reason) => {}
  8). Promise.prototype.catch方法: (onRejected) => {}
  9). Promise.resolve方法: (value) => {}
  10). Promise.reject方法: (reason) => {}
  11). Promise.all方法: (promises) => {}
  
## 4. 如何实现自己的Promise
## 1). 整体结构
## 2). Promise构造函数的实现
## 3). promise.then()/catch()的实现
## 4). Promise.resolve()/rejected()的实现
## 5). Promise.all/race()的实现