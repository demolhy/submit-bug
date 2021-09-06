const mongoose = require('mongoose')
const connection = require('../dnmongo')

const Schema = mongoose.Schema

const StudentSchema = new Schema({
    _id: Number,
    progblem_name: String,
    describe: String,
    url: String,
    browser: String,
    name: String,
    branch: String, // 部门
    system: String,
    time: String,
    remarks: String,
    status: { type: Number, default: 0 } // 0:未解决 1：已解决 2：驳回
})

// data.time = Date.now()
// 储存到数据库
// StudentModel.createCollection('counters')
// StudentModel.counters.insert({ _id: 'productid', sequence_value: 0 })
const StudentModel = connection.model('Problem', StudentSchema)

module.exports = StudentModel