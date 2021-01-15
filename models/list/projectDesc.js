

import mongoose from 'mongoose'
const autoIncrement = require('mongoose-auto-increment');


// 项目模型
const $Schema = new mongoose.Schema({
	title: { type: String, required: true },
	time: { type: String, required: true },
});

// 自增ID插件配置
$Schema.plugin(autoIncrement.plugin, {
	model: 'listProjectDesc',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
export default mongoose.models.listProjectDesc || mongoose.model('listProjectDesc', $Schema);