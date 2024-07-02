import { useRef } from "react";

function RequestChilda() {
  const inputRefa = useRef<HTMLInputElement>(null);
  const focusInputa = () => {
    // Access the underlying DOM node directly via inputRef.current
    if (inputRefa.current) {
      inputRefa.current.focus();
    }
  };

  const handleOnChange = () => {
    if (inputRefa.current) {
      const username = inputRefa.current.value;
      console.log(`${username}`);
    }
  };

  console.log("Component Rendered Once");

  return (
    <>
      <input
        type="text"
        ref={inputRefa}
        className=" border border-solid me-2"
        onChange={handleOnChange}
      />
      <button onClick={focusInputa}>Set Focus A</button>
    </>
  );
}

export default RequestChilda;
