// navigators/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import { screenNames } from './ScreenNames';
import CustomDrawer from './customDrawer/CustomDrawer';
import WebViewScreen from '../feature/webview/WebViewScreen';
import AddUserScreen from '../feature/addUser/AddUserScreen';
import LogoScreen from '../feature/logo/LogoScreen';
import LogoUploadScreen from '../feature/logo/screens/logoUpload/LogoUploadScreen';

const Drawer = createDrawerNavigator();

interface DrawerNavigatorProps {}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = () => {
  return (
    <Drawer.Navigator  drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{ headerShown: false ,drawerStyle:{width:'70%'}}}>
      <Drawer.Screen name={screenNames.HomeTabs} component={BottomTabNavigator} options={{ title: 'Home' }} />
      <Drawer.Screen name={screenNames.WebViewScreen} component={WebViewScreen} />
      <Drawer.Screen name={screenNames.AddUserScreen} component={AddUserScreen}  />
      <Drawer.Screen name={screenNames.LogoScreen} component={LogoScreen}  />
      <Drawer.Screen name={screenNames.LogoUploadScreen} component={LogoUploadScreen}  />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
