/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
  Menu,
  Row,
  Col,
  Modal,
  Space,
  Dropdown,
  Avatar,
  Divider,
  Button,
} from "antd";
import { Link, withRouter, Redirect } from "react-router-dom";
import logo from "../../pages/login/images/logo.png";
import {
  VideoCameraOutlined,
  PlaySquareOutlined,
  HomeOutlined,
  UserOutlined,
  CaretDownOutlined,
  ManOutlined,
} from "@ant-design/icons";
import "./Navheader.less";

import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

class Navheader extends Component {
  /**
   * 头侧菜单
   */
  constructor(props) {
    super(props);
    this.state = {
      current: "home",
    };
  }
  /**
   * 菜单点击事件
   */
  handleMenuClick = (e) => {
    this.setState({ current: e.key });
  };
  /**
   * 退出登录
   */
  loginout = () => {
    //显示是否确认退出
    Modal.confirm({
      title: "退出RTMP视频直播系统",
      onOk: () => {
        console.log("确认");
        //确定后删除存储的用户信息
        //local中的用户信息
        storageUtils.removeUser();
        //内存中的用户信息
        memoryUtils.user = {};
        //跳转到登录页面
        this.props.history.replace("/");
      },
      //确定后，退出登录
      onCancel() {
        console.log("返回");
      },
    });
  };

  //个人中心事件
  personal = () => {
    this.props.history.replace("/admin/person");
  };
  render() {
    const user = memoryUtils.user;
    const personal = (
      <div className="personal">
        <text>欢迎{user.username}来到RTMP视频直播系统</text>
        <Divider style={{ backgroundColor: "rgb(241, 241, 241)" }}></Divider>
        <a onClick={this.loginout}>
          <ManOutlined />
          退出登录
        </a>
        <div className="personalcenter">
          <Button onClick={this.personal}>个人中心</Button>
          <Button>我的收藏</Button>
          <Button>消息通知</Button>
        </div>
      </div>
    );
    return (
      <Row>
        <Col span={8}>
          <div className="col1">
            <img src={logo} alt="logo" />
            <h2>RTMP视频直播系统</h2>
          </div>
        </Col>
        <Col span={12}>
          <div className="col2">
            <Menu
              onClick={this.handleMenuClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="home" className="menu">
                <Link to="/admin">
                  <HomeOutlined />
                  首页
                </Link>
              </Menu.Item>
              <Menu.Item key="live" className="menu">
                <Link to="/admin/live">
                   <PlaySquareOutlined />
                  直播
                </Link>
                     </Menu.Item>
              <Menu.Item key="ptz" className="menu">
                <Link to="/admin/ptz">
                  <VideoCameraOutlined />
                  PTZ
                </Link>
              </Menu.Item>
              <Menu.Item key="im" className="menu">
                <Link to="/admin/im">
                  <VideoCameraOutlined />
                  聊天室
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col span={4}>
          <div className="col3">
            <Space>
              <Dropdown overlay={personal}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    <Avatar
                      size={45}
                      icon={<UserOutlined />}
                      style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                    />
                    {user.username}
                    <CaretDownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Space>
          </div>
        </Col>
      </Row>
    );
  }
}
export default withRouter(Navheader);
