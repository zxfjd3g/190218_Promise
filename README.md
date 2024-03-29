# 1. 相关API/概念
## 1). Promise: 许诺  
    1). 抽象表达: js中实现异步的新的解决方案(旧的是谁? 纯callback)
    2). 具体表达:
        a. 用来创建promise对象的构造函数: function Promise (excutor) {}
        b. Promise 对象用于表示一个异步操作的最终状态（完成或失败），以及该异步操作的结果值
        c. 一个 Promise 就是一个对象，它代表了一个异步操作的最终完成或者失败。
        d. Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。
            它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 
            这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，
            而是一个能代表未来出现的结果的promise对象
    3). 为什么要用Promise?
         a. 指定回调函数的方式更加灵活: 
            旧的: 必须在启动异步任务前指定
            promise: 启动异步任务 => 返回promie对象 => 给promise对象绑定回调函数(甚至可以在异步任务结束后指定/多个)
        b. 支持链式调用, 可以解决回调地狱问题
            什么是回调地狱? 回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调函数执行的条件
            回调地狱的缺点?  不便于阅读 / 不便于异常处理
            promise链式调用解决
            async/await终极解决方案: 同步编码方式
    3). promise对象的3种状态值
        a. pending(未决定的): 初始状态，既不是成功，也不是失败状态。
        b. resolved/fulfilled(完成的): 意味着操作成功完成。  
        c. rejected(拒绝的): 意味着操作失败。
    4). promise对象的状态变化(2种)
        a. pending ==> resolved: 调用resolve()
        b. pending ==> rejected: 调用reject()
        注意: promise的状态确定后就不可再转换为其它状态
    5). promise对象内部隐藏的属性
        [[PromiseStatus]]: 内部变量, 存储promise对象当前的状态值
        [[PromiseValue]]: 内部变量, 存储成功后的value或失败后的reason

## 2). excutor: 执行器
    executor是带有 resolve 和 reject 两个参数的函数: (resolve, reject) => {}
    由我们定义, 在new Promise()内部会立即同步调用 executor 函数(不是我们调用的)
    异步操作的代码应该在此函数中执行, 一般成功后调用resolve(), 失败后调用reject()

## 3). resolve: 解决
    由Promise函数内部定义, 但由我们调用的函数
    当异步任务成功时, 我们应该调用resolve函数, 并传入需要的value
    resolve函数内部: 
        同步修改promise对象的状态为resolved和保存成功value, 
        异步执行已经存储的所有onResolved回调函数
    
## 4). reject: 拒绝
    由Promise函数内部定义, 但由我们调用的函数
    当异步任务失败/抛出error时, 我们应该调用reject函数, 并传入需要的reason
    reject函数内部: 
        同步修改promise对象的状态为rejected和保存失败reason
        异步调用已经存储的所有onRejected回调函数
    
## 5). then: 接着
    promise对象的方法: then(onRsolved函数, onRejected函数), 返回值为一个新的promise对象
    作用: 用来指定promise的状态为resolved或rejected时的回调函数
    注意: 
        then()方法的返回值为新的promise对象, 这样可以进行.then()的链式调用
        返回的promise的结果状态和值由回调函数的执行结果决定
            返回promise: 将返回promise的结果值作为then()返回promise的结果
            返回其它: 成功, 值为返回的结果
            抛出异常:  失败, 值为抛出的数据

## 6). onResolved: 当已解决时
    由then()的第一个参数指定的回调函数: (value) => {}
    当promise的状态为resolved时自动异步调用
    onResolved函数的返回值:
        新的promise对象
        其它或不返回
        
## 7). onRejected: 当已拒绝时
    由then()的第二个参数或catch()指定的回调函数: (reason) => {}
    当promise的状态为rejected时自动异步调用
    onRejected函数的返回值:
        新的promise对象
        其它或不返回
        
## 8). catch: 捕获
    promise对象的方法: catch(onRejected函数)
    是then()的语法糖方法, 相当于: then(undeinfed onRejected函数)
    
