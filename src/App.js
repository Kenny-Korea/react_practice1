/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { lazy, Suspense, useEffect, useState } from "react";
import data from "./components/data";
import ShoeInfo from "./components/ShoeInfo";
import About from "./components/About";
import Event from "./components/Event";
import UseTransitionTutorial from "./components/UseTransitionTutorial";

// import Detail from "./components/Detail";
// import Cart from "./components/Cart";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import AsyncTest from "./components/AsyncTest";
// import { useQuery } from "react-query/build/cjs/packages/react-query/src";

const Detail = lazy(() => import("./components/Detail"));
const Cart = lazy(() => import("./components/Cart"));

function App() {
  let navigate = useNavigate();

  // let watched = [];
  // useEffect(() => {
  //   localStorage.setItem("watched", JSON.stringify(watched));
  // }, []);

  // user 이름 가져오기 - 1. 기존의 axios 이용
  // axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
  //   return a.data;
  // });

  // user 이름 가져오기 - 2. React-Query 이용
  // let result = useQuery("name", () => {
  //   axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
  //     return a.data;
  //   });
  // });

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            Koction
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event");
              }}
            >
              Event
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/useTransitionTutorial");
              }}
            >
              useTransition
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/asyncTest");
              }}
            >
              AsyncTest
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {/* {result.isLoading ? "로딩중" : result.data.name} */}
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg"></div>
      <div className="container">
        <div className="row">
          {/* <Link to="/">홈</Link>
          <Link to="/detail">상세페이지</Link> */}
          <Routes>
            <Route path="/" element={<ShoeInfo />} />
            <Route path="*" element={<div>없는 페이지입니당.</div>} />
            <Route path="/about" element={<About />}>
              {/* Nested Routes */}
              <Route path="member" element={<div>멤버임</div>} />
              <Route path="location" element={<div>위치임</div>} />
            </Route>
            <Route path="/event" element={<Event />}>
              <Route
                path="1"
                element={<p>첫 주문시 양배추즙 서비스</p>}
              ></Route>
              <Route path="2" element={<p>생일기념 쿠폰받기</p>}></Route>
            </Route>
            <Route
              path="/detail/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Detail /*shoes={shoes}*/ />
                </Suspense>
              }
            ></Route>
            {/* detail 뒤 붙이기 /:id */}
            <Route
              path="/cart"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="/useTransitionTutorial"
              element={<UseTransitionTutorial />}
            />
            <Route path="/asyncTest" element={<AsyncTest />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
