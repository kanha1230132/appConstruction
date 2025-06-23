import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { images } from "../../assets";
import { delay } from "../../utils/delay";
import { resetAndNavigate } from "../../utils/NavigationUtil";
import { screenNames } from "../../navigation/ScreenNames";
import { Text } from "react-native";
import { styles } from "./Splash.styles";
import { Constants } from "../../constants/constants";

const SplashScreen: React.FC = () => {
  useEffect(() => {
    const initializeApp = async () => {
      await delay(3000);
      await resetAndNavigate(screenNames.LoginScreen);
    };
    initializeApp();
  }, []);

  return (
    <ImageBackground
      source={images.SPLASH_BG} // Background image
      style={styles.background}
    >
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={"transparent"}
      />

      <SafeAreaView style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Image
            source={images.logo} // Logo image
            style={styles.logo}
          />
          <View style={styles.textContainer}>
            <Text style={styles.companyText}>{Constants.AppName}</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SplashScreen;
