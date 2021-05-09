import React, { useCallback, memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Clickable } from "@urbandhobi/components/click";
import { Address, AddressMode } from "@urbandhobi/@types";
import { TouchableRipple } from "react-native-paper";

interface AddressCardProps {
  data: Address;
  onMakeDefault?: (data: Address) => void;
  onDelete?: (data: Address) => void;
  mode?: AddressMode;
  onSelect?: (address: Address) => void;
}

const AddressCard: React.FC<AddressCardProps> = memo(({
  data,
  onMakeDefault,
  onDelete,
  mode = "config",
  onSelect,
}) => {
  const makeDefault = useCallback(() => {
    if (onMakeDefault) {
      onMakeDefault(data);
    }
  }, [onMakeDefault, data]);

  const deleteAddress = useCallback(() => {
    if (onDelete) {
      onDelete(data);
    }
  }, [onDelete, data]);

  const onSelectHandler = useCallback(() => {
    if (onSelect) {
      onSelect(data);
    }
  }, [onSelect, data]);

  return (
    <Animated.View style={styles.container}>
      <TouchableRipple onPress={onSelect ? onSelectHandler : undefined}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="home-city-outline"
              size={24}
              color="#0C0C0C" />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{data.title || data.email}</Text>
            <Text style={styles.address}>{data.houseno}, {data.locality}, {data.city}, {data.state} {data.postalCode}</Text>
            {mode === "config" &&
              <View style={styles.action}>
                <Clickable onPress={deleteAddress} activeOpacity={0.5}>
                  <Text style={styles.delete}>Delete</Text>
                </Clickable>
                {!data.default &&
                  <Clickable
                    activeOpacity={0.5}
                    onPress={makeDefault}
                    style={styles.clickable}>
                    <Text style={styles.makedefault}>Make Default</Text>
                  </Clickable>
                }
              </View>
            }
          </View>
        </View>
      </TouchableRipple>

    </Animated.View>
  );
});

export default AddressCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp("1.5%"),
    flex: 1,
  },
  contentContainer: {
    display: "flex",
    paddingHorizontal: wp("2%"),
    paddingTop: wp("2%"),
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  iconContainer: {},
  detailsContainer: {
    flex: 1,
    marginHorizontal: wp("4%"),
    borderBottomWidth: 0.5,
    borderBottomColor: "#898989",
  },
  title: {
    color: "#0C0C0C",
    fontSize: wp("5%"),
  },
  address: {
    color: "#898989",
    fontSize: wp("3.5%"),
    paddingVertical: hp("1%"),
  },
  action: {
    display: "flex",
    flexDirection: "row",
    // marginTop: hp("1%"),
    marginBottom: hp("1.5%"),
  },
  clickable: {
    marginHorizontal: wp("5%"),
  },
  delete: {
    color: "#ff0000",
  },
  makedefault: {
    color: "#33cc33",
  },
});
