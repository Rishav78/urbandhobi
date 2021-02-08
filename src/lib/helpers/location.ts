import {Dimensions} from "react-native";
import Geolocation, { GeolocationResponse } from "@react-native-community/geolocation";
import { HERE_API, HERE_API_KEY } from "../config";
import { ReverseGeoCode } from "@urbandhobi/@types/services";

const {width, height} = Dimensions.get("window");

export const ASPECT_RATIO = width / height;
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const getCurrentPosition = async () => {
  const location = await new Promise<GeolocationResponse>((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      {enableHighAccuracy: false, timeout: 40000, maximumAge: 1000}
    );
  });
  return location;
};

export const reverseGeoCoding = async (ln: number, lt: number) => {
  const url = `${HERE_API}/revgeocode?apikey=${HERE_API_KEY}&lang=en-US&at=${lt}%2C${ln}`;
  console.log(url);
  const res = (await (await fetch(url)).json()).items as ReverseGeoCode[];
  if (!res) {
    throw new Error("HERE service api expired");
  }
  return res[0];
};
