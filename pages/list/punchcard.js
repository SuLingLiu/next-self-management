
import { Button, Card, Form,  Radio, Select, message } from 'antd';
import React, { useState } from 'react';
import fetcher from '../../utils/request'
import MainLayout from '../../layouts/main'

import dbConnect from '../../utils/dbConnect'
import HeaderDetail from '../../components/headerDetail'

const FormItem = Form.Item;
const { Option } = Select;
export default function ListPunchcard({ projectData, projectDescData, scoreData, total }) {
  const [totalData, setTotal] = useState(total);
  const [form] = Form.useForm();
  const [loading,setLoading] = useState(false)
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 7,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 10,
      },
    },
  };
  const submitFormLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 10,
        offset: 7,
      },
    },
  };

  const onFinish = async (values) => {
    let newTotal = Number(totalData) + Number(values.num)
    setTotal(newTotal);
    setLoading(true)

    try {
      const result1 = await fetcher(
        '/api/list/savePunchCard',
        {
          method: 'POST',
          body: JSON.stringify(values),
        }
      )
      if(result1.code != 0) {
        message.error(result1.message)
      }
      const result2 = await fetcher(
        '/api/list/savePunchCardScore',
        {
          method: 'POST',
          body: JSON.stringify({ total: newTotal }),
        }
      )
  
      if(result2.code != 0) {
        message.error(result1.message)
      }else {
        message.success('保存成功')
      }
    } catch {
      message.error('系统繁忙请稍后再试')
    }

    form.resetFields();
    setLoading(false)
  };

  const onFinishFailed = (errorInfo) => {
    
    // dispatch({
    //   type: 'indexAdd/submitRegularForm',
    //   payload: {title: 1},
    // });
    // console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <MainLayout title="打卡">
      <HeaderDetail title="打卡"></HeaderDetail>
      <Card bordered={false} title={'欢迎您的使用-------得分：' + totalData}>

        <Form
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          form={form}
          name="basic"
          initialValues={{
            public: '1',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            {...formItemLayout}
            label="项目"
            name="project"
            rules={[
              {
                required: true,
                message: "请输入内容",
              },
            ]}
          >
            {/* <Radio.Group options={projectOption}  /> */}
            <Radio.Group>
              {projectData.map(item => (
                <Radio key={item._id} value={item.title}>{item.title}</Radio>
              ))}
            </Radio.Group>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="评分"
            name="num"
            rules={[
              {
                required: true,
                message: "请输入内容",
              },
            ]}
          >
            <Radio.Group >
              {scoreData.map(item => (
                <Radio key={item._id} value={item.num}>{item.num}</Radio>
              ))}
            </Radio.Group>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="描述"
            name="desc"
            rules={[
              {
                required: true,
                message: "请输入内容",
              },
            ]}
          >
            <Select
              placeholder="请选择"
            >
              {projectDescData.map(item => (
                <Option key={item._id} value={item.title}>{item.title}</Option>
              ))}
            </Select>

          </FormItem>


          <FormItem
            {...submitFormLayout}
            style={{
              marginTop: 32,
            }}
          >
            <Button type="primary" onClick={onReset}>取消</Button>
            <Button
              style={{
                marginLeft: 8,
              }}
              htmlType="submit"
              loading={loading}
            >
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  await dbConnect()
  console.log(111 + '刷新路由切换')
  const result1 = await fetcher(
    '/api/list/getListProject'
  )
  const result2 = await fetcher(
    '/api/list/getListProjectDesc'
  )
  const result3 = await fetcher(
    '/api/list/getListScore'
  )
  const result4 = await fetcher(
    '/api/list/getPunchCardScore'
  )

  let total = result4.data.length ? result4.data[0].total : 0

  let result = {
    projectData: result1.data || [],
    projectDescData: result2.data || [],
    scoreData: result3.data || [],
    total
  }
  console.log(222 + '刷新路由切换')
  return {
    props: result,
  }
}