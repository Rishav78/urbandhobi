import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import RNMap from "@urbandhobi/components/map";
import {
  getCurrentPosition,
  LONGITUDE_DELTA,
  LATITUDE_DELTA,
  reverseGeoCoding,
} from "@urbandhobi/lib/helpers";
import { ReverseGeoCode } from "@urbandhobi/@types/services";
import { saveAddress } from "@urbandhobi/actions/address";
import EditAddress from "./components/edit-address";
import { FAB, Portal } from "react-native-paper";
import { EditAddress as EditAddressT, FABState } from "@urbandhobi/@types";

export const AddAddress = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [fabState, setFABState] = useState(false);
  const [isEditScreenVisible, setEditScreenVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<ReverseGeoCode | null>(null);
  const mapRef = useRef<MapView>(null);

  const onFABStateChange = useCallback(({ open }: FABState) => {
    setFABState(open);
  }, []);

  const editScreenData = useMemo(() => (selectedPosition ? {
    city: selectedPosition.address.city,
    pincode: selectedPosition.address.postalCode,
    state: selectedPosition.address.state,
    roadname: selectedPosition.address.label,
  } : null), [selectedPosition]);

  const onEditScreenBackHandler = useCallback(() => {
    setSelectedPosition(null);
    setEditScreenVisible(false);
    setFABState(false);
  }, []);

  const getAndSetPosition = useCallback(async () => {
    setLoading(true);
    try {
      const { coords: { latitude, longitude } } = await getCurrentPosition();
      if (mapRef.current) {
        setSelectedPosition(await reverseGeoCoding(longitude, latitude));
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }, 1000);
        setTimeout(() => setEditScreenVisible(true), 1000);
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

  const onSubmit = useCallback(async (data: EditAddressT) => {
    try {
      await saveAddress(data);
      onEditScreenBackHandler();
      Alert.alert("Address saved");
    }
    catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <RNMap
        ref={mapRef}
        onMapReady={setLoadingComplete}
        loadingEnabled={loading}>
        <Portal>
          <FAB.Group
            onStateChange={onFABStateChange}
            visible={true}
            open={fabState}
            icon={loading ?
              () => (
                <View style={styles.mylocation}>
                  <ActivityIndicator color="#333" size="large" />
                </View>
              ) : "plus"
            }
            actions={[
              { icon: "plus", label: "Add new", onPress: () => setEditScreenVisible(true) },
              {
                icon: () => (
                  <View style={styles.mylocation}>
                    <MaterialIcons name="my-location" size={24} color="#333" />
                  </View>
                ),
                label: "Get my location",
                onPress: getAndSetPosition,
              },
            ]}
          />
        </Portal>
          <EditAddress
            data={editScreenData}
            onBack={onEditScreenBackHandler}
            visible={isEditScreenVisible}
            onSubmit={onSubmit}
            animationType="slide" />
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
  mylocation: { flex: 1, justifyContent: "center", alignItems: "center" },
});
