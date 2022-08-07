import { configureStore, createSlice } from "@reduxjs/toolkit";
import stock from "./store/stockSlice.js";

// user라는 state
let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 29 },
  // state를 수정해주는 함수 선언
  reducers: {
    // 아래 state는 기존의 state를 뜻함
    // changeName(state) {
    //   return { name: "park", age: 29 };
    // },
    changeName(a) {
      a.name = "park";
    },
    increaseAge(state, action) {
      state.age += action.payload;
    },
  },
});
// changeName이라는 함수 export 하는법(Destructuring 문법)
export let { changeName, increaseAge } = user.actions;

// stockSlice.js로 이동시킴
// let stock = createSlice({
//   name: "stock",
//   initialState: [10, 11, 12],
// });

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    // 매개변수를 넣어주면 위에 저장한 state가 모두 출력됨
    addCount(state, action) {
      let index = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[index].count += 1;
    },
    substractCount(state, action) {
      let index = state.findIndex((a) => {
        //                    2
        return a.id === action.payload;
      });
      console.log(index); // 0 or 1
      if (state[index].count > 1) {
        state[index].count -= 1;
      } else {
        // 삭제하기 (1 이하로 내려가면 장바구니 목록에서 제거)
        // pop이 아니라 splice를 사용해야함;;
        // ***** ERROR *****
        // state.splice(state[index], 1);
        // Proxy 객체 찍힘;;
        state.splice(index, 1);
      }
    },
    addItem(state, action) {
      // 새로운 상품이면 장바구니에 추가하고, 이미 담긴 상품이면 count++ 해주기

      state.find((a) => {
        console.log(a.id);
        console.log(action.payload.id);

        return a.id === action.payload.id;
      });
      if (
        state.find((a) => {
          return a.id === action.payload.id;
        })
      ) {
        let index = state.findIndex((a) => {
          return a.id === action.payload;
        });
        state[index].count += 1;
      } else {
        let index = state.findIndex((a) => {
          return a.id === action.payload;
        });
        state.push(action.payload);
      }
    },
  },
});
export let { addCount, substractCount, addItem } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
