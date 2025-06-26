import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaWrapper } from '../../components/SafeAreaWrapper/SafeAreaWrapper'
import { AppFonts } from '../../themes/AppFonts'
import { AppColor } from '../../themes/AppColor'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Image } from 'react-native'
import { images } from '../../assets'
import ReportButton from './components/ReportButton'

interface ReportScreenProps {

}

const ReportScreen: React.FC<ReportScreenProps> = () => {
  const cloudAnimation = useRef(new Animated.Value(0)).current;

  	useEffect(() => {
		Animated.loop(
			Animated.timing(cloudAnimation, {
				toValue: 1,
				duration: 10000,
				useNativeDriver: false,
			})
		).start();
	}, [cloudAnimation]);

	const cloudInterpolation = cloudAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ["-20%", "120%"],
	});
  return (
    <>
      <SafeAreaWrapper>
        <Text style={styles.headerLeftBlue}>Reports</Text>

        <View
          style={{
            flex: 1,
            marginTop: 20,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Animated.View style={[styles.cloud, { left: cloudInterpolation }]}>
            <MaterialIcons name="cloud" size={50} color="#d3d3d3" />
          </Animated.View>
          <Animated.View style={[styles.cloud, { right: cloudInterpolation }]}>
            <MaterialIcons name="cloud" size={40} color="#d3d3d3" />
          </Animated.View>

          <Image
            resizeMode="contain"
            source={images.REPORTS}
            style={{
              width: "80%",
              alignSelf: "center",
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignSelf: "flex-end",
          }}
        >
          <ReportButton onPress={() => {}} title="Add a Daily Entry" />
          <ReportButton onPress={() => {}} title="Add a Weekly Entry" />
          <ReportButton onPress={() => {}} title="Add a Daily Diary " />
        </View>
      </SafeAreaWrapper>
    </>
  );
}

export default ReportScreen

const styles = StyleSheet.create({
  headerLeftBlue: {
		fontSize: 24,
		fontFamily: AppFonts.Bold,
		textAlign: "left",
		color: AppColor.PRIMARY,
	},
  cloud: {
		position: "absolute",
		top: 30,
    zIndex: 10,
	},
})