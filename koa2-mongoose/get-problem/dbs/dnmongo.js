const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/viewData'

mongoose.connect(url, { useNewUrlParser: true })

mongoose.connection.on('connected', function(e) {
    console.log('=====连接数据库成功=====')
})

mongoose.connection.on('error', function(e) {
    console.log('===连接数据库失败===')
})

mongoose.set('returnOriginal', false)

module.exports = mongoose