## 9). Promise.resolve()
    手动创建一个已经resolve的promise的快捷方法: Promise.resolve(value/promise)
    如果参数为promise: 读取此promise结果值作为返回promise的结果值
    
## 10). Promise.reject()
    手动创建一个已经reject的promise的快捷方法: Promise.reject(reason)

## 11). Promise.all([p1, p2, p3])
    用来实现批量执行多个promise的异步操作, 返回一个新的promise: Promise.all([promise1, promise2, ...])
    只有当所有异步操作都resolved后, 返回的promise才会变为resolved状态, 只要有一个变为rejected, 返回的promise直接变为rejected
    面试题: 实现一次发多个请求, 只有都成功后才去做处理?
## 12) Promise.race([p1, p2, p3])
    用来实现批量执行多个promise的异步操作,返回一个新的promise, 它的结果由第一个完成的promise的结果决定

# 2. 自定义Promise
## 1). 整体结构
    function Promise (excutor) {}
    Promise.prototype.then = function (onResolved, onRejected) {}
    Promise.prototype.catch = function (onRejected) {}
    Promise.resolve = function (value) {}
    Promise.reject = function (reason) {}
    Promise.all = function (promises) {}
    
## 2). Promise函数的实现
    初始化对象的属性:
        status: 'pending' 对象的状态(resolved/rejected)
        data: undefined  成功/失败的数据
        callbacks: []  用来保存待执行的成功和失败的回调函数  {onResolved(value){}, onRejected(reason){}}
    定义2个函数
        function resolve (value) {}
        function reject (reason) {}
    立即同步执行excutor(resolve, reject)
        使用try...catch捕获异常, 执行: reject(error)
    resolve函数实现
        立即同步指定成功的状态: status: 'resolved'
        立即同步指定成功的数据: data: value
        立即异步执行callbacks中包含所有待执行onResolved函数
    reject函数的实现
        立即同步指定成功的状态: status: 'rejected'
        立即同步指定成功的数据: data: reason
        立即异步执行callbacks中包含所有待执行onRejected函数
        
## 3). promise.then()/catch()的实现
    1). 返回一个新的promise对象
    2). 根据当前promise的状态来处理
        1). resolved
            a. 立即异步调用onResolved(p.data)
            b. 得到onResolved()执行的结果
            c. 将此结果作为then()返回的promise的结果
        2). rejected
            a. 立即异步调用onRejected(p.data)
            b. 得到onRejected()执行的结果
            c. 将此结果作为then()返回的promise的结果
        3). pending
            a. 将onResolved和onRejected保存到p的callbacks中
            b. 在onResolved和onRejected中做前面一样的处理
## 4). Promise.resolve()/rejected()的实现
    1). 创建一个新的promise对象返回
    2). 在执行器内通过执行resolve/reject确定promise的状态和结果

## 5). Promise.all(promises)的实现
    需求: 一次发多个异步ajax请求, 只有当所有请求都成功, 来进行界面的正常处理, 只要有一个失败, 就直接进行错误
    1). 创建一个新的promise对象并返回
    2). 在执行器内遍历所有promises, 并得到每个promise的结果
    3). 如果有一个结果为失败, 直接reject(reason)
    4). 如果当前promise成功了, 保存value到数组values中对应的位置
    5). 只有当所有promise都成功了, resolve(values)

## 6). Promise.race(promises)的实现
    1). 创建一个新的promise对象并返回
    2). 在执行器内遍历所有promises, 并获取每个promise的结果
    3). 每个promise成功了, 直接调用resolve(value), 但注意只有第一个有效
    3). 每个promise失败了, 直接调用reject(reason), 但注意只有第一个有效

## 3. JS执行流程
  1). 整体流程
      script中的初始化同步代码 ===> 执行回调队列中的代码(异步执行)
  2). 2种回调队列
      宏队列: 缓存宏任务--定时器回调 / DOM事件监听回调 / AJAX请求回调
      微队列: 缓存微任务--Promise成功/失败回调 / Mutation回调
  3). 队列代码的执行顺序
      必须先取出所有微任务依次执行完, 才能取出一个宏任务执行
      微任务的优先级高
