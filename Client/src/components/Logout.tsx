import { useApolloClient } from "@apollo/client";
import React, { FC, useState } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  View,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useAuthStorage } from "../contexts";
import { Text } from "./Text";
import { ME } from "../graphql/queries";
import { Button } from "./Button";

export const Logout: FC<{ style?: ViewStyle | TextStyle }> = ({ style }) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const client = useApolloClient();
  const authStorage = useAuthStorage();

  return (
    <>
      <Button
        size="sm"
        style={style}
        onPress={async () => {
          setLoggingOut(true);
          await authStorage.removeAccessToken();
          await client.resetStore();
          client.writeQuery({
            query: ME,
            data: { me: null },
          });
        }}
      >
        <Text>logout</Text>
      </Button>
      {loggingOut ? (
        <View>
          <Text fontSize="header" color="light">
            Logging you out...
          </Text>
          <ActivityIndicator
            style={{ marginTop: 20 }}
            animating={true}
            size="large"
          />
        </View>
      ) : null}
    </>
  );
};
