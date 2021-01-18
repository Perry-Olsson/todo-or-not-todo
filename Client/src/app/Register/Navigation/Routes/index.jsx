import React from "react";

import FormikTextInput from "../../../../components/FormikTextInput";
import NextButton from "../NextButton";

import { useNextRoute } from "../../../../hooks";

export const Name = () => {
  const next = useNextRoute("/email");

  return (
    <>
      <FormikTextInput
        type="secondary"
        name="firstName"
        placeholder="First Name"
      />
      <FormikTextInput
        type="secondary"
        name="lastName"
        placeholder="Last Name"
      />
      <NextButton onPress={next} />
    </>
  );
};

export const Email = ({ scrollViewRef }) => {
  const nextRoute = useNextRoute("/username");
  const handleNextRoute = () => {
    nextRoute();
    scrollViewRef.current.toEnd();
  };

  return (
    <>
      <FormikTextInput type="secondary" name="email" placeholder="Email" />
      <NextButton onPress={handleNextRoute} />
    </>
  );
};

export const Username = () => {
  const next = useNextRoute("/password");

  return (
    <>
      <FormikTextInput
        type="secondary"
        name="username"
        placeholder="Username"
      />
      <NextButton onPress={next} />
    </>
  );
};

export const Password = () => (
  <>
    <FormikTextInput
      type="secondary"
      name="password"
      placeholder="Password"
      secureTextEntry
    />
    <FormikTextInput
      type="secondary"
      name="passwordConfirmation"
      placeholder="Confirm password"
      secureTextEntry
    />
  </>
);
