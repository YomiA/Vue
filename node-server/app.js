//导入 http 内置模块
const http = require('http')
//服务器怎么拿到从页面传过来的值，这就得用到服务器的url解析
//这个核心模块，能够帮我们解析 URL 地址，从而从客户端拿到对应的 pathname(url) query
const urlMoudle = require('url')
//创建一个 http 服务器
const server = http.createServer()

//监听 http 服务器的 request 请求
server.on('request', function (req, res) {
    //write your code here
    //先拿到 url 地址
    // const url = req.url
    const { pathname:url, query} = urlMoudle.parse(req.url, true)
    if(url === '/getscript'){
        //拼接一个合法的js脚本, 这里拼接的是一个方法的调用
        //注意：这里的后面的show()不能写死，因为我们服务器不知道客户端的方法名是啥，所以最好就是从客户端传给服务器的值
        // const scriptStr = 'show()'
        //服务器传值到客户端
        var data={
            name:'wjj',
            age:18,
            gender:'女'
        };
        //下面的后面只接受字符串，但是data是一个对象，所以要把JSON对象给转成JSON字符串然后再传过去JSON.stringify()
        const scriptStr = `${query.callback}(${JSON.stringify(data)})`
        //服务器通过 res.end 发送给客户端，客户端去把这个 字符串 ，当作js代码去解析执行
        res.end(scriptStr)
    }else{
        res.end('404')
    }
})

//指定端口号并启动服务器监听
 server.listen(3000, function () {
    console.log('server listen at http://127.0.0.1:3000')
 })