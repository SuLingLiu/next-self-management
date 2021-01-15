

import mongoose from 'mongoose'
const autoIncrement = require('mongoose-auto-increment');


// 项目模型
const $Schema = new mongoose.Schema({
	title: { type: String, required: true },
    time: { type: String, required: true },
    score: { type: String, required: true },
    //1:可兑换，2：已兑换，3：过期
	state: { type: String, required: true },
	startDate: {type: Number, required: true},
	endDate: {type: Number, required: true},
});

// 自增ID插件配置
$Schema.plugin(autoIncrement.plugin, {
	model: 'AwardList',
	field: 'id',
	startAt: 1,
	incrementBy: 1,

});
export default mongoose.models.AwardList || mongoose.model('AwardList', $Schema);