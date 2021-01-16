import React from "react";
import { Formik } from "formik";

import SignUpForm from "./SignUpForm";
import { useRegister, useLogin } from "../../hooks";

const Body = () => {
  const [tryRegister] = useRegister();
  const [tryLogin] = useLogin();
  const onSubmit = async input => {
    const user = await tryRegister(input);
    if (user)
      tryLogin({ emailOrUsername: user.email, password: input.password });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

export default Body;
