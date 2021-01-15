
import { Button, Table,  Card, message } from 'antd';
import React, { useState } from 'react';
import fetcher from '../../utils/request'
import MainLayout from '../../layouts/main'
import moment from 'moment';

import dbConnect from '../../utils/dbConnect'
import HeaderDetail from '../../components/headerDetail'

export default function AnalysisPunchcard({ punchCardData, total }) {
  const [totalData, setTotal] = useState(total);
  const [loading,setLoading] = useState(false)
  const columns = [
    {
      title: '创建时间',
      dataIndex: 'time',
      key: 'time',
      render: (text, record) => {
        text = Number(text)
        return moment(new Date(text)).format('YYYY-MM-DD')
      },
      align: 'center'
    },
    {
      title: '项目名',
      dataIndex: 'project',
      key: 'project',
      align: 'center',
      render: (text, record) => {
        return text;
      }
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
      render: (text, record) => {
        return text;
      }
    },
    {
      title: '得分',
      dataIndex: 'num',
      key: 'num',
      align: 'center',
      render: (text, record) => {
        return text;
      }
    }
  ]

  return (
    <MainLayout title="打卡分析">
      <HeaderDetail title="打卡分析"></HeaderDetail>
      <Card bordered={false} title={'打卡分析-------得分：' + totalData}>

      <Table
          loading={loading}
          columns={columns}
          dataSource={punchCardData}
          pagination={false}
          rowKey={columns => columns._id}
          size="middle"
        />
      </Card>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  await dbConnect()
  const result1 = await fetcher(
    '/api/list/getPunchCard'
  )
  const result2 = await fetcher(
    '/api/list/getPunchCardScore'
  )
    
  let total = result2.data.length ? result2.data[0].total : 0
  let result = {
    punchCardData: result1.data || [],
    total
  }
  return {
    props: result,
  }
}