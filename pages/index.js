
import MainLayout from '../layouts/main'
import { Button } from 'antd';
import React, { Component } from "react";
import { connect } from 'react-redux';


/*
//
@connect(state => ({num: state})
{this.props.num}
 onClick={() => { this.props.dispatch({type: 'add'})}
*/

@connect(state => ({num: state}),
{
  add: ()=>({type: 'add',payload: num})
  // add: (num)=>({type: 'add'})
})
class Home extends Component {
  render() {
    return (
      <MainLayout>
        {/* <div>
          <p>{this.props.num}</p>

          <Button onClick={this.props.add}>+</Button>
          <Button onClick={() => { this.props.add(2)}>+</Button>
          <Button onClick={() => { this.props.dispatch({type: 'minus'})}}>-</Button>
        </div> */}
        111{process.env.domainUrl}
      </MainLayout>
    )
  }
}

export default Home;
