// components/LoaderModal.js
import React from 'react';
import {  View, ActivityIndicator, StyleSheet, Text } from 'react-native';

import { Modal, Portal } from 'react-native-paper';
import { AppColor } from '../../themes/AppColor';
import { AppFonts } from '../../themes/AppFonts';
import { moderateScale } from 'react-native-size-matters';

export interface LoaderModalProps {
  visible: boolean;
  message?: string;
}

const  LoaderModal:React.FC<LoaderModalProps> = ({ visible ,message}: LoaderModalProps)=> {
  return (
     <Portal>
      <Modal 
        visible={visible} 
        dismissable={false}
        contentContainerStyle={styles.modalContainer}
        theme={{ colors: { backdrop: 'rgba(0,0,0,0.5)' } }}
      >
        <View style={styles.loaderContainer}>
          <ActivityIndicator 
            size="large" 
            animating={true}
            color={AppColor.PRIMARY} 
          />
          <Text 
            style={styles.loadingText}
          >
            {message || "Loading..."}
          </Text>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
 modalContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    backgroundColor: 'white',
    padding: moderateScale(17), // 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  loadingText: {
    marginTop: 15,
    fontFamily: AppFonts.Medium,
    color: AppColor.PRIMARY,
  }
});

export default LoaderModal;