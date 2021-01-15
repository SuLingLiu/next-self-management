const { responseClient } = require('../../../utils/util');
import $Model from '../../../models/list/score'

export default async function handler(req, res) {

    let { num = '0', _id} = JSON.parse(req.body)
    try {
		let result = await $Model.updateOne(
			{ _id: _id },
			{
				num,
				time: + new Date()
			}
		)
		responseClient(res, 200, 0, '操作成功', result);
	} catch {
		console.error('服务器错误');
        responseClient(res, 500, 2000, '服务器错误', null);
	}
}

