import Head from 'next/head'
import {
    Form,
    Select,
    InputNumber,
    DatePicker,
    Switch,
    Slider,
    Button,
  } from 'antd'
  import fetcher from '../../utils/request'
  import MainLayout from '../../layouts/main'

  import dbConnect from '../../utils/dbConnect'
  import HeaderDetail from '../../components/headerDetail'
  import ModifyTable from "../../components/modify/modifyAward"


  export default function AwardList({dataSource,total}) {
    return (
      <MainLayout>
        <HeaderDetail  title="奖品列表"></HeaderDetail>

        <ModifyTable 
          dataSource={dataSource} 
          from="4" 
          total={total}
        >
        </ModifyTable>
        
      </MainLayout>
    )
  }

  export async function getServerSideProps(context) {
    await dbConnect()
    
    const result1 =  await fetcher(
      '/api/list/getAwardList'
    )
    const result2 = await fetcher(
      '/api/list/getPunchCardScore'
    )
    let total = result2.data.length ? result2.data[0].total : 0;
    
    let result = {
      dataSource: result1.data || [],
      total
    }
    return {
      props: result,
    }
  }