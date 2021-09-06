const Router = require('koa-router')
const router = new Router({
    prefix: '/api'
})

// import user from '../dbs/schema/user'
const StudentModel = require('../dbs/schema/table')

// 获取数据列表
router.post('/getTable', async (ctx, next) => {
    const { system } = ctx.request.body
    const postData = !system ? {} : {system}
    let filter = {
        $and: [
            !system ? {} : { system },
            {time: {
                $gte: ctx.request.body.start || 1609430400000,
                $lt: ctx.request.body.end || new Date().getTime()
            }}
        ]
    }
    let { limit } = ctx.request.body || 10
    let { page } = ctx.request.body || 1
    console.log('filter', filter['$and'])
    console.log('page:', Number(limit), Number(page))
    const lengthData = await StudentModel.countDocuments(filter, (err, res) => {
        if (err) console.log('服务器出错')
    })
    const tableData = await StudentModel.find(filter, null, {sort: {'_id': -1}}, (err, res) => {
        if (err) console.log('服务器出错')
    }).skip((Number(page) - 1) * Number(limit)).limit(Number(limit))
    ctx.body = {
        data: tableData,
        page: Number(page),
        total: lengthData
    }
})

// 保存
router.post('/submitData', async (ctx, next) => {
    try {
        const postData = ctx.request.body
        postData.time = Date.now()
        StudentModel.count({}, function (err, res) {
            console.log('count:', res)
            if (res === 0) {
                postData._id = 1
            } else {
                postData._id = res + 1
            }
            console.log(postData._id)
            let user = new StudentModel(postData)
            user.save().then((doc) => {
                console.log('sussess:', doc)
            })
        })
    } catch (error) {
        ctx.body = error
    }
})

// 查询详情数据
router.post('/qeuryTable', async (ctx, next) => {
    try {
        const postData = Number(ctx.request.body.id)
        let data = await StudentModel.findOne({
            _id: postData
        }, (err, res) => {
            if (err) return
        })
        ctx.body.data = data
    } catch (error) {
        ctx.body = error
    }
})

// 更改状态----status:已解决
router.post('/saveStatusTrue', async (ctx, next) => {
    try {
        const { _id } = ctx.request.body
        const { remarks } = ctx.request.body
        console.log(_id, remarks)
        // let user = new StudentModel(postData)
        StudentModel.findByIdAndUpdate(Number(_id), {
            status: 1,
            remarks: remarks
        }, (err, res) => {
            if (err) console.log(err)
            console.log('success')
        })
    } catch (error) {
        ctx.body = error
    }
})

// 更改状态----status:驳回
router.post('/saveStatusFalse', async (ctx, next) => {
    try {
        const { _id } = ctx.request.body
        const { remarks } = ctx.request.body
        // let user = new StudentModel(postData)
        console.log(_id, remarks)
        StudentModel.findByIdAndUpdate(Number(_id), {
            status: 2,
            remarks: remarks
        }, (err, res) => {
            if (err) return err
            console.log('success')
        })
    } catch (error) {
        ctx.body = error
    }
})

// 添加备注
router.post('/saveRemarks', async (ctx, next) => {
    try {
        const postData = Number(ctx.request.body._id)
        // let user = new StudentModel(postData)
        console.log('postData', postData)
        StudentModel.findByIdAndUpdate(postData, {
            remarks: '这是一段备注1！'
        }, (err, res) => {
            if (err) return err
            console.log('success')
        })
    } catch (error) {
        ctx.body = error
    }
})


/*
 * 需要注意：这里我们使用了ctx.req.on来接收事件
 * */
function parsePostData(ctx) {
    // 利用ES6的语法new一个Promise对象，其中传递两个值，resolve是成功的，而reject是失败的
    return new Promise((resolve, reject) => {
        try {
            // 对获取到的值进行处理
            let postdata = "";
            ctx.req.on('data', (data) => {
                postdata += data
            })
            ctx.req.addListener("end", function () {
                // 把我们在全局定义的postdata传递给parseQueryStr，进行格式的转化
                let parseData = parseQueryStr(postdata)
                // 把成功后的parseData传出去
                resolve(parseData);
            })
        } catch (error) {
            // 把错误的信息返回出去
            reject(error);
        }
    });
}

/*POST字符串解析JSON对象*/
function parseQueryStr(queryStr) {
    let queryData = {};
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    // 利用了ES6提供的forOf，可以找找相关的看看
    for (let [index, queryStr] of queryStrList.entries()) {
        // 进行切割
        let itemList = queryStr.split('=');
        console.log(itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData
}


module.exports = router