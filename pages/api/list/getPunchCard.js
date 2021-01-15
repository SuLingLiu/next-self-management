const { responseClient } = require('../../../utils/util');
import $Model from '../../../models/list/punchCard'

export default async function handler(req, res) {
    let conditions = {};
    let responseData = null;
    try {
        let result = await $Model.find(conditions);
		responseData = result || [];
		responseClient(res, 200, 0, '操作成功！', responseData);
	} catch {
		console.error('服务器错误');
        responseClient(res, 500, 2000, '服务器错误', null);
	}

}
