import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  Text,
  TextInput,
  Divider,
  RadioButton,
} from 'react-native-paper';
import YesNoRadioButtons from './RadioButton';
import { AppColor } from '../../../themes/AppColor';
import { AppFonts } from '../../../themes/AppFonts';
import { formLists } from '../helper/util';
import CustomTextInput from '../../../components/CustomTextInput/CustomTextInput';
import CustomText from '../../../components/CustomText/CustomText';


interface DeclarationItem {
  key: string;
  type: any;
  value: string | boolean;
}

interface DeclarationGroup {
  title: string;
  list: DeclarationItem[];
}

interface DailyFormReportProps {
  dailyEntry: {
    declrationForm: DeclarationGroup[];
  };
  setDailyEntry: (entry: any) => void;
}

const DailyFormReportScreen: React.FC<DailyFormReportProps> = ({ dailyEntry, setDailyEntry }) => {
  const [DeclarationForm, setDeclarationForm] = useState<DeclarationGroup[]>([...dailyEntry.declrationForm.length == 0 ? formLists : dailyEntry.declrationForm]);
  



  const updateValue = (groupIndex: number, itemIndex: number, newValue: string | boolean) => {
      const updatedForm = DeclarationForm.map(group => ({
    ...group,
    list: group.list.map(item => ({ ...item })),
  }));

  updatedForm[groupIndex].list[itemIndex].value = newValue;
  setDeclarationForm(updatedForm);
  setDailyEntry({ ...dailyEntry, declrationForm: updatedForm });
  };

  const renderItem = ({ item, index }: { item: DeclarationGroup; index: number }) => (
    <View>
      <Text style={styles.title}>{item.title}</Text>
      <View style={{ marginTop: 5 }}>
        {item.list.map((_item, _index) => (
          <View key={_item.key}>
            {
                _item.type === Boolean && (
            <Text style={styles.label}>{_item.key}</Text>
                    
                )
            }
            <View style={styles.inputRow}>
              {_item.type === Boolean ? (
                <YesNoRadioButtons
                  value={_item.value}
                  setValue={(check) => {
                    const currentVal = _item.value;
                    if (currentVal === check) {
                      updateValue(index, _index, '');
                    } else {
                      updateValue(index, _index, check);
                    }
                  }}
                />
              ) : (
                <View style={{
                  width:'100%'
                }}>
                <CustomText title={_item.key}                
                />
                <CustomTextInput 
                label={''} 
                textValue={_item.value as string}    
                onChangeText={(text) => updateValue(index, _index, text)}
                />
                </View>

                
              )}
            </View>
          </View>
        ))}
      </View>
      {index !== DeclarationForm.length - 1 && <Divider style={{ marginVertical: 15 }} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DeclarationForm}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default DailyFormReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    color: AppColor.PRIMARY,
    fontFamily: AppFonts.Bold,
    fontSize: 18,
    marginTop: 15,
  },
  label: {
    color: AppColor.BLACK,
    fontFamily: AppFonts.Medium,
    marginVertical: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    fontFamily: AppFonts.Medium,
    backgroundColor: '#fff',
    color: '#000',
    marginBottom: 10,
  },
});