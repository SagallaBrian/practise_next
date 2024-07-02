import { ReactNode } from "react";

function RequestChildd({ children }: { children: ReactNode }) {
  const ifPossibleCallFromChild = () => {
    console.log("The function is called");
  };
  return (
    <>
      {children}
    </>
  );
}

export default RequestChildd;
