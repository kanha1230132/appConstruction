import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {allStackScreens} from './ScreenCollections';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator: FC = () => (
  <Stack.Navigator
    initialRouteName="SplashScreen"
    screenOptions={{ headerShown: false }}
  >
    {allStackScreens.map(({ name, component }, index) => (
      <Stack.Screen key={index} name={name as keyof RootStackParamList} component={component} />
    ))}
  </Stack.Navigator>
);

export default RootNavigator;
