/**
 * @format
 */

import {AppRegistry, View} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { PaperProvider } from 'react-native-paper';
import { persistor, store } from './src/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from 'react-native-toast-notifications';
import { KeyboardProvider } from "react-native-keyboard-controller";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AppColor } from './src/themes/AppColor';

export default function Main() {
  return (

    <PaperProvider>
      <KeyboardProvider>
       <ToastProvider 
        successIcon={ <MaterialIcons name="check-circle" size={24} color="white" />}
        warningIcon={ <MaterialIcons name="warning" size={24} color="white" />}
        dangerIcon={ <MaterialIcons name="error" size={24} color="white" />}
        normalColor={AppColor.PRIMARY}
        textStyle={{
          marginRight:10
        }}
        >

       <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       
      <App />

      </PersistGate>
      </Provider>
        </ToastProvider>
</KeyboardProvider>
    </PaperProvider>
  );
}


AppRegistry.registerComponent(appName, () => Main);
