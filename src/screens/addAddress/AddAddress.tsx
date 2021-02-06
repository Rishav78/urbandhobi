import React, { useCallback, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import RNMap from "../../components/map";
import { getCurrentPosition, LONGITUDE_DELTA, LATITUDE_DELTA } from "../../lib/helpers";
import { FloatingAction } from "../../components";

export const AddAddress = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const mapRef = useRef<MapView>(null);

  const getAndSetPosition = useCallback(async () => {
    setLoading(true);
    try {
      const { coords: { latitude, longitude } } = await getCurrentPosition();
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }, 1000);
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }, []);

  const setLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <RNMap
        ref={mapRef}
        onMapReady={setLoadingComplete}
        loadingEnabled={loading}>
        <FloatingAction
          disabled={loading}
          loading={loading}
          onPress={getAndSetPosition}>
          <MaterialIcons
            name="my-location"
            size={28}
            color="#fff" />
        </FloatingAction>
      </RNMap>
    </SafeAreaView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
