import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import { AppColor } from '../../../themes/AppColor';

interface YesNoRadioButtonsProps {
  value: boolean;
  setValue: (newValue: boolean) => void;
}

const YesNoRadioButtons: React.FC<YesNoRadioButtonsProps> = ({ value, setValue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.radioGroup}>
        <RadioButton.Item
          label="Yes"
          value="yes"
          status={value === true ? 'checked' : 'unchecked'}
          onPress={() => setValue(true)}
          labelStyle={styles.labelText}
          style={{ marginLeft: 0 }}
          color={AppColor.PRIMARY}
          position="leading"
          mode="android"
        />
        <RadioButton.Item
          label="No"
          value="no"
          status={value === false ? 'checked' : 'unchecked'}
          onPress={() => setValue(false)}
          color={AppColor.PRIMARY}
          labelStyle={styles.labelText}
          position="leading"
          mode="android"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
  label: {
    fontSize: 16,
    // marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  labelText: {
    marginRight: 10,
  },
});

export default YesNoRadioButtons;
