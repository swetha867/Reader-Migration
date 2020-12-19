import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { connect } from "react-redux";
import rootReducer from './redux/reducers/rootReducer';
import Login from './pages/Login';
import Home from './pages/Home';

import { StyleSheet, Text, View } from 'react-native';
const store = createStore(rootReducer);
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export default function App() {
  return (
    <Provider store={store}>
        
        {/* <Login/> */}
        <Home/>


    {/* <View style={styles.container}>
      <Text>Hello!</Text>
      <StatusBar style="auto" />
    </View> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
