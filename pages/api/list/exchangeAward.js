const { responseClient } = require('../../../utils/util');
import $Model from '../../../models/list/awardList'
import $Model2 from '../../../models/list/manageScore'

export default async function handler(req, res) {
    let { _id } = JSON.parse(req.body)
    let conditions = { _id };
    let responseData = null;
    try {
        let result1 = await $Model.find(conditions);
        responseData = result1 || [];
        if (!responseData.length) {
            responseClient(res, 200, 1, '查询不到该数据', responseData);
        } else {
            //1:可兑换，2：已兑换，3：过期
            let { score, startDate, endDate, state } = responseData[0];
            let newTime = +new Date();
            if (newTime > endDate) {
                state = 3;
                await $Model.updateOne(
                    { _id: _id },
                    {
                        state
                    }
                )
                responseClient(res, 200, 2, '已过期不能兑换', responseData);
            } else {
                let result2 = await $Model2.find({});
                let total = result2.length ? result2[0].total : 0;

                if (score > total) {
                    responseClient(res, 200, 3, '积分不够', responseData);
                } else {
                    state = 2;
                    await $Model.updateOne(
                        { _id: _id },
                        {
                            state
                        }
                    )
                    total = (total - score) + '';
                    await $Model2.updateOne(
                        { mark: 'one' },
                        {
                            total,
                            time: + new Date()
                        }
                    )
                    
                    responseClient(res, 200, 0, '操作成功！', responseData);
               }

            }


        }


    } catch {
        console.error('服务器错误');
        responseClient(res, 500, 2000, '服务器错误', responseData);

    }
}




