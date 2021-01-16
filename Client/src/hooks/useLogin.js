import { useMutation, useApolloClient } from "@apollo/client";

import { LOGIN } from "../graphql/mutations";
import { useAuthStorage } from "../contexts/AuthStorageContext";
import { ME } from "../graphql/queries";
import logGqlError from "../utils/logGqlError";

export const useLogin = () => {
  const client = useApolloClient();
  const [login, result] = useMutation(LOGIN);
  const authStorage = useAuthStorage();

  const tryLogin = async input => {
    try {
      const { data } = await login({ variables: { input } });
      const {
        login: { errors, token, user },
      } = data;

      if (errors) alert(errors.message);
      else {
        client.writeQuery({
          query: ME,
          data: {
            me: {
              ...user,
            },
          },
        });
        await authStorage.setAccessToken(token);
      }
    } catch (e) {
      console.error(e);
      logGqlError(result.error);
    }
  };

  return [tryLogin, result];
};
