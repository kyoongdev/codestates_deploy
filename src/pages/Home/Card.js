import React, { useCallback, useEffect, useState } from "react";

const AGE = 20;
const Card = ({ text }) => {
  const [count, setCount] = useState(0);

  const onCountUp = useCallback(async () => {
    setCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    onCountUp();
  }, [text, onCountUp]);

  //의존성 배열에 들어가는 경우
  //1) 이 변수/함수가 변할 때마다 실행하고 싶을 때
  //2) 외부에서 선언된 변수/함수가 useEffect의 콜백함수에서 사용이 될 때
  return (
    <section>
      <h2>Card</h2>
      <p>카드의 값 : {text}</p>
      <button className="asdfdsa" disabled>
        버튼
      </button>
    </section>
  );
};

export default Card;
