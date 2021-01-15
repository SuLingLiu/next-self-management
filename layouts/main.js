import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  PlusCircleOutlined,
  FundOutlined,
  RedEnvelopeOutlined
} from '@ant-design/icons'

const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
  ssr: false,
})

const ROUTES = {
  path: '/',
  routes: [
    {
      path: '/list',
      name: '打卡管理',
      icon: <PlusCircleOutlined />,
      routes: [
        {
          path: '/',
          redirect: '/list/punchcard'
        },
        {
          name: '/ssg',
          path: '/ssg'
        },
        {
          name: '打卡',
          path: '/list/punchcard'
        },
        {
          name: '项目管理',
          path: '/list/project'
        },
        {
          name: '项目描述管理',
          path: '/list/projectDesc'
        },
        {
          name: '分数管理',
          path: '/list/score'
        },
        {
          name: '奖品列表',
          path: '/list/awardList'
        },
        
      ],
    },

    {
      path: '/analysis',
      name: '分析',
      icon: <FundOutlined />,
      routes: [
        {
          path: '/',
          redirect: '/analysis/punchcard'
        },
        {
          name: '打卡分析',
          path: '/analysis/punchcard'
        },
        
      ],
    },

  ],
}

const menuHeaderRender = (
  logoDom,
  titleDom,
  props
) => (
  <Link href="/">
    <a>
      {logoDom}
      {!props?.collapsed && titleDom}
    </a>
  </Link>
)

const menuItemRender = (options, element) => (
  <Link href={options.path}>
    <a>{element}</a>
  </Link>
)

export default function Main({ children }) {
  return (
    <ProLayout
      style={{ minHeight: '100vh' }}
      route={ROUTES}
      menuItemRender={menuItemRender}
      menuHeaderRender={menuHeaderRender}
      title="自我管理系统"
    >
      {children}
    </ProLayout>
  )
}
