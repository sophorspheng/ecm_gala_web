import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import CustomerPage from "./HomePage/customerPage";
import Layout from "./HomePage/Layout";
import Login from "./HomePage/loginPage";
import FrontPage from "./HomePage/startup"


export default function App() {
  const isLogin = localStorage.getItem("login") == "1";
  return (
    <BrowserRouter>
      {!isLogin && (
        <Routes>
           <Route path="/" element={<FrontPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      )}
      {isLogin && (
        <Layout>
          <Routes>
            <Route path="/customer" element={<CustomerPage />}></Route>
          </Routes>
        </Layout>
      )}
      <Routes></Routes>
    </BrowserRouter>
  );
}