import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import { HomeScreenProps } from "../../types/navigation";
import { DrawerActions } from "@react-navigation/native";
import { images } from "../../assets";
import { getLocation } from "../../utils/Location";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AppColor } from "../../themes/AppColor";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Divider } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppFonts } from "../../themes/AppFonts";
import { navigate } from "../../utils/NavigationUtil";
import { screenNames } from "../../navigation/ScreenNames";
import { ScreenType } from "../../types/screenTypes";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { UserId } = useSelector((state: RootState) => state.User);

  return (
    <>
      <SafeAreaWrapper>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
          >
            <Image
              source={images.MENU}
              style={{
                height: 40,
                width: 40,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: AppColor.BLACK,
              fontSize: 20,
            }}
          >
            Home
          </Text>

          <TouchableOpacity onPress={() => {}}>
            <MaterialIcons
              name={"notifications"}
              size={33}
              color={AppColor.BLACK}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.exploreContainer}>
          <Text style={styles.exploreTitle}>Explore Menu</Text>
          <View style={styles.exploreGrid}>
            {/* Baseline Schedules */}
            <TouchableOpacity
              style={styles.exploreCardContainer}
              onPress={() => navigate(screenNames.ScheduleScreen)}
            >
              <ImageBackground
                source={images.SCHEDULE}
                style={styles.cardImageBackground}
                resizeMode="cover"
              >
                <View style={styles.cardOverlay}>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardText}>Baseline</Text>
                    <Text style={styles.cardText}>Schedules</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={18}
                    color="#ffffff"
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>

            {/* Photo Files */}
            <TouchableOpacity
              style={styles.exploreCardContainer}
              onPress={()=> navigate(screenNames.ScheduleListScreen,{type:ScreenType.PHOTO_FILE})}
            >
              <ImageBackground
                source={images.IMAGE_GALLERY}
                style={styles.cardImageBackground}
                resizeMode="cover"
              >
                <View style={styles.cardOverlay}>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardText}>Photo</Text>
                    <Text style={styles.cardText}>Files</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={18}
                    color="#ffffff"
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>

            {/* Job Hazard Analysis */}
            <TouchableOpacity
              style={styles.exploreCardWideContainer} // Larger card for Job Hazard Analysis
              // onPress={() => navigation.navigate(SCREENS.JOB_HAZARD_ANALYSIS)}
            >
              <ImageBackground
                source={images.JOB_HAZARD}
                style={styles.cardImageWideBackground}
                resizeMode="cover"
              >
                <View style={styles.cardOverlay}>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardText}>Job Hazard</Text>
                    <Text style={styles.cardText}>Analysis</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={18}
                    color="#ffffff"
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaWrapper>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  exploreContainer: {
    marginTop: 20,
  },
  exploreTitle: {
    fontFamily: AppFonts.Medium,
    fontSize: 18,
    marginBottom: 10,
  },
  exploreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  exploreCardContainer: {
    width: "48%",
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  exploreCardWideContainer: {
    width: "100%",
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImageWideBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  cardText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: AppFonts.Medium,
  },
});
