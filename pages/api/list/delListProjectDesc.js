const { responseClient } = require('../../../utils/util');
import $Model from '../../../models/list/projectDesc'

export default async function handler(req, res) {
    let { _id} = JSON.parse(req.body)
    
    try {
		let result = await $Model.deleteMany({ _id: _id });
		if (result.n === 1) {
			responseClient(res, 200, 0, '操作成功!');
		} else {
			responseClient(res, 200, 1, '项目内容不存在');
		}
	} catch {
		console.error('服务器错误');
        responseClient(res, 500, 2000, '服务器错误', null);
	}
	

}




