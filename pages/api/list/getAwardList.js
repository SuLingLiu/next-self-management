

const { responseClient } = require('../../../utils/util');
import $Model from '../../../models/list/awardList'

export default async function handler(req, res) {
  let conditions = {};
  let responseData = null;
  try {
    let result = await $Model.find(conditions);

    if(result&&result.length) {
      let nDate = +new Date();
      let upData = result.filter((item)=> {
        let is = item.endDate<nDate;
        if(is) {
          item.state == 3
        }
        return is;
      })
      if(upData.length) {
        await $Model.updateMany(
          { endDate:  {$lte: nDate}},
          {
            state: 3
          }
        )
      }
    }
    responseData = result || [];
    responseClient(res, 200, 0, '操作成功！', responseData);
  } catch {
    console.error('服务器错误');
    responseClient(res, 500, 2000, '服务器错误', responseData);
    
  }

}


