import React, { ReactNode } from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppColor } from '../../themes/AppColor';
import { ScrollView } from 'react-native-gesture-handler';



interface SafeAreaWrapperProps {
  children: ReactNode;
}

// Custom dynamic SafeAreaView component
const DynamicSafeAreaView = ({ children, style }: { children: ReactNode; style?: object }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        {
          // paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          flex: 1,
          backgroundColor: AppColor.WHITE
        },
        style
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

// Main provider component for your app
export const SafeAreaWrapper = ({ children }: SafeAreaWrapperProps) => {
  return (
    <SafeAreaProvider>
      
      <StatusBar
        barStyle='default'
        backgroundColor={AppColor.PRIMARY}
        translucent
      />
      <DynamicSafeAreaView >
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: AppColor.WHITE,
            paddingHorizontal: 15,
          }}>
          {children}
        </ScrollView>
      </DynamicSafeAreaView>
    </SafeAreaProvider>
  );
};
