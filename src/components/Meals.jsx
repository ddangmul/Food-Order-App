import { useState, useEffect } from "react";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]); // 초기에는 빈배열로 UI 렌더링 후, fetch되어 상태값에 데이터가 들어오면 UI를 업데이트

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");
      // { method: "GET" }이 기본값이므로 두번째 인수로 입력하지 않아도 됨

      if (!response.ok) {
        // ...
      }

      const meals = await response.json();
      setLoadedMeals(meals);
    }

    fetchMeals(); // useEffct 사용 이유: fetch함수 호출문을 컴포넌트 내부에서 실행하면 상태값이 업데이트될 때마다 함수도 재실행되어 무한루프를 일으킨다.
  }, []); // fetchMeals는 어차피 useEffect 내부에서만 사용하고 있어 의존성에 추가할 이유가 없다. 지금 사용 중인 외부 요소는 set함수 뿐인데, set함수는 리액트에서 절대 변하지 않음을 보장받는다.

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
