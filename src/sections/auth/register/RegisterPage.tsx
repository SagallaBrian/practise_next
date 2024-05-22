import { useRegisterUser } from "@/api/hooks";
import { UserSignUpRsq } from "@/models";
import { Field, Form, Formik } from "formik";

function RegisterPage() {
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  };

  const { mutate: registerUser, isPending } = useRegisterUser();

  const handleSubmit = (data: UserSignUpRsq) => {
    console.log(data);
    registerUser(data);
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <Field
              name="firstName"
              placeholder="First Name"
              className=" h-10 mb-2 block w-full border rounded-md px-2"
            />
            <Field
              name="lastName"
              placeholder="Last Name"
              className=" h-10 mb-2 block w-full border rounded-md px-2"
            />
            <Field
              name="email"
              placeholder="Email"
              className=" h-10 mb-2 block w-full border rounded-md px-2"
            />
            <Field
              name="password"
              placeholder="Password"
              className=" h-10 mb-2 block w-full border rounded-md px-2"
            />
            <Field
              name="phoneNumber"
              placeholder="Phone Number"
              className=" h-10 mb-2 block w-full border rounded-md px-2"
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterPage;
