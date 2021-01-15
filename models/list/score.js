
import mongoose from 'mongoose'
const autoIncrement = require('mongoose-auto-increment');


// 项目模型
const $Schema = new mongoose.Schema({
	num: { type: String, required: true },
	time: { type: String, required: true },
});

// 自增ID插件配置
$Schema.plugin(autoIncrement.plugin, {
	model: 'ListScore',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
// 项目模型
export default mongoose.models.ListScore || mongoose.model('ListScore', $Schema);