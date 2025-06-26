import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {SafeAreaWrapper} from '../../../../components/SafeAreaWrapper/SafeAreaWrapper';
import HeaderWithBackButton from '../../../../components/Button/HeaderWithBackButton';
import {images} from '../../../../assets';
import {AppColor} from '../../../../themes/AppColor';
import Icon from 'react-native-vector-icons/Ionicons';
import {ForgotPasswordScreenProps} from '../../../../types/navigation';
import {goBack, navigate} from '../../../../utils/NavigationUtil';
import LoaderButton from '../../../../components/Button/LoaderButton';
import { styles } from './ForgotPassword.styles';
import { screenNames } from '../../../../navigation/ScreenNames';

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={'Forgot Password'}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        <View style={styles.iconContainer}>
          <Image
            source={images.FORGOT_PASSWORD_PHOTO} // Path to the image in the assets folder
            style={styles.icon}
          />
        </View>

        <Text style={styles.subtitle}>
          Please enter your email account to reset your password
        </Text>

        <View
          style={[
            styles.inputContainer,
            {borderColor: isFocus ? AppColor.PRIMARY : 'black'},
          ]}>
          <TextInput
            style={[styles.textInput]}
            placeholder="Enter your email address"
            value={''}
            onChangeText={text => {}}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            returnKeyType='done'
          />
          <Icon
            name="mail-outline"
            size={20}
            color={isFocus ? AppColor.PRIMARY : 'black'}
            style={styles.inputIcon}
          />
        </View>
      </SafeAreaWrapper>
      
      <View style={styles.button}>
        <LoaderButton title="Continue" onPress={() => navigate(screenNames.VerifyOTPScreen)} loading={IsLoading} />
      </View>
    </>
  );
};

export default ForgotPasswordScreen;


