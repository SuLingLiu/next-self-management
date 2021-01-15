const { responseClient } = require('../../../utils/util');
import $Model from '../../../models/list/awardList'

export default async function handler(req, res) {

    try {
		let curT = +new Date()
		let result = await $Model.updateMany(
			{ endDate:  {$lte: curT}},
			{
				state: 3
			}
		)
		responseClient(res, 200, 0, '操作成功', result);
	} catch {
		console.error('服务器错误');
        responseClient(res, 500, 2000, '服务器错误', null);
	}
}

