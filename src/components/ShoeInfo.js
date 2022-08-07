/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import data from "./data";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import watched from "../App";

const ShoeInfo = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let [shoes, setShoes] = useState(data);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  if (loading) {
    <div>로딩 중...</div>;
  }
  return (
    <div>
      {shoes.map((a, i) => {
        return (
          <div className="col-md-4" key={i}>
            <img
              src={
                "https://codingapple1.github.io/shop/shoes" + (i + 1) + ".jpg"
              }
              width="80%"
            />
            <h4
              onClick={() => {
                // watched.push(i);
                navigate("/detail/" + i);
              }}
            >
              {shoes[i].title}
            </h4>
            <p>{shoes[i].price}</p>
          </div>
        );
      })}
      <button
        onClick={() => {
          setLoading(true);
          axios
            .get("https://codingapple1.github.io/shop/data2.json")
            .then((result) => {
              let copy = [...shoes, ...result.data];
              // copy.concat(result);
              setShoes(copy);
            })
            // 데이터 get 실패 시, catch문에 예외 코드 작성
            .catch(() => {
              console.log("failed");
            });
          setLoading(false);
        }}
        onDoubleClick={() => {
          setLoading(true);
          axios
            .get("https://codingapple1.github.io/shop/data3.json")
            .then((result) => {
              let copy = [...shoes, ...result.data];
              // copy.concat(result);
              setShoes(copy);
            })
            // 데이터 get 실패 시, catch문에 예외 코드 작성
            .catch(() => {
              console.log("failed");
            });
          setLoading(false);
        }}
      >
        더보기
      </button>
    </div>
  );
};

export default ShoeInfo;
