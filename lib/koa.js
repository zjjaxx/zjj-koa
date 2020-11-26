const http = require("http")

const request = require("./request")
const response = require("./response")
const context = require("./context")
module.exports = class _Koa {
   
    constructor() {
        this.middlewareList = []
        this.context = {
        }
    }
    compose(fns) {
        return function (context) {
            let i = 0
            function next() {
                return Promise.resolve(fns[++i](context,next))
            }
            return Promise.resolve(fns[i](context,next))
            //或则
            // return new Promise((resolve,reject)=>{
            //     resolve(fns[i](context,next))
            // })
        }
    }

    use(fn) {
        this.middlewareList.push(fn)
    }
    listen(...arg) {
        const compose_fn=this.compose(this.middlewareList)
        let server = http.createServer(async (request, response) => {
            let _context = this.createContext(request, response)
            await compose_fn(_context)
            response.end(_context.body)
        })
        server.listen(...arg)
    }
    createContext(req, res) {
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}