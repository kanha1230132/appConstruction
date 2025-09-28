import {
  Alert,
  Keyboard,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { use, useEffect, useRef, useState } from "react";
import { CreateMileageScreenProps } from "../../../../types/navigation";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { AppText } from "../../../../constants/appText";
import { goBack } from "../../../../utils/NavigationUtil";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ActivityIndicator, Card, Switch } from "react-native-paper";
import { AppColor } from "../../../../themes/AppColor";
import { AppFonts } from "../../../../themes/AppFonts";
import { typeSuggestions } from "../../helper/util";
import { endPoints, MILAGE_API_KEY } from "../../../../api/endPoints";
import RestClient from "../../../../api/restClient";
import { SuggestionResponse } from "../../../../api/apiInterface";
import CustomText from "../../../../components/CustomText/CustomText";
import SwipeButton from "../../../../components/Button/SwipeButton";
import BottomButtonWrapper from "../../../../components/Button/BottomButtonWrapper";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import useToastHook from "../../../../hooks/toast";
import { useDispatch, useSelector } from "react-redux";
import { updateIsRideCompleted, updateMileageData } from "../../../../store/slice/UserSlice";
import { RootState } from "../../../../store/store";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { DateFormat } from "../../../../utils/dateUtil";
import { screenNames } from "../../../../navigation/ScreenNames";
const CreateMileageScreen: React.FC<CreateMileageScreenProps> = ({route}) => {
  const [IsAddress, setIsAddress] = useState({
    isHome: false,
    isSite: false,
  });
  const [StartLocation, setStartLocation] = useState("");
  const [EndLocation, setEndLocation] = useState("");
  const [isRideActive, setIsRideActive] = useState(false);
  const [typeOfSuggestions, setTypeOfSuggestions] = useState(
    typeSuggestions.home
  );
  const { showToast } = useToastHook();
  const [DirectionCoordinate, setDirectionCoordinate] = useState([]);
  const [suggestions, setSuggestions] = useState<SuggestionResponse[]>([]);
  const [TotalDistance, setTotalDistance] = useState(0);
  const [TotalAmount, setTotalAmount] = useState(0);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [TotalDuration, setTotalDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState(null);
  const mapRef = useRef(null);
  const StartLocationRef = useRef(StartLocation);
  const EndLocationRef = useRef(EndLocation);
  const IsAddressRef = useRef(IsAddress);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { MileageData, UserMileageAllowanceDistance ,IsRideCompleted,UserMileageRate} =
    useSelector((state: RootState) => state.User);
    const [MileageDate, setMileageDate] = useState(route?.params?.selectedDate);
const navigation = useNavigation()
    const MileageDataRef = useRef(MileageData);

  useEffect(() => {
    StartLocationRef.current = StartLocation;
    EndLocationRef.current = EndLocation;
    IsAddressRef.current = IsAddress;

  }, [StartLocation, EndLocation, IsAddress]);

  useEffect(() => {
    MileageDataRef.current = MileageData;
    setDirectionCoordinate(MileageData?.coords);
  }, [MileageData]);

    useEffect(()=>{
console.log("UserMileageRate : ",UserMileageRate)
console.log("UserMileageAllowanceDistance : ",UserMileageAllowanceDistance)
  },[])

  useEffect(() => {
    if (MileageData) {
      if(IsRideCompleted){
        dispatch(updateIsRideCompleted(false));
        dispatch(updateMileageData(undefined));
        resetStartRide();
      }else{
      StartLocationRef.current = MileageData.startLocation;
      EndLocationRef.current = MileageData.endLocation;
      IsAddressRef.current = MileageData.isAddress;

      setStartLocation(MileageData.startLocation);
      setEndLocation(MileageData.endLocation);
      setRouteCoordinates(MileageData.coords);
      setTotalDistance(MileageData.distance);
      setTotalDuration(MileageData.duration);
      setIsAddress(MileageData.isAddress);
      setMileageDate(MileageData.date)
      setIsRideActive(true);

      }
      
    }
  }, []);

  useEffect(() => {
    console.log("IsRideCompleted : ", IsRideCompleted)
  }, [IsRideCompleted]);

  const resetStartRide = () => {
    try {
      setIsRideActive(false);
      setStartLocation("");
      setEndLocation("");
      setTotalDistance(0);
      setTotalDuration("");
      setTotalAmount(0);
      setIsAddress({ isHome: false, isSite: false });
    } catch (error) {
      console.log("Error  resetStartRide : ", error);
    }
  };

  const getDirections = () => {
    if (DirectionCoordinate.length > 0) {
      navigateWithGoogleMaps(DirectionCoordinate[0].lat
        , DirectionCoordinate[0].lng, DirectionCoordinate[1].lat
        , DirectionCoordinate[1].lng);

    } else {
      showToast('Not Getting Directions, refresh the page', "warning");
    }
  }
  const navigateWithGoogleMaps = () => {
    try {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${StartLocationRef.current}&destination=${EndLocationRef.current}&travelmode=driving`;
     console.log(" url : ", url)
      Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    } catch (error) {
      showToast('Something went wrong. Please try again.', "danger");
    }

  };

  const fetchSuggestions = async (input: string, type: string) => {
    try {
      setTypeOfSuggestions(type);
      const components = "country:CA";
      const types = "geocode|establishment";
      const sessionToken = Math.random().toString(36).substring(2, 15);
      const requestURL = `${endPoints.URL_GOOGLE_PLACE_API}input=${input}&key=${MILAGE_API_KEY}&components=${components}&sessiontoken=${sessionToken}&types=${types}`;
      const restClient = new RestClient();
      const response = await restClient.getSugesstions(requestURL);
      console.log("response : ", response);
      if (response && typeof response !== "string") {
        setSuggestions(response);
      }
    } catch (error) {
      //   showErrorPopup(error?.message || 'Something went wrong in fetchSuggestions.');
    }
  };

  const renderMap = () => {
    if (mapError) {
      return (
        <View style={styles.mapErrorContainer}>
          <Text style={styles.mapErrorText}>{mapError}</Text>
        </View>
      );
    }
    try {
       return (
      <Card style={{backgroundColor: AppColor.WHITE, borderRadius: 0 }}>
                <MapView
          ref={mapRef}
          provider={Platform.OS === "android" ? "google" : undefined}
          style={styles.map}
          initialRegion={{
            latitude: 43.6532,
            longitude: -79.3832,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          
          onMapLoaded={() => setIsMapReady(true)}
          zoomEnabled={true}

          
        >
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeWidth={4}
              strokeColor={AppColor.PRIMARY}
            />
          )}
        </MapView>

       
      </Card>
    );
    } catch (error) {
      console.log("Erro renderMap : ", error);
      return(
        <></>
      )
    }

   
  };


  const calculateRegion = (
    coordinates: { latitude: number; longitude: number }[]
  ) => {
    if (!coordinates || coordinates.length === 0) {
      return null;
    }

    // Extract all latitudes and longitudes
    const latitudes = coordinates.map((coord) => coord.latitude);
    const longitudes = coordinates.map((coord) => coord.longitude);

    // Calculate min/max
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    // Calculate center point
    const center = {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
    };

    // Calculate deltas with some padding
    const latitudeDelta = (maxLat - minLat) * 1.5; // 1.5 = padding factor
    const longitudeDelta = (maxLng - minLng) * 1.5;

    return {
      ...center,
      latitudeDelta,
      longitudeDelta,
    };
  };

  const callToStartRide = async () => {
    try {
      setDirectionCoordinate([]);

      if(!UserMileageRate || UserMileageRate == 0){
        showToast("Your Mileage Rate is 0, Please update your mileage rate", "warning");
        return false;
      }

      if (!StartLocationRef.current || !EndLocationRef.current) {
        showToast("Please fill all location fields", "warning");
        return false;
      }

      if (!IsAddressRef.current.isHome && IsAddressRef.current.isSite) {
        showToast("Please Change Home Address / Site Address", "warning");
        return false;
      }
      const locationData = await getRouteData(
        StartLocationRef.current,
        EndLocationRef.current
      );
      if (!locationData) return false;
      const { coords, distance, duration } = locationData;
       const param = {
        startLocation: StartLocationRef.current,
        endLocation: EndLocationRef.current,
        distance: distance,
        duration: duration,
        amount: 0,
        coords: coords,
        isAddress: IsAddressRef.current,
        date: MileageDate
      };
      console.log("param : ", param);
      dispatch(updateMileageData(param));
         const _region = calculateRegion(coords);
      if (_region) setRegion(_region);
      setRouteCoordinates(coords);
      setTotalDistance(distance);
      setTotalDuration(duration);
      setIsRideActive(true);
      showToast("Ride started successfully", "success");
      return true;
    } catch (error) {
      return false;
    }
  };

  const getRouteData = async (origin: string, destination: string) => {
    try {
      const url =
        endPoints.URL_GOOGLE_DIRECTION_API +
        `origin=${origin?.trim()}&destination=${destination?.trim()}&mode=driving&key=${MILAGE_API_KEY}`;
      const restClient = new RestClient();
      const output = await restClient.getDirections(url);
      console.log("output: ", output);
      if (output && typeof output !== "string") {
        const coords = output.routes?.[0]?.legs?.[0];
        const values = [coords?.start_location, coords?.end_location];
        setDirectionCoordinate(values);
        if (output.routes?.[0]?.legs?.[0]) {
          const leg = output.routes[0].legs[0];
          console.log("leg : ", leg);
          const obj = {
            distance:Number( (leg.distance.value/1000).toFixed(2)),
            duration: leg.duration.text,
            coords: leg?.steps?.map((item: any) => ({
              latitude: item?.start_location?.lat,
              longitude: item?.start_location?.lng,
            })), //({ latitude: lat, longitude: lng }))
          };
          console.log("obj : ", obj);
          return obj;
        }
      } else {
        return { distance: 0, duration: "", coords: [] };
      }
    } catch (error) {
      console.log("error : ", error);
      setDirectionCoordinate([]);
      return { distance: 0, duration: "", coords: [] };
    }
  };

  const callToEndRide = async () => {
    try {
      let totalAmount = 0;
      const tempMileageData = MileageDataRef.current;
      if (tempMileageData) {
        let totalDistance = tempMileageData.distance;
        const tempIsAddress = IsAddressRef.current
        console.log("tempIsAddress. : ", tempIsAddress)
        if (
          (!tempIsAddress?.isHome && !tempIsAddress?.isSite) ||
          (tempIsAddress?.isHome && tempIsAddress?.isSite)
        ) {
          if (totalDistance > UserMileageAllowanceDistance) {
            totalAmount =
              UserMileageRate * (totalDistance- UserMileageAllowanceDistance);
            // setTotalAmount(totalAmount);
          }
        } else if (tempIsAddress?.isHome && !tempIsAddress?.isSite) {
          totalAmount = UserMileageRate *totalDistance;
          // setTotalAmount(totalAmount);
        }

        setRouteCoordinates(tempMileageData.coords);
        const _region = calculateRegion(tempMileageData.coords);
        setRegion(_region);
        setStartLocation(tempMileageData.startLocation);
        setEndLocation(tempMileageData.endLocation);
        setTotalDistance(tempMileageData.distance);

         const body = {
           startLocation: tempMileageData?.startLocation,
           endLocation: tempMileageData?.endLocation,
           distance: tempMileageData?.distance,
           duration: tempMileageData?.duration,
           amount: totalAmount,
           date: moment(MileageDate).format(DateFormat.YYYY_MM_DD_HH_mm_ss),
           coords: tempMileageData?.coords,
         };

      const restClient = new RestClient();
      const response = await restClient.createMileage(body);
      if (response && typeof response !== "string") {
        dispatch(updateIsRideCompleted(true));
        showToast(
          response.message || "Mileage created successfully",
          "success"
        );
        setTotalAmount(totalAmount);
        return true;
      } else {
        showToast(
          response || "Something went wrong please try again",
          "danger"
        );
      return false;
      }

      }
     
    } catch (error) {
      showToast("Something went wrong please try again", "danger");
      return false;
    }
  };

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={AppText.MileageTracker}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />
          <ScrollViewWrapper>

        <KeyboardAwareScrollView
          style={{
            flex: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
            <View style={styles.inputGroup}>
              {/* Home Address */}

              <View style={styles.inputContainer}>
                {IsAddress?.isHome ? (
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={25}
                    color={AppColor.PRIMARY}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="home-map-marker"
                    size={25}
                    color={AppColor.PRIMARY}
                  />
                )}

                <TextInput
                  style={styles.input}
                  placeholder={
                    IsAddress?.isHome ? "Construction Site" : "Home Address"
                  }
                  placeholderTextColor="#999"
                  value={StartLocation}
                  onChangeText={(text) => {
                    console.log("text : ", text);
                    setStartLocation(text);
                    fetchSuggestions(text, typeSuggestions.start);
                  }}
                  editable={!isRideActive}
                />
                  <Switch
                    thumbColor={
                      IsAddress?.isHome
                        ? AppColor.PRIMARY
                        : AppColor.BORDER_COLOR
                    }
                    trackColor={{
                      false: AppColor.BORDER_COLOR,
                      true: AppColor.PRIMARY_500,
                    }}
                    onValueChange={() => {
                      setIsAddress({
                        isHome: !IsAddress?.isHome,
                        isSite: IsAddress?.isSite,
                      });
                    }}
                    value={IsAddress?.isHome}
                    disabled={isRideActive}
                  />
              </View>

              {typeOfSuggestions === typeSuggestions.start &&
                suggestions.map((suggestion, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => {
                        setStartLocation(suggestion?.description);
                        setSuggestions([]);
                        Keyboard.dismiss();
                      }}
                    >
                      <CustomText title={suggestion.description} />
                    </TouchableOpacity>
                  );
                })}

              <View style={[styles.inputContainer, { marginTop: 10 }]}>
                {IsAddress?.isSite ? (
                  <MaterialCommunityIcons
                    name="home-map-marker"
                    size={25}
                    color={AppColor.PRIMARY}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={25}
                    color={AppColor.PRIMARY}
                  />
                )}
                <TextInput
                  style={styles.input}
                  placeholder={
                    IsAddress?.isSite ? "Home Address" : "Construction Site"
                  }
                  placeholderTextColor="#999"
                  value={EndLocation}
                  onChangeText={(text) => {
                    setEndLocation(text);
                    fetchSuggestions(text, typeSuggestions.end);
                  }}
                  editable={!isRideActive}
                />
                <Switch
                  thumbColor={
                    IsAddress?.isSite ? AppColor.PRIMARY : AppColor.BORDER_COLOR
                  }
                  trackColor={{
                    false: AppColor.BORDER_COLOR,
                    true: AppColor.PRIMARY_500,
                  }}
                  onValueChange={() => {
                    setIsAddress({ ...IsAddress, isSite: !IsAddress?.isSite });
                  }}
                  value={IsAddress?.isSite}
                  disabled={isRideActive}
                />
              </View>

              {typeOfSuggestions === typeSuggestions.end &&
                suggestions.map((suggestion, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => {
                        setEndLocation(suggestion?.description);
                        setSuggestions([]);
                        Keyboard.dismiss();
                      }}
                    >
                      <CustomText title={suggestion.description} />
                    </TouchableOpacity>
                  );
                })}
            </View>

            <View style={{flex:1, marginTop: 10 }}>{renderMap()}</View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 7,
                backgroundColor: !isRideActive
                  ? AppColor.DISABLED
                  : AppColor.PRIMARY,
                justifyContent: "center",
                borderRadius: 6,
                elevation: 1,
                marginTop: 20,
                gap: 10,
              }}
              onPress={() => {
                getDirections();
              }}
              disabled={!isRideActive}
            >
              <MaterialCommunityIcons
                name="directions"
                size={30}
                color={AppColor.WHITE}
              />
              <CustomText title={"Get Directions"} color={AppColor.WHITE} />
            </TouchableOpacity>

            <Card
              style={{
                marginTop: 15,
                padding: 13,
                backgroundColor: AppColor.WHITE,
                borderRadius: 10,
                marginBottom:30,
                marginHorizontal:1
              }}
            >
              <View style={styles.resultRow}>
                <CustomText title={"Total Distance:"} />
                <CustomText
                  title={
                    (typeof TotalDistance === "number"
                      ? TotalDistance.toFixed(2)
                      : "0.00") + "km"
                  }
                />
              </View>

              <View style={styles.resultRow}>
                <CustomText title={"Duration:"} />
                <CustomText title={TotalDuration} />
              </View>

              <View style={styles.resultRow}>
                <CustomText title={"Payable Amount:"} />
                <CustomText title={"$" + TotalAmount.toFixed(2)} />
              </View>
            </Card>



          
        </KeyboardAwareScrollView>
          </ScrollViewWrapper>

      </SafeAreaWrapper>

      <BottomButtonWrapper>
        {
          IsRideCompleted ? (
            <TouchableOpacity onPress={()=>{
            navigation.reset({
                                                index: 0,
                                                routes: [
                                                  {
                                                    name: screenNames.MainApp, // DrawerNavigator is registered as MainApp in your root stack
                                                    state: {
                                                      routes: [
                                                        {
                                                          name: screenNames.HomeTabs,
                                                          state: {
                                                            routes: [{ name: screenNames.MileageScreen }],
                                                            index: 0,
                                                          },
                                                        },
                                                      ],
                                                    },
                                                  },
                                                ],
                                              })

            }} style={{
              alignItems: "center",
              paddingVertical: 10,
              backgroundColor: AppColor.APPROVE,
              justifyContent: "center",
              borderRadius: 6,
              elevation: 1,
              width:'95%',
            }}>
              <CustomText title={AppText.RideCompleted} color={AppColor.WHITE} />
            </TouchableOpacity>
          ) : <>
           <SwipeButton
          title={MileageDataRef.current ? AppText.EndRide : AppText.StartRide}
          onSwipeSuccess={ () => {
            // simulate async call
            return new Promise(async (resolve) => {
               if (MileageDataRef.current) {
              const isSuccess = await callToEndRide();
              resolve(isSuccess)
            } else {
              const isSuccess = await callToStartRide();
             resolve(isSuccess)
            }
            })
           
          }}
        />
          </>
        }
       
      </BottomButtonWrapper>
    </>
  );
};

export default CreateMileageScreen;

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColor.WHITE,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: AppColor.BORDER_COLOR,
    fontFamily: AppFonts.Regular,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: AppFonts.Regular,
  },
  suggestionItem: {
    padding: 12,
    backgroundColor: AppColor.WHITE,
    borderWidth: 0.2,
    borderColor: AppColor.BORDER_COLOR,
  },
  mapLoadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  mapLoadingText: {
    marginTop: 10,
    color: "#333",
  },
  mapErrorContainer: {
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ff4444",
  },
  mapErrorText: {
    color: "#ff4444",
    textAlign: "center",
    padding: 20,
  },
  map: {
    height: 300,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
