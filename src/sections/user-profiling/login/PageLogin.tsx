import { getPostsTest } from "@/api/hooks/users";
import Image from "next/image";

function PageLogin() {
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
        <div className="bg-white border px-5 py-10 rounded-md w-1/2  mx-auto">
          <form action="">
            <div className="mb-4">
              <label htmlFor="email" className="">
                Email Address
              </label>
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 p-2"
                placeholder="Enter Email"
                id="email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="block w-full rounded-md border border-gray-300 p-2"
                placeholder="Enter Password"
                id="password"
              />
            </div>
            <button className="block w-full p-2 bg-indigo-500 text-white shadow-sm hover:bg-indigo-500 rounded-md">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PageLogin;
