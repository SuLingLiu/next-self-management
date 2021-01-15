const { responseClient } = require('../../../utils/util');
import $Model from '../../../models/list/manageScore'

export default async function handler(req, res) {
    let { total = '0' } = JSON.parse(req.body)
    total = Number(total)
    try {
		let result = await $Model.updateOne(
			{ mark: 'one' },
			{
				total,
				time: + new Date()
			}
        )
        if (result.n === 1) {
			responseClient(res, 200, 0, '操作成功!');
		} else {
			try {
                let Project = new $Model({
                    total,
                    mark: 'one',
                    time: + new Date()
                });
                let ret = await Project.save()
                responseClient(res, 200, 0, '操作成功！', ret);
            } catch {
                console.error('服务器错误');
                responseClient(res, 500, 2000, '服务器错误', null);
            }
		}
	} catch {
		console.error('服务器错误');
        responseClient(res, 500, 2000, '服务器错误', null);
	}

}
