module.exports = {
    insert(CollectionName, insertData) { // 插入
        // 数据库的操作属于异步操作，后续的业务逻辑会交给执行的那个单位
        // A 调用了B B包含异步操作,操作完毕 A继续执行业务逻辑
        // 异步操作  --- 回调函数 / promise / generator + yeild / async + await
        // User.insertMany(insertData, (err) => {
        //   if (err) throw err;
        //   console.log('插入成功')
        // })
        // promise的写法
        // return new Promise((resolve, reject) => {
        // })
        return new Promise((resolve, reject) => {
            CollectionName.insertMany(insertData, (err) => {
                if (err) reject(err)
                resolve()
            })
        })
    },
    delete() { //删除

    },
    update() { //更新

    },
    find() { //查询

    },
    paging() { //分页

    },
    distinct() { //分类查询

    }
}