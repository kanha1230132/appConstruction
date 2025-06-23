import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaWrapper} from '../../../../components/SafeAreaWrapper/SafeAreaWrapper';
import FloatingLabelInput from '../../../../components/CustomTextInput/FloatingLabelInput';
import {images} from '../../../../assets';
import {AppText} from '../../../../constants/appText';
import LoaderButton from '../../../../components/Button/LoaderButton';
import styles from './Login.styles';
import {LoginScreenProps} from '../../../../types/navigation';
import CustomTextInput from '../../../../components/CustomTextInput/CustomTextInput';
import IconTextInput from '../../../../components/CustomTextInput/CustomIconTextInput';
import {TextInput} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { navigate } from '../../../../utils/NavigationUtil';
import { screenNames } from '../../../../navigation/ScreenNames';

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [IsLoading, setIsLoading] = useState(false);
  const [IsSecure, setIsSecure] = useState(false);

  const {UserId} = useSelector((state:RootState) => state.UserSlice);

  useEffect(() => {
console.log("UserId : ", UserId)
  }, []);

  return (
    <>
    <SafeAreaWrapper>
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.companyName}>{AppText.appName}</Text>
      </View>

      <Text style={styles.greeting}>Hey,</Text>
      <Text style={styles.greeting}>Login Now!</Text>
      <View style={{marginTop: 20}}>
        <CustomTextInput
          onChangeTextValue={text => {
            setEmail(text);
          }}
          textValue={Email}
          label={'E-mail ID'}
        />
        <IconTextInput
          value={Password}
          label={'Password'}
          onChangeText={text => {
            setPassword(text);
          }}
          editable={true}
          isSecure={IsSecure}
          rightIconName={IsSecure ? 'eye-off' : 'eye'}
          onClickIcon={() => {
            setIsSecure(!IsSecure);
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => {
          // navigation.navigate('ForgotPasswordScreen');
          navigate(screenNames.ForgotPasswordScreen)
        }}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <LoaderButton title="Submit" onPress={() => {}} loading={IsLoading} />
      </View>

      <View style={styles.orContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

     
    </SafeAreaWrapper>
 <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Powered by</Text>
        <TouchableOpacity>
          <Text style={styles.companyLink}>Kusiar Project Services Inc.</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginScreen;
