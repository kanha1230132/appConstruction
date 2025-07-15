import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, Paragraph, Title, Modal } from 'react-native-paper';
import { AppColor } from '../../../themes/AppColor';
import { AppFonts } from '../../../themes/AppFonts';
import { moderateScale } from 'react-native-size-matters';

interface PrivacyPolicyModalProps {
  visible: boolean;
  setChecked: (v: boolean) => void;
  setPolicyVisible: (v: boolean) => void;
}

const PRIVACY_POLICY_TEXT = `
Effective Date: 25/06/2025

We respect your privacy. This policy explains how we collect, use, and protect your personal information under Canadian law (PIPEDA).

What We Collect:
• Name, email
• Job title, company name
• GPS location (for mileage tracking)
• Uploaded photos, files, and reports
• IP address, device information
• App usage stats

How We Use It:
• To provide and improve Civion services
• To generate project reports
• For customer support and troubleshooting
• To comply with legal requirements

Sharing:
We do not sell or rent your personal data.
We may share with trusted partners for services like cloud storage or analytics (only as needed).

Security:
We use secure technologies to protect your data.

Changes:
If we update this policy, you’ll be notified via app or email.

Questions? Contact us at:
kps.ca/contact
`;


const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  visible,
  setChecked,
  setPolicyVisible,
}) =>{ 
    
     const onAccept = () => {
    setChecked(true);
    setPolicyVisible(false);
  };

  const onDecline = () => {
    setChecked(false);
    setPolicyVisible(false);
  };

    
    return (
  <Portal >
    <Modal contentContainerStyle={{
        backgroundColor:AppColor.WHITE,
        height:'90%',
        width:'90%',
       marginHorizontal:'5%',
       paddingHorizontal:10,
       borderRadius:20
    
        
    }} visible={visible} onDismiss={onDecline}>
        <Title style={styles.title}>PRIVACY POLICY</Title>

      <View style={styles.content}>
        <ScrollView style={styles.scroll}>
          <Paragraph style={styles.paragraph}>{PRIVACY_POLICY_TEXT}</Paragraph>
        </ScrollView>
      </View>

      <View style={{backgroundColor:AppColor.WHITE,marginBottom:0,padding:0,flexDirection:'row',justifyContent:'flex-end'}}>
        {onDecline && <Button labelStyle={{color:AppColor.BLACK}} onPress={onDecline}>Decline</Button>}
        <Button labelStyle={{color:AppColor.WHITE}} onPress={onAccept} style={{backgroundColor:AppColor.PRIMARY,paddingHorizontal:10}}>Accept</Button>
      </View>

    </Modal>
  </Portal>
)};

const styles = StyleSheet.create({
  content: {
    height: '80%',
    paddingVertical: 0,
    backgroundColor:AppColor.WHITE
  },
  scroll: {
    marginVertical: 8,
  },
  title: {
    fontSize: moderateScale(20),
    marginBottom: 12,
    color:AppColor.PRIMARY,
    fontFamily: AppFonts.Medium,
    marginHorizontal:moderateScale(15)
  },
  paragraph: {
    lineHeight: 20,
    color:AppColor.BLACK,
    paddingHorizontal:moderateScale(15),

  },
});

export default PrivacyPolicyModal;
