import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../components/SafeAreaWrapper/SafeAreaWrapper";
import { HomeScreenProps } from "../../types/navigation";
import { DrawerActions, useIsFocused } from "@react-navigation/native";
import { images } from "../../assets";
import { getLocation } from "../../utils/Location";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AppColor } from "../../themes/AppColor";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Card, Divider } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppFonts } from "../../themes/AppFonts";
import { navigate } from "../../utils/NavigationUtil";
import { screenNames } from "../../navigation/ScreenNames";
import { ScreenType } from "../../types/screenTypes";
import RestClient from "../../api/restClient";
import { BannerInfo, GetWeatherResponse } from "../../api/apiInterface";
import { moderateScale } from "react-native-size-matters";
import CustomText from "../../components/CustomText/CustomText";
import BannerSlider from "./components/BannerSlider";
import ScrollViewWrapper from "../../components/ScrollViewWrapper/ScrollViewWrapper";
import ActivityLoader from "../../components/Loader/ActivityLoader";
import { updateUserLocation } from "../../store/slice/UserSlice";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { UserId,UserLocation} = useSelector((state: RootState) => state.User);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
    city: "Fetching Location...",
    description: "Fetching weather...",
    temp: 0,
    icon: "",
    humidity: 0,
    windSpeed: 0,
  });

  const [BannerImages, setBannerImages] = useState<BannerInfo[]>([]);
  const [IsBannerLoading, setIsBannerLoading] = useState(false)
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
      getWeatherData();
  }, []);

  useEffect(() => {
    console.log("UserLocation : ",UserLocation)
    if (UserLocation && isFocused) {
      console.log("one ----->")
      setWeatherData(UserLocation);
      setBannerImages(UserLocation.bannerInfo)
    }
  }, [UserLocation,isFocused]);

  const getWeatherData = async () => {
    {
      try {
        // setIsLoading(true);
        const restClient = new RestClient();
        const location = await getLocation();
        if (location) {
          const response = await restClient.getCurrentWeather({
            latitude: location?.latitude,
            longitude: location?.longitude,
          });

          console.log("response : ", response);
          if (response && typeof response !== "string") {
            const output: GetWeatherResponse = response.data;
            const userLocation  = {
              city: output.weather.location || "Current Location",
              description: output.weather.condition || "Unknown",
              temp: output.weather.temperature ?? 0, // Nullish coalescing
              icon: output.weather.icon || "01d", // Default clear sky icon
              humidity: output.weather.humidity ?? 0, // Nullish coalescing
              windSpeed: output.weather.wind_speed ?? 0, // Nullish coalescing
              bannerInfo: output.bannerInfo
            }
            setWeatherData(userLocation);
            dispatch(updateUserLocation(userLocation));
            
            setBannerImages(output.bannerInfo);
            console.log("output: ", output);
          }
        }
      } catch (error) {
        console.log("Error : ", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
        <ScrollViewWrapper>
      

        <Card style={styles.weatherContainer}>
          <Text style={styles.weatherTitle}>Today's Weather</Text>
          <>
              <View style={styles.currentWeather}>

                {weatherData.icon ? (
                  <Image
                    source={{ uri: weatherData.icon }}
                    style={{ width: 50, height: 50 }}
                  />
                ) : null}
               

                <View
                  style={{
                    flexDirection: "column",
                    marginRight: 50,
                    width: weatherData.icon ? "70%" : "87%",
                  }}
                >
                  <Text style={styles.weatherCity}>{weatherData.city}</Text>
                  <Text style={styles.weatherDescription}>
                    {weatherData.description}
                  </Text>
                </View>
                
                <Text style={styles.weatherTemp}>
                  {Math.round(weatherData.temp)}°C
                </Text>

                
              </View>

                <Divider style={{marginVertical:15}}/>
              <View style={{
                flexDirection: "row",
                alignItems:'center',
                justifyContent:'space-between'
              }}>

                <View style ={{
                flexDirection: "row",
                alignItems:'center',
                gap:6,
                marginLeft:15
              }}>
                <Image 
                  source={images.HUMIDITY}
                  style={{
                    width: 22,
                    height: 22,
                    tintColor:AppColor.PRIMARY
                  }}
                  />
                <CustomText title={`${weatherData.humidity}%`}  color={AppColor.BLACK} fontSize={moderateScale(12)} />
                <CustomText title="humidity" color={AppColor.BLACK} fontSize={moderateScale(12)} />
              </View>

              <View style ={{
                flexDirection: "row",
                alignItems:'center',
                gap:3,
                marginLeft:15
              }}>
                <Image 
                  source={images.WIND_SPEED}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 10,
                    tintColor:AppColor.PRIMARY

                  }}
                  />
                <CustomText title={`${weatherData.windSpeed}%`}  color={AppColor.BLACK} fontSize={moderateScale(12)} />
                <CustomText title="wind" color={AppColor.BLACK} fontSize={moderateScale(12)} />
              </View>

              </View>

              
            </>

        </Card>
        {
          isLoading  ? <ActivityLoader /> :
<BannerSlider List={BannerImages} />

        }

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
              onPress={() =>
                navigate(screenNames.ScheduleListScreen, {
                  type: ScreenType.PHOTO_FILE,
                })
              }
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
                    color={AppColor.WHITE}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>

            {/* Job Hazard Analysis */}
            <TouchableOpacity
              style={styles.exploreCardWideContainer} // Larger card for Job Hazard Analysis
              onPress={() => navigation.navigate(screenNames.JobHazardScreen)}
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
        </ScrollViewWrapper>
      </SafeAreaWrapper>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  exploreContainer: {
    marginTop: 30,
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  cardText: {
    color: AppColor.WHITE,
    fontSize: moderateScale(14),
    fontFamily: AppFonts.Medium,
  },
  weatherContainer: {
    padding: 20,
    marginTop: 20,
    backgroundColor: AppColor.WHITE,
    marginHorizontal: 2,
  },
  weatherTitle: {
    fontFamily: AppFonts.Bold,
    fontSize: moderateScale(18),
    marginBottom: 10,
    color: AppColor.BLACK,
  },
  weatherCard: {
    backgroundColor: AppColor.WHITE,
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    // marginBottom: 10,
  },
  currentWeather: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  weatherCity: {
    fontFamily: AppFonts.Regular,
    fontSize: moderateScale(15),
    color: AppColor.PRIMARY,
  },
  weatherDescription: {
    fontSize: moderateScale(14),
    color: "#888",
    marginTop: 5,
  },
  weatherTemp: {
    fontSize: moderateScale(22),
    fontFamily: AppFonts.Bold,
    color: AppColor.PRIMARY,
    position:'absolute',
    bottom:0,
    right:0

  },
 

 

});
