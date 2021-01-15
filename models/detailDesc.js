/**
 * DetailDesc model module.
 * @file 项目模型
 * @module model/project
 */

const { mongoose } = require('../../utils/dbConnect.js');
const autoIncrement = require('mongoose-auto-increment');

// 项目模型
const DetailDesc = new mongoose.Schema({
	// 标题
	title: { type: String, required: true },
	// 开始日期
	time: { type: String, required: true },
});

// 自增ID插件配置
DetailDesc.plugin(autoIncrement.plugin, {
	model: 'DetailDesc',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

// 项目模型
module.exports = mongoose.model('detailDesc', DetailDesc);