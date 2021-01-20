
//本文件只作为启动入口 通过bin目录www文件启动
var express = require('express');
var path = require('path');
var config = require("./config");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request');
const bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());


//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200);  //让options尝试请求快速结束
    else
        next();
})


app.get("*",function(req,res,next){
    var url = config.backUrl+':'+config.backPort+req.url;
    console.log('get!!!!!!!!!!!!!!'+url);
    request({
        url: url,
        method: 'get',// 请求方式get
        json: true,   //json格式传输
        headers: req.headers
    }, function(error, response, body) {
        // 请求成功的处理逻辑
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(response.body);
        }else{
            console.log("error")
            res.writeHead(500,{"Content-Type":"text/html"});//响应异常处理  状态码500设置
            res.write("服务器错误"); //响应错误信息转发
            res.end("");
        }
    });
})

app.post("*",function(req,res,next){
    var url = config.backUrl+':'+config.backPort+req.url;
    console.log("这里是*匹配到的");
    console.log(req.body);
    //var url = 'http:127.0.0.1:8090/student/test';
    request({
        url: url,
        method: 'post',// 请求方式get
        json: true,   //json格式传输
        headers: req.headers,
        body: req.body
    }, function(error, response, body) {
        // 请求成功的处理逻辑
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(response.body);   //成功响应传递  不写就没响应返回了
        }else{
            console.log("error")
            res.writeHead(500,{"Content-Type":"text/html"});//响应异常处理  状态码500设置
            res.write("服务器错误"); //响应错误信息转发
            res.end("");
        }
    });
})


// view engine setup



//解析html用
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//静态文件转发用  js css 图片之类的
app.use(express.static(path.join(__dirname, 'public')));
//引入routes路由
// app.use('/', router);






//异常处理 暂时不开启
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   var body = createHtmlDocument(err.stack)
//   res.end(body, 'utf8')
//
//   sendErrCourier(err.stack)
// })




//启动js换成了www  在bin目录下 www和app只能开启一个 否则会启动两个服务端口 用idea启动 下面的app入口要关闭
// http.createServer(app).listen(config.port, function(){
//   console.log(config.port);
//
//   console.log("服务启动了  端口号是: " + config.port);
// });



module.exports = app;
