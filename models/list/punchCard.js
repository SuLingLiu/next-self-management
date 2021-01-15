import mongoose from 'mongoose'
const autoIncrement = require('mongoose-auto-increment');

// 项目模型
const $Schema = new mongoose.Schema({
	project: { type: String, required: true },
	num: { type: Number, required: true },
	desc: { type: String, required: true },
	time: { type: String, required: true },
});

// 自增ID插件配置
$Schema.plugin(autoIncrement.plugin, {
	model: 'ListPunchCard',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

// 项目模型
export default mongoose.models.ListPunchCard || mongoose.model('ListPunchCard', $Schema);