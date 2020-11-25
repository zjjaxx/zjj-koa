const http=require("http")


module.exports=class _Koa{
    constructor(){
        this.middlewareList=[]
        this.context={
        }
    }
    use(fn){
        this.callback=fn
    }
    listen(...arg){
        let server=http.createServer((request,response)=>{
            this.context.request=request
            this.context.response=response
            this.callback(this.context)
        })
        server.listen(...arg)
    }
}