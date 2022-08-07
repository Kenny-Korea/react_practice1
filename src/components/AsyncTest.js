import React, { useEffect, useState } from "react";

const AsyncTest = () => {
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  useEffect(() => {
    // count != 0 이라는 조건을 준 이유
    // 처음 페이지 렌더링될 때 useEffect가 한번 실행되기 때문에
    // age + 1이 한번 실행된 상태로 시작하게 됨
    if (count != 0 && count < 3) {
      setAge(age + 1);
    }
  }, [count]);
  return (
    <div>
      <div>안녕하십니까 전 {age}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        누르면한살먹기
      </button>
    </div>
  );
};

export default AsyncTest;
