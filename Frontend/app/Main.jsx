import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';


import LaunchScreen from './Screens/LaunchScreen';
import MapScreen from './Screens/MapScreen';
import LoginScreen from './Screens/LoginScreen';

const Main = () => {
  const [user, setUser] = useState(null);
  const [launching, setLaunching] = useState(true);

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        setLaunching(false);
      }, 2000);
    }
  }, []);

  return launching
    ? <LaunchScreen setUser={setUser} setLaunching={setLaunching} />
    : (
      <View style={styles.container}>
        {user ? <MapScreen setUser={setUser} /> : <LoginScreen setUser={setUser} /> }
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Main;