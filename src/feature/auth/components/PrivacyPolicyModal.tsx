import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Paragraph, Title } from 'react-native-paper';
import { AppColor } from '../../../themes/AppColor';

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
  <Portal>
    <Dialog style={{
        backgroundColor:AppColor.WHITE
    }} visible={visible} onDismiss={onDecline}>
      <Dialog.Content style={styles.content}>
        <Title style={styles.title}>PRIVACY POLICY</Title>
        <ScrollView style={styles.scroll}>
          <Paragraph style={styles.paragraph}>{PRIVACY_POLICY_TEXT}</Paragraph>
        </ScrollView>
      </Dialog.Content>

      <Dialog.Actions>
        {onDecline && <Button labelStyle={{color:AppColor.BLACK}} onPress={onDecline}>Decline</Button>}
        <Button labelStyle={{color:AppColor.WHITE}} onPress={onAccept} style={{backgroundColor:AppColor.PRIMARY,paddingHorizontal:10}}>Accept</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
)};

const styles = StyleSheet.create({
  content: {
    maxHeight: '80%',
    paddingVertical: 0,
  },
  scroll: {
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
  },
  paragraph: {
    lineHeight: 20,
  },
});

export default PrivacyPolicyModal;
