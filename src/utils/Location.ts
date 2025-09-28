import { PermissionsAndroid, Platform } from "react-native";
import { GOOGLE_MAPS_API_KEY } from "../api/endPoints";
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'ios') {
      const status = await Geolocation.requestAuthorization('whenInUse');
      return status === 'granted';
    }
    
    if (Platform.OS === 'android') {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return status === PermissionsAndroid.RESULTS.GRANTED;
    }
    
    return false;
  } catch (error) {
    console.error('Location permission error:', error);
    return false;
  }
};

export const getLocation = async (isAddressNeeded: boolean = false): Promise<{
  latitude: number;
  longitude: number;
  address?: string;
} | null> => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return null;

    const position = await new Promise<Geolocation.GeoPosition>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });

    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      address: '',
    };

    if (isAddressNeeded && GOOGLE_MAPS_API_KEY) {
      try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results?.[0]?.formatted_address) {
          coords.address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.error('Reverse geocoding error:', error);
      }
    }

    return coords;
  } catch (error) {
    console.error('Location error:', error);
    return null;
  }
};