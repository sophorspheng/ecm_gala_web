import React, { useState } from 'react';
import '../HomePage/styleSheet.css';
import logo from './logo.png';
import logo1 from './12.jpg';
import logo2 from './13.jpg';
import logo3 from './14.jpg';
import logo15 from './15.jpg';
import axios from 'axios';
import {
  DatePicker,
  Button,
  Space,
  Popconfirm,
  Input,
  Modal,
  Select,
  Radio,
  Spin,
  Dropdown,
  message,
  Table,
  Typography,
  Row,
  Col,
  Carousel,
} from "antd";
import {
  DownOutlined,
  LeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const About = (props) => {
  const [active, setActive] = useState("nav_menu1");
  const nav_Toggler = () => {
    active === 'nav_menu1' ? setActive('nav_menu1 nav_active') : setActive('nav_menu1');
  };
  const [uid, setUID] = useState(null);
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [email, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const [list, setList] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  const { Option } = Select;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setImage] = useState(null);
  const [gender, setGender] = useState("1");
  const [textSearch, setTextSearch] = useState("");
  const [isActive, setIsActive] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openmodalform, setOpenModalForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("myfile", image);

    await axios.post("http://localhost:8080/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      setVisibleModal(false);
      clearform();
      message.success(res.data.message);
    });
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handleCancel2 = () => {
    setOpenModalForm(false);
  };

  const handleCloseModal2 = () => {
    setOpenModalForm(false);
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
  };

  const handleOpenModal = () => {
    clearform();
    setVisibleModal(true);
  };

  const onChangeImageProfiles = (e) => {
    setImage(e.target.files[0]);
  };

  const clearform = () => {
    setFirstname("");
    setLastname("");
    setGender("");
    setImage("");
    setPassword("");
    setEmailPhone("");
  };

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
    },
  ];

  const menuUser = [
    {
      key: "1",
      label: <a onClick={handleOpenModal}>Create New</a>,
    },
    {
      key: "2",
      label: <a onClick={() => { window.location.href = '/login'; }}>Sign In</a>,
    },
  ];

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <header className='nav1'>
        <nav className='nav2'>
          <img className='logo1' src={logo} alt="logo" />
        </nav>
        <ul className={active}>
          <li className='hoveri'>
            <a href='#'>Home</a>
          </li>
          <li>
            <a href='#'>About</a>
          </li>
          <li>
            <a href='#'>Skills</a>
          </li>
          <li>
            <a href='#'>Contact</a>
          </li>
        </ul>
        <div onClick={nav_Toggler} className="nav_toggler1">
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className='nav_profile'>
          <Dropdown
            menu={{ items: menuUser }}
            placement="bottomLeft"
          >
            <Button type="link" className={"iconProfile"}>
              <UserOutlined />
              <DownOutlined />
              {"Admin"}
            </Button>
          </Dropdown>
        </div>
      </header>
      <body>
      <Content style={{ padding: '20px' }}>
        <Row justify="center">
          <Col span={12}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>About Us</Title>
            <Carousel autoplay>
              <div>
              <img className='logo' src={logo15} alt="logo15" style={{ width: '100%', height: 'auto' }} />
                
              </div>
              <div>
              <img className='logo' src={logo1} alt="logo1" style={{ width: '100%', height: 'auto' }} />
              </div>
              <div>
              <img className='logo' src={logo2} alt="logo2" style={{ width: '100%', height: 'auto' }} />

              </div>
              <div>
              <img className='logo' src={logo3} alt="logo3" style={{ width: '100%', height: 'auto' }} />

              </div>
            </Carousel>
            {props.children}
          </Col>
        </Row>
      </Content>
      </body>
      <Modal
        open={visibleModal}
        title="New Customer"
        onCancel={handleCloseModal}
        footer={null}
        maskClosable={false}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            value={firstname}
            placeholder="Firstname"
            onChange={(event) => setFirstname(event.target.value)}
          />
          <Input
            value={lastname}
            placeholder="Lastname"
            onChange={(event) => setLastname(event.target.value)}
          />
          <Select
            value={gender}
            defaultValue={"1"}
            style={{ width: "100%" }}
            onChange={(value) => setGender(value)}
          >
            <Option value={"1"}>Male</Option>
            <Option value={"0"}>Female</Option>
          </Select>
          <Input
            value={email}
            placeholder="Email or Phone"
            onChange={(event) => setEmailPhone(event.target.value)}
          />
          <Input
            value={password}
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input type="file" onChange={onChangeImageProfiles} />
          <Radio.Group
            value={isActive}
            onChange={(event) => setIsActive(event.target.value)}
          >
            <Radio value={1}>Active</Radio>
            <Radio value={2}>Disable</Radio>
          </Radio.Group>
          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={handleSubmit}>Save</Button>
          </Space>
        </Space>
      </Modal>
    </div>
  );
};

export default About;


// import React from "react";

// import axios from "axios";
// import { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.css';
// import { DownOutlined } from '@ant-design/icons';
// import { useNavigate} from "react-router-dom";
// import {
//   FilterFilled,
//   SaveOutlined,
//   DeleteFilled,
//   EditFilled,
// } from "@ant-design/icons";
// import {
//   DatePicker,
//   Button,
//   Space,
//   Popconfirm,
//   Input,
//   Modal,
//   Select,
//   Radio,
//   Spin,
//   message,
//   Table,
//   Card,
//   Dropdown, Typography,theme
// } from "antd";
// import "./HomePage.css";
// import { Header } from "antd/es/layout/layout";
// import "../HomePage/startup.css";

// const items = [
//   {
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//         Change Profile
//       </a>
//     ),
//     key: '0',
//   },
//   {
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
//         Change Password
//       </a>
//     ),
//     key: '1',
//   },
//   {
//     key: "3",
//     label: (
//       <a
//         onClick={() => {
//           localStorage.setItem("login", "0");
//           window.location.href = "/login";
//         }}
//       >
//         Login
//       </a>
//     ),
//   },
  
// ];
// const HomePage = (props) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const handleChangeMenu = (item) => {
//     console.log(item.key);
//     navigate(item.key);
//   };
//  return(

// <Header style={{backgroundColor:'gray'}}>
// <div className="container">
//   <div className="rows">
//     <Space>
//     <ul>
//       <li><a href="#">Home</a></li>
//       <li><a href="#">Academy</a></li>
//       <li><a href="#">About us</a></li>
//       <li>
//       <Dropdown
//     menu={{
//       items,
//     }}
//   >
//     <a onClick={(e) => e.preventDefault()}>
//       <Space>
//         MENU
//         <DownOutlined />
//       </Space>
//     </a>
//   </Dropdown>
        
//       </li>
//     </ul>

//     </Space>
//     </div>
//     </div>
//     <body >
//       <div className="container" style={{ textAlign:"center", fontFamily:'cursive',fontSize:50 }}>
//         <h1>Welcome</h1>
//       </div>
//     </body>
//   </Header>


//  )
  
// };
// export default HomePage;
