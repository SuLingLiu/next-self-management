const { responseClient } = require('../../../utils/util');
import $Model from '../../../models/list/score'

export default async function handler(req, res) {
	let { num = '0' } = JSON.parse(req.body)
	
    let result = await $Model.findOne({
		num,
	})
	if (!result) {
		let project = new $Model({
			num,
			time: + new Date()

		});
		let ret = await project.save()
		responseClient(res, 200, 0, '操作成功！', ret);
	} else {
		responseClient(res, 200, 1, '该项目内容已存在');
	}

}

