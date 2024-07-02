import { useRef } from "react";
import RequestChilda from "./components/RequestChilda";
import RequestChildb from "./components/RequestChildb";
import RequestChildc from "./components/RequestChildc";
import RequestChildd from "./components/RequestChildd";

interface InputHandle {
  focusInput: () => void;
}

function PlatformRequest() {
  const inputRefb = useRef<HTMLInputElement>(null);
  const inputRefc = useRef<InputHandle>(null);
  const focusInputb = () => {
    // Access the underlying DOM node directly via inputRef.current
    if (inputRefb.current) {
      inputRefb.current.focus();
    }
  };
  const focusInputc = () => {
    // Access the focusInput method on the child component
    if (inputRefc.current) {
      inputRefc.current.focusInput();
    }
  };

  return (
    <>
      <div className="p-2">
        <RequestChilda />
      </div>
      <div className="p-2">
        <RequestChildb ref={inputRefb} />
        <button onClick={focusInputb}>Set Focus B</button>
      </div>
      <div className="p-2">
        <RequestChildc ref={inputRefc} />
        <button onClick={focusInputc}>Set Focus C</button>
      </div>
      <div className="p-2">
        <RequestChildd>
          <button>Do something on Click</button>
        </RequestChildd>
      </div>
    </>
  );
}

export default PlatformRequest;
