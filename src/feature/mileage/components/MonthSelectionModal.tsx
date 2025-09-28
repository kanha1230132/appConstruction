import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { Modal, Divider, useTheme, Portal, Button } from 'react-native-paper';
import moment from 'moment';
import { AppColor } from '../../../themes/AppColor';
import { AppFonts } from '../../../themes/AppFonts';
import { moderateScale } from 'react-native-size-matters';

interface MonthSelectionModalProps {
  onPressMonth: (month: string) => void;
  isMonthModalVisible: boolean;
  setIsMonthModalVisible: (isVisible: boolean) => void;
  selectedMonth?: string;
}

const MonthSelectionModal = ({
  onPressMonth, 
  isMonthModalVisible, 
  setIsMonthModalVisible,
  selectedMonth
}: MonthSelectionModalProps) => {
  const theme = useTheme();
  const months = useMemo(
    () => Array.from({ length: 12 }, (_, index) => ({
      name: moment().month(index).format('MMMM'),
      value: index
    })),
    []
  );

  return (
    <Portal>
    <Modal
      visible={isMonthModalVisible}
      onDismiss={() => setIsMonthModalVisible(false)}
      contentContainerStyle={styles.modalContainer}
      theme={{
        colors: {
          backdrop: 'rgba(0, 0, 0, 0.5)'
        }

      }}
      dismissable = {false}
    >
      <View style={[styles.modalContent]}>
        <Text style={[styles.modalTitle]}>
          Select Month
        </Text>
        
        <Divider style={styles.divider} />
        
        <FlatList
          data={months}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.monthItem,
                selectedMonth === item.name && { 
                  backgroundColor: theme.colors.primaryContainer 
                }
              ]}
              onPress={() => {
                onPressMonth(item.value.toString());
                setIsMonthModalVisible(false);
              }}
              activeOpacity={0.7}
            >
              <Text 
                style={[
                  styles.monthText,
                  { color: theme.colors.onSurface },
                  selectedMonth === item.name && {
                    color: theme.colors.onPrimaryContainer,
                    fontWeight: 'bold'
                  }
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <Divider style={styles.itemDivider} />}
        />
         <Button labelStyle={{color:AppColor.WHITE,fontSize:moderateScale(14)}} style={{
                    marginTop: 10,
                    backgroundColor: AppColor.PRIMARY,
                    borderRadius: 6,
                    width:'50%',
                    alignSelf:'center'
                    
                  }} onPress={() => setIsMonthModalVisible(false)} mode="text">
                    Close
                  </Button>
      </View>

     
    </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    maxHeight: '70%',
    borderRadius: 8,
    paddingBottom: 8,
    elevation: 4,
    backgroundColor: AppColor.WHITE
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontFamily:AppFonts.Bold,
    color:AppColor.PRIMARY,
    padding: 16,
    textAlign: 'center',
  },
  divider: {
    marginHorizontal: 8,
  },
  monthItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  monthText: {
    fontSize: moderateScale(16),
      fontFamily:AppFonts.Regular,
     color:AppColor.BLACK,
  },
  itemDivider: {
    marginHorizontal: 16,
  
  },
});

export default MonthSelectionModal;