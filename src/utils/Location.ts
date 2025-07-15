import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { GOOGLE_MAPS_API_KEY } from "../api/endPoints";
import RestClient from "../api/restClient";

const requestLocationPermission = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }else{
      const status = await Geolocation.requestAuthorization('whenInUse');
    return status === 'granted';
  }
};

export const getLocation = async (isAddressNeeded: boolean = false) => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return;

  return new Promise((resolve, reject) => 
       Geolocation.getCurrentPosition(
    async (pos) => {
      if (isAddressNeeded && GOOGLE_MAPS_API_KEY) {
        const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${pos?.coords?.latitude},${pos?.coords?.longitude}}&apiKey=AIzaSyD8G5BZegL44sB2ZTkczF4wc2VCnVhnnj4`;
        const restClient = new RestClient();
        const res = await restClient.getAddress(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=37.4220936,-122.083922&apiKey=AIzaSyCQa4c8csh5QpPOiOSu8TktFToybBr996k"
        );
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("Address 123 : ", responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        const cords = {
          latitude: pos?.coords?.latitude,
          longitude: pos?.coords?.longitude,
          address: "",
        };
        console.log("cords : ",cords)
        resolve(cords);
      }
    },
    (error) => {
      console.warn(error.code, error.message);
        resolve(null);
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      forceRequestLocation: true,
      showLocationDialog: true,
    }
  ));
};
