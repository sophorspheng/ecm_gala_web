import React, { useState } from "react";
import {
  DownOutlined,
  LeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Space, Dropdown } from "antd";
import { json, useNavigate } from "react-router-dom";
import Title from "antd/es/skeleton/Title";
const { Header, Sider, Content } = Layout;

const LayoutOne = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [firstname,setFirstname] = useState('')
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleChangeMenu = (item) => {
    console.log(item.key);
    navigate(item.key);
  };
  const handleLogin = (user)=>{
    setUser(user)
  }

  const menu = [
    {
      label: "MY INFO",
    },
    {
      key: "#",
      icon: <UserOutlined />,
    },
    {
      key: "/customer",
      icon: <VideoCameraOutlined />,
      label: "Customer",
    }
  ];
  const menuUser = [
    {
      key: "1",
      label: <a>Profile</a>,
    },
    {
      key: "2",
      label: <a>Change Password</a>,
    },
    {
      key: "3",
      label: (
        <a
          onClick={() => {
            localStorage.setItem("login", "0");
            window.location.href = "/";
          }}
        >
          Logout
        </a>
      ),
    },
  ];
  const profile = localStorage.getItem("profile");

// 
  // // console.log(profile.firstname);
  // document.getElementById('get-single-item-from-ls').addEventListener("click",function(){
  //   const profile = JSON.parse(localStorage.getItem('profile'))
  //   document.getElementById('ls-currently').textContent = profile.firstname

  // })
  return (
    
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <MenuFoldOutlined
              style={{ fontSize: 26, paddingLeft: 20, paddingTop: 1 }}
              onClick={() => setCollapsed(!collapsed)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Dropdown
                  menu={{
                    items: menuUser,
                  }}
                  placement="bottomLeft"
                >
                  <Button type="link" className={"iconProfile"}>
                    <UserOutlined />
                    <DownOutlined />
                    {user}
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            height: "90vh",
          }}
        >
          {props.children}
        </Content>
      </Layout>

  );
};

export default LayoutOne;


