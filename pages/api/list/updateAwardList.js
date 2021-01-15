const { responseClient } = require('../../../utils/util');
import $Model from '../../../models/list/awardList'

export default async function handler(req, res) {

    let { title,state,score, _id,startDate,endDate} = JSON.parse(req.body)
    try {
		let result = await $Model.updateOne(
			{ _id: _id },
			{
				title,
				state,
				score,
				time: + new Date(),
				startDate,
				endDate
			}
		)
		responseClient(res, 200, 0, '操作成功', result);
	} catch {
		console.error('服务器错误');
        responseClient(res, 500, 2000, '服务器错误', null);
	}
}

