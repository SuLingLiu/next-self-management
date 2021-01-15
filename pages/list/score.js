
  import fetcher from '../../utils/request'
  import MainLayout from '../../layouts/main'

  import dbConnect from '../../utils/dbConnect'
  import HeaderDetail from '../../components/headerDetail'
  import ModifyTable from "../../components/modify/modifyTable"


  export default function ListScore(props) {
    let dataSource = props.data || []
    return (
      <MainLayout>
        <HeaderDetail  title="分数管理"></HeaderDetail>

        <ModifyTable 
          dataSource={dataSource} 
          from="3" 
          title="分数管理"
        >
        </ModifyTable>
        
      </MainLayout>
    )
  }

  export async function getServerSideProps(context) {
    await dbConnect()
    
    const result =  await fetcher(
      '/api/list/getListScore'
    )
    
    return {
      props: result,
    }
  }