import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider as AntDesignProvider } from '@ant-design/react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import rootReducer from './src/redux/reducers';
import Home from './src/screens/home';

const store = configureStore({ reducer: rootReducer }, applyMiddleware(thunk));

function App() {
  return (
    <ReduxProvider store={store}>
      <AntDesignProvider>
        <SafeAreaView>
          <Home />
        </SafeAreaView>
      </AntDesignProvider>
    </ReduxProvider>
  );
}

export default App;
