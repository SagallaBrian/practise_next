import { Ref, forwardRef } from "react";

function RequestChildb({}, ref: Ref<HTMLInputElement>) {
  return <input type="text" className=" border border-solid me-2" ref={ref} />;
}

export default forwardRef(RequestChildb);
