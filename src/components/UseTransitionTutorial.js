import React, { useDeferredValue, useState, useTransition } from "react";

// 그냥 new Array(1000)이라고 선언하면 array 생기기만 하고 출력이 안됨
// fill을 해줌으로써 무언가 값이 담긴 진짜 array가 생김
let array = new Array(10000).fill(0);

const UseTransitionTutorial = () => {
  let [name, setName] = useState("");
  // isPending은 startTransition이 처리 중일 때 true값을 가짐
  // --> isPending이 true일 경우, Loading... 이라는 내용 출력
  let [isPending, startTransition] = useTransition();
  // name이 변할 때마다 늦게 처리해줌(한가할 때)
  let state = useDeferredValue(name);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          // 성능이 느려지는 원인(setName부분)을 useTransition 함수로 감싸줌
          startTransition(() => {
            setName(e.target.value);
          });
        }}
      />
      {isPending
        ? "Loading..."
        : array.map((a, i) => {
            return <div key={i}>{state}</div>;
          })}
    </div>
  );
};

export default UseTransitionTutorial;
