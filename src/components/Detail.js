/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import css from "../App.css";
import { addItem } from "../store";
import { useDispatch } from "react-redux";

// SASS 문법
const YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;
// styled-component를 매개변수로 받아서 기존 속성을 추가해줄 수 있음
const NewBtn = styled.button(YellowBtn);

const Detail = () => {
  const [count, setCount] = useState(0);

  const [shoes] = useState(data);

  const { id } = useParams(data);
  let item = shoes.find((a) => {
    // a.id: data의 id속성
    // id: useParam으로 불러온 url의 숫자값
    return (a.id = id);
  });

  const [alert, setAlert] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(!alert);
    }, 2000);
    // return clearTimeout(timeout);
    // 처음 mount 시에만 동작해야 하므로 []로 넣어줌
  }, []);

  const [num, setNum] = useState(false);
  const [alert2, setAlert2] = useState(false);

  // useEffect(() => {
  //   if (isNaN(num) === true) {
  //     setAlert2(!alert2);
  //   }
  //   // setTimeout(() => {
  //   //   setAlert2(!alert2);
  //   // }, 2000);
  // }, [num]);

  // 최근 본 상품 구현하는 파트
  // useEffect(() => {
  //   let data = localStorage.getItem("watched");
  //   data = JSON.parse(data);
  //   data.push(item.id);
  //   localStorage.setItem("watched", JSON.stringify(data));
  // }, []);
  localStorage.setItem("watched", "[]");
  useEffect(() => {
    let data = localStorage.getItem("watched");
    data = JSON.parse(data);
    // console.log(data);
    // console.log(item.id);

    data.push(item.id);
    // 배열을 Set으로 형변환
    data = new Set(data);
    // 다시 Set형을 Array로 형변환
    data = Array.from(data);
    localStorage.setItem("watched", JSON.stringify(data));
  }, []);

  const [tabContent, setTabContent] = useState(0);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="container">
        {alert2 === true ? (
          <div className="alert alert-warning">제발 좀 그러지 마세요</div>
        ) : null}
        <input
          type="text"
          onChange={(e) => {
            setNum(e.target.value);
          }}
        />
        {/* <button
          onClick={isNaN(num) === true ? setAlert2(!alert2) : null}
        ></button> */}
        {alert === true ? (
          <div className="alert alert-warning">2초 내 구매 시 할인</div>
        ) : null}
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          {count}
        </button>
        <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
        <div className="row">
          <div className="col-md-6">
            <img
              src={
                "https://codingapple1.github.io/shop/shoes" +
                (parseInt(item.id) + 1) +
                ".jpg"
              }
              width="100%"
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{item.title}</h4>
            <p>{item.content}</p>
            <p>{item.price}</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch(
                  addItem({
                    id: item.id,
                    name: item.title,
                    count: 1,
                  })
                );
              }}
            >
              주문하기
            </button>
          </div>
        </div>
      </div>

      <Nav justify variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTabContent(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTabContent(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTabContent(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tabContent={tabContent} />
    </div>
  );
};

const TabContent = ({ tabContent }) => {
  let [fade, setFade] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [tabContent]);
  // if (tabContent == 0) {
  //   return <div>내용0</div>;
  // }
  // if (tabContent == 1) {
  //   return <div>내용1</div>;
  // }
  // if (tabContent == 2) {
  //   return <div>내용2</div>;
  // }
  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tabContent]}
    </div>
  );
};

export default Detail;
