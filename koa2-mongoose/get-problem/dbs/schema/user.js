const mongoose = require('mongoose')
const connection = require('../dnmongo')

const Schema = mongoose.Schema

const StudentSchema = new Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    password: String,
    status: Number
})

// data.time = Date.now()
// 储存到数据库
// StudentModel.createCollection('counters')
// StudentModel.counters.insert({ _id: 'productid', sequence_value: 0 })
const StudentModel = connection.model('User', StudentSchema)

module.exports = StudentModel