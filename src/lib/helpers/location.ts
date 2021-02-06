import {Dimensions} from "react-native";
import Geolocation, { GeolocationResponse } from "@react-native-community/geolocation";

const {width, height} = Dimensions.get("window");

export const ASPECT_RATIO = width / height;
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const getCurrentPosition = async () => {
  const location = await new Promise<GeolocationResponse>((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  });
  return location;
};
