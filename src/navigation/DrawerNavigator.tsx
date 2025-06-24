// navigators/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import { screenNames } from './ScreenNames';
import CustomDrawer from './customDrawer/CustomDrawer';

const Drawer = createDrawerNavigator();

interface DrawerNavigatorProps {}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = () => {
  return (
    <Drawer.Navigator  drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{ headerShown: false ,drawerStyle:{width:'70%'}}}>
      <Drawer.Screen name={screenNames.HomeTabs} component={BottomTabNavigator} options={{ title: 'Home' }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
