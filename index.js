
const _koa = require("./lib/koa")

const server = new _koa()
const delay=()=>new Promise((resolve,reject)=>setTimeout(()=>{resolve(0)},2000))
server.use(async (context,next)=>{
    if(context.request.url=="/"){
        await next()
    }
})
server.use(async (context,next)  => {
    context.body = "1"
    await delay()
    console.log("1 before")
    await next()
    context.body += "5"
    console.log("1 end")
})
server.use(async (context,next)  => {
    context.body += "2"
    await delay()
    console.log("2 before")
    await next()
    context.body += "4"
    console.log("2 end")
})
server.use((context,next)  => {
    context.body += "3"
    console.log("3 end")
})
server.listen(3000, () => {
    console.log("koa start")
})