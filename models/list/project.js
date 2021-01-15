
import mongoose from 'mongoose'
const autoIncrement = require('mongoose-auto-increment');


// 项目模型
const $Schema = new mongoose.Schema({
	title: { type: String, required: true },
	time: { type: String, required: true },
});

// 自增ID插件配置
$Schema.plugin(autoIncrement.plugin, {
	model: 'ListProject',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
// 项目模型
//写成这样的方式会报错，OverwriteModelError: Cannot overwrite `listProject` model once compiled.
export default mongoose.models.ListProject || mongoose.model('ListProject', $Schema);