const Koa = require('koa')
const app = new Koa()
const index = require('./routes/index')
const users = require('./routes/users')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const bodyParser = require('koa-bodyparser')
// const bodyparser = new Bodyparser()
const logger = require('koa-logger')

const pv = require('./middleware/koa-pv')
const cors = require('koa-cors')
const jsonwebtoken = require('jsonwebtoken')
const koajwt = require('koa-jwt')
// const Router = require('koa-router')
const User = require('./dbs/schema/user')
const verify = require('jsonwebtoken/verify')
// const util = require('util')


app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    await next()
})
app.use(cors())

// const USER = {
//     username: 'lin',
//     password: '123456',
//     id: 10
// }

// const token = jsonwebtoken.sign({ username: USER.username, id: USER.id },
//     SECRET, { expiresIn: '1h' }
// )
// console.log(token)
// console.log(jsonwebtoken.decode(token))


// app.use(pv())

// error handler
onerror(app)

// middlewares
// app.use(bodyparser({
//     enableTypes: ['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
app.use(bodyParser({
    multipart: true,
    formLimit:"10mb",
    jsonLimit:"10mb"
}))
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

const SECRET = 'hhh123'
// app.use(koajwt({
//     secret: SECRET
// }).unless({
//     // 登录接口不需要验证
//     path: [/^\/api\/login/]
// }))

// go('http://auto2.khpharm.com?b=www.tb.khpharm.com/#/table')

// ver(http://auto2.khpharm.com/ver)
// {

// }

app.use(async (ctx, next) => {
    try {
        const start = new Date()
        const ms = new Date() - start
        console.log(`测试${ctx.method} ${ctx.url} - ${ms}ms`)
        // ctx.body = ctx
        if (ctx.method === 'POST') {
            if (ctx.path === '/api/login') {
                const user = await User.findOne({
                    name: ctx.request.body.name
                }, (err, res) => {
                    if (err) return
                })

                // console.log(ctx.request.body.name, ctx.request.body.password)
                let checkUser = user && (ctx.request.body.name === user.name && ctx.request.body.password === user.password)
                // console.log(checkUser)
                if (checkUser) {
                    ctx.body = {
                        code: 200,
                        message: '登录成功',
                        token: jsonwebtoken.sign({
                                name: user.name,
                                id: user._id
                            }, // 加密userToken
                            SECRET, {
                                expiresIn: '1h'
                            }
                        )
                    }
                    return
                } else {
                    // 登录失败, 用户名密码不正确
                    ctx.body = {
                        code: 400,
                        message: '用户名或密码不正确'
                    }
                    return
                }
            }
            // 成功统一返回
            // const postData = ctx.request.body

            // let token = ctx.header.authorization;
            // let payload = jsonwebtoken.verify(token.split(' ')[1], SECRET);
            // console.log('payload', payload)

            const data = {
                code: 200,
                // message: payload,
                data: ''
            }
            ctx.body = data
            // next is now a function
        }
        await next()
    } catch (err) {
        if (err.status === 401) {
            // 自定义返回结果
            ctx.status = 401;
            ctx.body = {
                code: 401,
                msg: err.message
            }
        } else {
            throw err;
        }
        // console.log('出错啦', err)
        // ctx.body = { message: err.message }
        // ctx.status = err.status || 500
    }
})



// Authorization
// app.use(async(ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })



// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app