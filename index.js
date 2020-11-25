const _koa=require("./lib/koa")

const server=new _koa()
server.use(context=>{
    const {request,response}=context
    response.end("hello koa")
})
server.listen(3000,()=>{
    console.log("koa start")
})