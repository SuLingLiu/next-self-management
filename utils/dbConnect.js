/**
 * Mongoose module.
 * @file 数据库模块
 */

const consola = require('consola')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')


// mongoose Promise

// mongoose
const config = require('../config');
// connect
export default async function() {
    if (mongoose.connection.readyState >= 1) {
        return
	}
	
	// 连接数据库
	mongoose.connect(config.MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,// Mongoose:不推荐使用未将“useFindAndModify”选项设置为false的“FindAndDupDate（）”和“FindAndDelete（）”
	})

	// 连接错误
	mongoose.connection.on('error', error => {
		consola.warn('数据库连接失败!', error)
	})

	// 连接成功
	mongoose.connection.once('open', () => {
		consola.ready('数据库连接成功!')
	})

	// 自增 ID 初始化
	autoIncrement.initialize(mongoose.connection)
	
	// 返回实例
	return mongoose
}