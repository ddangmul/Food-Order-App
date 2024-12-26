import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose, className = "" }) {
  const dialog = useRef();

  // 백드롭을 위해 open속성을 dialog에 설정하지 않고, useEffect에서 showModal() 사용
  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      // 여기서 dialog 요소에 접근하기 위해 참조 사용
      modal.showModal();
    }

    // clean up 함수: 컴포넌트 재실행 전, open이 false일 경우 실행
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
