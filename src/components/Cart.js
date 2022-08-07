import React, { Children, memo, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increaseAge, addCount, substractCount } from "../store";

// 자식 컴포넌트 재렌더링 막기 연습
const Child = memo(() => {
  console.log("재렌더링됨");
  return <div>자식임(자식 컴포넌트 재렌더링 test용)</div>;
});

const Cart = () => {
  // useSelector : Redux store 가져와주는 함수
  // store에 있는 모든 state들이 아래에 남음
  let user = useSelector((state) => {
    return state;
  });
  // console.log(user.user);

  // 모든 state가 아닌 특정 state만 불러오고 싶을 경우에는 아래와 같이 하위 항목으로 접근하면 됨
  let stock = useSelector((state) => {
    return state.stock;
  });
  // console.log(stock);

  let cart = useSelector((state) => state);
  // console.log(cart.cart[0].name);

  let dispatch = useDispatch();

  // memo의 원리: props가 변할 때만 재렌더링 해줌
  let [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* props를 사용했기 때문에 memo를 사용했으나 count가 변할 때마다 Child 컴포넌트도 재렌더링됨 */}
        <Child count={count}></Child>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          +
        </button>
        {user.user.name}의 장바구니
        <button
          onClick={() => {
            dispatch(increaseAge(10));
            console.log(user.user.age);
          }}
        >
          +
        </button>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>상품명</th>
              <th>수량</th>
              <th>변경하기</th>
            </tr>
          </thead>
          <tbody>
            {cart.cart.map((a, i) => {
              return (
                <tr key={i}>
                  <td>{cart.cart[i].id}</td>
                  <td>{cart.cart[i].name}</td>
                  <td>{cart.cart[i].count}</td>
                  <td>
                    <button
                      onClick={() => {
                        // changeName() 실행해달라고 store.js에 부탁
                        // 약간 spring boot controller 느낌
                        dispatch(addCount(cart.cart[i].id));
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        dispatch(substractCount(cart.cart[i].id));
                      }}
                    >
                      -
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Cart;
