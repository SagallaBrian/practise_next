import { useLoginUser } from "@/api/hooks";
import { useAuth } from "@/common/context";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "@/common/utils/constants";
import { useForm } from "react-hook-form";

interface userForm {
  email: string;
  password: string;
}

function PageLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login } = useLoginUser();

  const onSubmitFunc = (formData: userForm) => {
    login(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitFunc)}>
      {errors?.root && <div className="">{errors.root.message}</div>}
      <div className="mb-4">
        <label htmlFor="email" className="">
          Email Address
        </label>
        <input
          type="text"
          className="block w-full rounded-md border border-gray-300 p-2"
          onChangeCapture={() => trigger("email")}
          placeholder="Enter Email"
          {...register("email", {
            required: "Email is Required",
            pattern: {
              value: EMAIL_PATTERN,
              message: "Please Enter a Valid Email",
            },
          })}
          id="email"
        />
        <span className="text-red-500">
          {errors?.email && errors.email.message}
        </span>
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="block w-full rounded-md border border-gray-300 p-2"
          placeholder="Enter Password"
          {...register("password", {
            required: "Password is Required",
            pattern: {
              value: PASSWORD_PATTERN,
              message: "Please Enter a Valid Password",
            },
            minLength: {
              value: 8,
              message: "Password must have atleast 8 Characters",
            },
          })}
          id="password"
        />
        <span className="text-red-500">
          {errors?.password && errors.password.message}
        </span>
      </div>
      <button
        type="submit"
        className="block w-full p-2 bg-indigo-500 text-white shadow-sm hover:bg-indigo-500 rounded-md"
      >
        {true ? "Loading" : "Sign In"}
      </button>
    </form>
  );
}

export default PageLogin;
