const router = require('koa-router')()

router.prefix('/problem')

router.get('/', function(ctx, next) {
    ctx.body = 'this is a users response!'
})


router.get('/get', function(ctx, next) {
    ctx.body = 'this is a get/problem response'
})

module.exports = router