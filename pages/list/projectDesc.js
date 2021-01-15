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
  import ModifyTable from "../../components/modify/modifyTable"


  export default function ListProjectDesc(props) {
    let dataSource = props.data || []
    return (
      <MainLayout>
        <HeaderDetail  title="项目描述管理"></HeaderDetail>

        <ModifyTable 
          dataSource={dataSource} 
          from="2" 
          title="项目描述管理"
        >
        </ModifyTable>
        
      </MainLayout>
    )
  }

  export async function getServerSideProps(context) {
    await dbConnect()
    
    const result =  await fetcher(
      '/api/list/getListProjectDesc'
    )
    
    return {
      props: result,
    }
  }