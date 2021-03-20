import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  Dimensions,
  BackHandler,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import RNMap from "@urbandhobi/components/map";
import { AddressBody, AddAddressFormData } from "@urbandhobi/@types/screens";
import {
  getCurrentPosition,
  LONGITUDE_DELTA,
  LATITUDE_DELTA,
  reverseGeoCoding,
} from "@urbandhobi/lib/helpers";
import { FloatingAction } from "@urbandhobi/components";
import { Position, ReverseGeoCode } from "@urbandhobi/@types/services";
import Footer from "./components/footer";
import { saveAddress } from "@urbandhobi/actions/address";

const { height } = Dimensions.get("window");

export const AddAddress = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [footer, setFooter] = useState<boolean>(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<ReverseGeoCode | null>(null);
  const mapRef = useRef<MapView>(null);
  const actionButtonOpacity = useRef(new Animated.Value(1)).current;
  const actionButtonTranslateY = useRef(new Animated.Value(0)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const footerTranslateY = useRef(new Animated.Value(height)).current;

  const actionButtonStyle = useRef<Animated.WithAnimatedValue<StyleProp<ViewStyle>>>({
    transform: [{ translateY: actionButtonTranslateY }],
    opacity: actionButtonOpacity,
  }).current;

  const footerStyle = useRef<Animated.WithAnimatedValue<StyleProp<ViewStyle>>>({
    ...styles.footer,
    opacity: footerOpacity,
    transform: [{ translateY: footerTranslateY }],
  }).current;

  const AddAddressBackHandler = () => {
    if (footer === true) {
      hideFooter();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", AddAddressBackHandler);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", AddAddressBackHandler);
    };
  }, [footer]);


  const showFooter = useCallback(() => {
    setFooter(true);
    Animated.parallel([
      Animated.timing(actionButtonOpacity, {
        duration: 500,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(actionButtonTranslateY, {
        duration: 800,
        toValue: height,
        useNativeDriver: true,
      }),
      Animated.timing(footerOpacity, {
        duration: 500,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(footerTranslateY, {
        duration: 800,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const hideFooter = useCallback(() => {
    Animated.parallel([
      Animated.timing(actionButtonOpacity, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(actionButtonTranslateY, {
        duration: 500,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(footerOpacity, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(footerTranslateY, {
        duration: 500,
        toValue: height,
        useNativeDriver: true,
      }),
    ]).start(() => setFooter(false));
  }, []);

  const getAndSetPosition = useCallback(async () => {
    setLoading(true);
    try {
      const { coords: { latitude, longitude } } = await getCurrentPosition();
      setPosition({ lat: latitude, lng: latitude });
      if (mapRef.current) {
        setSelectedPosition(await reverseGeoCoding(longitude, latitude));
        showFooter();
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }, 1000);
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }, []);

  const setLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const onSubmit = useCallback(async (formData: AddAddressFormData) => {
    if (!selectedPosition || !position) {
      return;
    }
    const {
      address: {
        city,
        countryCode,
        countryName,
        county,
        district,
        postalCode,
        state,
        stateCode,
      },
      title,
    } = selectedPosition;
    const body: AddressBody = {
      ...formData,
      position,
      city,
      countryCode,
      state,
      postalCode,
      stateCode,
      nearby: title,
      locality: district,
      country: countryName,
      district: county,
    };
    try {
      await saveAddress(body);
      hideFooter();
    }
    catch (error) {
      console.error(error);
    }
  }, [position, selectedPosition]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <RNMap
        ref={mapRef}
        onMapReady={setLoadingComplete}
        loadingEnabled={loading}>
        <FloatingAction
          disabled={loading}
          loading={loading}
          contentContainerStyle={actionButtonStyle}
          onPress={getAndSetPosition}>
          <MaterialIcons
            name="my-location"
            size={28}
            color="#fff" />
        </FloatingAction>
        {footer &&
          <Footer
            data={selectedPosition}
            contentContainerStyle={footerStyle}
            onSubmit={onSubmit}
            title="ADD NEW ADDRESS" />
        }
      </RNMap>
    </SafeAreaView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
