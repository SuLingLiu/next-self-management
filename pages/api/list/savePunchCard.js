const { responseClient } = require('../../../utils/util');
import $Model from '../../../models/list/punchCard'

export default async function handler(req, res) {
    let { project, num, desc } = JSON.parse(req.body)
    try {
        let Project = new $Model({
            project,
            num,
            desc,
            time: + new Date(),
        });
        let ret = await Project.save()
        responseClient(res, 200, 0, '操作成功！', ret);
    } catch {
        console.error('服务器错误');
        responseClient(res, 500, 2000, '服务器错误', null);
    }

}
