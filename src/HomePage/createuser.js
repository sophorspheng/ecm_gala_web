import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  FilterFilled,
  SaveOutlined,
  DeleteFilled,
  EditFilled,
  BorderBottomOutlined,
} from "@ant-design/icons";
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
  message,
  Table,
} from "antd";
import "./HomePage.css";
import { Header } from "antd/es/layout/layout";
import TimelineItem from "antd/es/timeline/TimelineItem";

const HomePage = (req, res) => {
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
  useEffect(() => {
    getList(); //call function getList
  }, []);
  const getList = () => {
    axios({
      url: "https://backendweb-chi.vercel.app/getList",
      method: "GET",
    })
      .then((res) => {
        console.log(res.data.list_customers);
        setList(res.data.list_customers);
        setLoading(false);
        clearform();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clearform = () => {
    setFirstname("");
    setLastname("");
    setGender("");
    setImage("");
    setPassword("");
    setEmailPhone("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("myfile", image);
    const result = await axios
      .post("https://backendweb-chi.vercel.app/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setVisibleModal(false);
        getList();
        clearform();
        message.success(res.data.message);
      });
  };
  const EditData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uid", uid);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("myfile", image);
    const result = await axios
      .put("https://backendweb-chi.vercel.app/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // setVisibleModal(true);
        setOpenModalForm(false);
        getList();

        clearform();
        message.success(res.data.message);
        setVisibleModal(false);
      });
  };
  const handleClickEdit = (item, index) => {
    setOpenModalForm(true);
    setFirstname(item.firstname);
    setLastname(item.lastname);
    setGender(item.gender);
    setEmailPhone(item.email);
    setImage(item.image);
    setPassword(item.password);
    setUID(item.uid);
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
    // setOpenModalForm(true);
  };
  const onConfirmDelete = (id) => {
    // alert("successfully");
    axios({
      url: "https://backendweb-chi.vercel.app/remove/" + id,
      method: "DELETE",
      //data: {}//json body params
    }).then((res) => {
      setVisibleModal(false);
      getList();
      clearform();
      message.error(res.data.message);
    });
  };
  const onChangeImageProfiles = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div style={{ padding: 30, margin: 10 }}>
      <Spin spinning={loading}>

          

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
              placeholder="firstname"
              onChange={(event) => {
                setFirstname(event.target.value);
              }}
            />
            <Input
              value={lastname}
              placeholder="lastname"
              onChange={(event) => {
                setLastname(event.target.value);
              }}
            />
            <Select
              value={gender}
              defaultValue={"1"}
              style={{ width: "100%" }}
              onChange={(value) => {
                setGender(value);
              }}
            >
              <Option value={"1"}>Male</Option>
              <Option value={"0"}>Female</Option>
            </Select>
            <Input
              value={email}
              placeholder="Email or Phone"
              onChange={(event) => {
                setEmailPhone(event.target.value);
              }}
            />
            <Input
              value={password}
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input type="file" onChange={onChangeImageProfiles} />
            <Radio.Group
              value={isActive}
              onChange={(event) => {
                setIsActive(event.target.value);
              }}
            >
              <Radio value={1}>Active</Radio>
              <Radio value={2}>Disable</Radio>
            </Radio.Group>
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" onClick={handleSubmit}>
                Save
              </Button>
            </Space>
          </Space>
        </Modal>
      </Spin>
      <div>
        <div>
          <Modal
            open={openmodalform}
            title="Edit Customer"
            onCancel={handleCloseModal2}
            footer={null}
            maskClosable={false}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                value={firstname}
                placeholder="firstname"
                onChange={(event) => {
                  setFirstname(event.target.value);
                }}
              />
              <Input
                value={lastname}
                placeholder="lastname"
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
              />
              <Select
                value={gender}
                defaultValue={"1"}
                style={{ width: "100%" }}
                onChange={(value) => {
                  setGender(value);
                }}
              >
                <Option value={"1"}>Male</Option>
                <Option value={"0"}>Female</Option>
              </Select>
              <Input
                value={email}
                placeholder="email"
                onChange={(event) => {
                  setEmailPhone(event.target.value);
                }}
              />

              <input type="file" onChange={onChangeImageProfiles} />
              <Radio.Group
                value={isActive}
                onChange={(event) => {
                  setIsActive(event.target.value);
                }}
              >
                <Radio value={1}>Active</Radio>
                <Radio value={2}>Disable</Radio>
              </Radio.Group>
              <Space style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleCancel2}>Cancel</Button>
              </Space>
            </Space>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
