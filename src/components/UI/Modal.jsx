import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "" }) {
  const dialog = useRef();

  // 백드롭을 위해 open속성을 dialog에 설정하지 않고, useEffect에서 showModal() 사용
  useEffect(() => {
    if (open) {
      // 여기서 dialog 요소에 접근하기 위해 참조 사용
      dialog.current.showModal();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
