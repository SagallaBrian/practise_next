import { Ref, forwardRef, useRef, useImperativeHandle } from "react";

interface InputHandle {
  focusInput: () => void;
}

function RequestChildc({}, ref: Ref<InputHandle>) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Expose focusInput method to parent component
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return (
    <input type="text" className=" border border-solid me-2" ref={inputRef} />
  );
}

export default forwardRef(RequestChildc);
