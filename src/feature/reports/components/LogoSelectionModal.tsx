// // LogoSelectionModal.tsx

// import React from 'react';
// import {
//   View,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { Modal, Portal, Text, Card, Button } from 'react-native-paper';
// import { CompanyLogoResponse } from '../../../api/apiInterface';
// import { AppColor } from '../../../themes/AppColor';
// import { AppFonts } from '../../../themes/AppFonts';
// import { moderateScale } from 'react-native-size-matters';
// import FastImage from 'react-native-fast-image';

// interface Props {
//   visible: boolean;
//   onDismiss: () => void;
//   companies: CompanyLogoResponse[];
//   onSelect: (company: CompanyLogoResponse) => void;
// }

// const LogoSelectionModal: React.FC<Props> = ({
//   visible,
//   onDismiss,
//   companies,
//   onSelect,
// }) => {
//   const renderItem = ({ item }: { item: CompanyLogoResponse }) => (
//     <TouchableOpacity onPress={() => onSelect(item)}>
//       <Card elevation={2} style={styles.card}>
//         <View style={styles.cardContent}>
//           <FastImage
//             source={{ uri: item.file_url }}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//           <Text style={styles.companyName}>{item.companyName}</Text>
//         </View>
//       </Card>
//     </TouchableOpacity>
//   );

//   return (
//     <Portal>
//       <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
//         <Text variant="titleMedium" style={styles.header}>Select a Logo</Text>
//         <FlatList
//           data={companies}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           showsVerticalScrollIndicator={false}
//         />
//       </Modal>
//     </Portal>
//   );
// };

// export default LogoSelectionModal;
// const styles = StyleSheet.create({
//   modal: {
//     backgroundColor: 'white',
//     margin: 20,
//     borderRadius: 12,
//     padding: 16,
//     maxHeight: '80%',
//   },
//   header: {
//     marginBottom: 10,
//     fontSize: moderateScale(18),
//     fontFamily:AppFonts.Medium,
//     color:AppColor.PRIMARY
//   },
//   card: {
//     marginBottom: 10,
//     borderRadius: 10,
//     backgroundColor:AppColor.WHITE,
//     marginHorizontal:1
//   },
//   cardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     gap: 12,
//   },
//   logo: {
//     width: 40,
//     height: 40,
//   },
//   companyName: {
//     fontSize: moderateScale(14),
//     fontFamily:AppFonts.Regular
//   },
//   closeButton: {
//     marginTop: 10,
//   },
// });


import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Modal, Portal, Text, Card, Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { CompanyLogoResponse } from '../../../api/apiInterface';
import { AppColor } from '../../../themes/AppColor';
import { AppFonts } from '../../../themes/AppFonts';
import { moderateScale } from 'react-native-size-matters';
import { Constants } from '../../../constants/constants';
import { useIsFocused } from '@react-navigation/native';
import { Image } from 'react-native';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  companies: CompanyLogoResponse[];
  onSelect: (selectedCompanies: CompanyLogoResponse[]) => void;
  preSelectedLogos: CompanyLogoResponse[] | undefined;
  disable:boolean
}

const LogoSelectionModal: React.FC<Props> = ({
  visible,
  onDismiss,
  companies,
  onSelect,
  preSelectedLogos,
  disable
}) => {
  const [selectedLogos, setSelectedLogos] = useState<CompanyLogoResponse[]>([]);
  const isFocused = useIsFocused();
useEffect(()=>{
  if(isFocused){
      if (preSelectedLogos) {
        setSelectedLogos(preSelectedLogos);
      }
    }
},[visible]);

 

  const handleLogoToggle = (item: CompanyLogoResponse) => {
    const alreadySelected = selectedLogos.find(logo => logo.id === item.id);
    if (alreadySelected) {
      setSelectedLogos(prev => prev.filter(logo => logo.id !== item.id));
    } else if (selectedLogos.length < 2) {
      setSelectedLogos(prev => [...prev, item]);
    }
  };

  const isSelected = (item: CompanyLogoResponse) =>
    selectedLogos.some(logo => logo.id === item.id);

  const renderItem = ({ item }: { item: CompanyLogoResponse }) => {
    const selected = isSelected(item);
    return (
      <TouchableOpacity disabled={disable} onPress={() => handleLogoToggle(item)}>
        <Card
          elevation={2}
          style={[
            styles.card,
            selected && { borderColor: AppColor.PRIMARY, borderWidth: 2 },
          ]}
        >
          <View style={styles.cardContent}>
            <Image
              source={{ uri: item.file_url }}
              style={styles.logo}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.companyName}>{item.companyName}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  const handleDone = () => {
    onSelect(selectedLogos); // pass selected logos back
    onDismiss(); // close modal
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
        
        <Text variant="titleMedium" style={styles.header}>
          Select up to 2 Logos
        </Text>
        <FlatList
          data={companies}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
        <Button
          mode="contained"
          onPress={handleDone}
          style={styles.doneButton}
          labelStyle={{color:AppColor.WHITE,fontSize:moderateScale(14)}}
        >
          Done
        </Button>
      </Modal>
    </Portal>
  );
};

export default LogoSelectionModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 16,
    height:Constants.ScreenHeight/1.5,
  },
  header: {
    marginBottom: 10,
    fontSize: moderateScale(18),
    fontFamily: AppFonts.Medium,
    color: AppColor.PRIMARY,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: AppColor.WHITE,
    marginHorizontal: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  companyName: {
    fontSize: moderateScale(14),
    fontFamily: AppFonts.Regular,
  },
  doneButton: {
    marginTop: 10,
    backgroundColor: AppColor.PRIMARY,
    borderRadius:6
  },
});
