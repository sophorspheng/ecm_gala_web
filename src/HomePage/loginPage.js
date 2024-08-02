import React, { useState } from "react";
import {
  CiOutlined,
  EllipsisOutlined,
  LockOutlined,
  RadiusSettingOutlined,
  TaobaoCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
// import { Space, Modal } from "antd";
// import { Option } from "antd/es/mentions";
import { Option } from "antd/es/mentions";
import {
  Space,
  Modal,
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  message,
  Select,
  Radio,
} from "antd";
import { json, useSearchParams } from "react-router-dom";
import axios from "axios";
import warning from "antd/es/_util/warning";
const Login = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleCloseModal = () => {
    setVisibleModal(false);
  };
  const handleCancel = () => {
    setVisibleModal(false);
  };
  const OpenForm = () => {
    setVisibleModal(true);
  };
  const handleLogin = () => {
    var params = {
      email: email,
      password: password,
    };
    axios.post("https://backendweb-chi.vercel.app/login", params).then((res) => {
      if (res.data && res.data.is_login) {
        // message.success("Login success");
        localStorage.setItem("login", "1"); //is_login = value 1
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
        window.location.href = "/customer";
      } else {
        message.warning(res.data.message);
      }
    });
  };
  return (
    <div style={{ paddingTop: 150 }}>
      <Form
        onFinish={""}
        style={{
          backgroundColor: "aquamarine",
          padding: 20,
          width: 300,
          margin: "auto",
          borderRadius: 8,
        }}
      >
        <h1 style={{ textAlign: "center" }}>Welcome</h1>
        <Form.Item style={{ margin: "auto", width: 250 }}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input email or phone!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email Or Phone"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}
          >
            <Input
              type="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            style={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Checkbox noStyle>Remember</Checkbox>
            <a>forgot password?</a>
          </Form.Item>

          <Form.Item
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Space>
              <Button onClick={handleLogin} type="primary">
                Login
              </Button>
              or <a onClick={OpenForm}>register now!</a>
            </Space>
          </Form.Item>
        </Form.Item>
      </Form>

      <Modal
        open={visibleModal}
        title="New Customer"
        onCancel={handleCloseModal}
        footer={null}
        maskClosable={false}
      >
        if (condition) {}
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input type="text" placeholder="Firstname" />

          <Input
            value={""}
            placeholder="lastname"
            onChange={(event) => {
              // setLastname(event.target.value);
            }}
          />
          <Select
            value={""}
            defaultValue={"1"}
            style={{ width: "100%" }}
            onChange={(value) => {
              // setGender(value);
            }}
          >
            <Option value={"1"}>Male</Option>
            <Option value={"0"}>Female</Option>
          </Select>
          <input type="file" onChange={""} />
          <Radio.Group
            value={""}
            onChange={(event) => {
              // setIsActive(event.target.value);
            }}
          >
            <Radio value={1}>Active</Radio>
            <Radio value={2}>Disable</Radio>
          </Radio.Group>
          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={""}>
              Save
            </Button>
          </Space>
        </Space>
      </Modal>
    </div>
  );
};
export default Login;
