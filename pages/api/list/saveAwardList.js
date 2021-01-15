const { responseClient } = require('../../../utils/util');
import $Model from '../../../models/list/awardList'

export default async function handler(req, res) {
	let { title, state, score, startDate, endDate } = JSON.parse(req.body)
    let result = await $Model.findOne({
		title,
	})
	if (!result) {
		let project = new $Model({
			title,
			state,
			score,
			time: + new Date(),
			startDate,
			endDate

		});
		let ret = await project.save()
		responseClient(res, 200, 0, '操作成功！', ret);
	} else {
		responseClient(res, 200, 1, '该项目内容已存在');
	}

}

