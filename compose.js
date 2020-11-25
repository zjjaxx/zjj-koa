function compose(fns) {
    return function () {
        let i = 0
        function next() {
            return Promise.resolve(fns[++i](next))
        }
        fns[i](next)
    }
}

async function fn1(next) {
    console.log("fn1");
    await next();
    console.log("end fn1");
}
async function fn2(next) {
    console.log("fn2");
    await delay();
    await next();
    console.log("end fn2");
}
function fn3(next) {
    console.log("fn3");
}
function delay() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove();
        }, 2000);
    });
}
const compose_fn = compose([fn1, fn2, fn3])
compose_fn()
