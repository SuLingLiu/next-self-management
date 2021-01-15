
import MainLayout from '../layouts/main'
import store from "../store/index";
import { Button } from 'antd';
import React, { Component } from "react";
import store from "../store/index-1";
//vue的响应式
// export default function Home() {

//   return (
//     <MainLayout>
//       <div>
//         <p>{store.getState()}</p>

//         <Button onClick={() => { store.dispatch({type: 'add'})}}>+</Button>
//         <Button onClick={() => { store.dispatch({type: 'minus'})}}>-</Button>
//       </div>
//       111{process.env.domainUrl}
//     </MainLayout>
//   )
// }

export default class Home11 extends Component {
  componentDidMount() {
    //订阅状态变化,一旦变更执行回调函数，让render重新执行，也可以在入口文件写一次，这样下面的dispatch才能启作用
    //每次都重新调用render和getState太low，且需要频繁导入import store from "../store/index";。要用更好简便的方法用react-redux，它可以创建上下文
    store.subscribe(()=>{
      this.forceUpdate();
    })
  }
  render() {
    return (
      <MainLayout>
        <div>
          <p>{store.getState()}</p>

          <Button onClick={() => { store.dispatch({type: 'add'})}}>+</Button>
          <Button onClick={() => { store.dispatch({type: 'minus'})}}>-</Button>
        </div>
        {/* 111{process.env.domainUrl} */}
      </MainLayout>
    )
  }
}
