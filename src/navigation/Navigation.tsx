import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../utils/NavigationUtil';
import RootNavigator from './RootNavigator';
import DrawerNavigator from './DrawerNavigator';

const Navigation: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;