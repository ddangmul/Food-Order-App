import { createContext, useReducer } from "react";

const CartContext = createContext({
  // 자동완성 및 컨텍스트 객체 완성 용도 (컨텍스트 구조)
  items: [],
  addItem: (item) => {},
  removeItem: (item) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // 메뉴 추가 상태 업데이트
    // state.items.push(action.item) // 항목 수 말고 항목의 양 수를 늘ㄹ기
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      // 해당 항목이 이미 배열에 있는 경우
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    // 메뉴 삭제 상태 업데이트
  }
}

export function CartContextProvider({ children }) {
  useReducer(cartReducer, { items: [] });

  return <CartContext.Provider>{children}</CartContext.Provider>;
}

export default CartContext;
