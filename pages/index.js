
import MainLayout from '../layouts/main'
import { Button } from 'antd';
import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <MainLayout>
        首页{process.env.domainUrl}
      </MainLayout>
    )
  }
}

export default Home;
