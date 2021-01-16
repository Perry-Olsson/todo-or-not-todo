import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useAuthorizedUserQuery } from "./hooks";
import LaunchScreen from "./app/Screens/LaunchScreen";
import LoginScreen from "./app/Screens/LoginScreen";
import TestScreen from "./app/Screens/TestScreen";
const Main = () => {
  const { user, loading } = useAuthorizedUserQuery();
  const [launching, setLaunching] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLaunching(false);
    }, twoSeconds);
  }, []);

  if (launching || loading) return <LaunchScreen />;

  return (
    <View style={styles.container}>
      {user ? <TestScreen /> : <LoginScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const twoSeconds = 2000;

export default Main;
