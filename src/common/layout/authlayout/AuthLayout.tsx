import { ReactNode } from "react";
import Image from "next/image";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
      <div className="flex flex-col h-full gap-10  justify-center items-center">
        <Image
          width={350}
          height={250}
          src="/images/logo.svg"
          alt="Msquare Market"
        />
        <Image
          className=" hidden md:inline-block object-contain "
          width={400}
          height={400}
          alt="login"
          src="/images/img_login.png"
        />
      </div>
      <div className=" flex flex-col justify-center  bg-blue-500">
        <div className="bg-white border px-5 py-10 rounded-md w-11/12 lg:w-4/5 xl:w-1/2  mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
