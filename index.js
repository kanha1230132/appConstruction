/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { PaperProvider } from 'react-native-paper';
import { persistor, store } from './src/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function Main() {
  return (
    <PaperProvider>
       <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
      </Provider>
    </PaperProvider>
  );
}


AppRegistry.registerComponent(appName, () => Main);
