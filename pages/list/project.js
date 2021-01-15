
  import fetcher from '../../utils/request'
  import MainLayout from '../../layouts/main'
  import HeaderDetail from '../../components/headerDetail'

  import dbConnect from '../../utils/dbConnect'
  import ModifyTable from "../../components/modify/modifyTable"


  export default function ListProject(props) {
    let dataSource = props.data || []
    return (
      <MainLayout>
        <HeaderDetail  title="项目管理"></HeaderDetail>

        <ModifyTable 
          dataSource={dataSource} 
          from="1" 
          title="项目管理"
        >
        </ModifyTable>
        
      </MainLayout>
    )
  }

  export async function getServerSideProps(context) {
    await dbConnect()
    const result =  await fetcher(
      '/api/list/getListProject'
    )
    return {
      props: result,
    }
  }