import { emailRegex } from "@urbandhobi/lib/helpers";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, Modal, ScrollView, ModalProps, Alert } from "react-native";
import { Button, TextInput, Appbar } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {AddressType, EditAddress as EditAddressT} from "@urbandhobi/@types";

const theme = { colors: { primary: "#333" } };

interface EditAddressProps {
  title?: string;
  onBack?: () => void;
  data?: {
    city: string;
    pincode: string;
    state: string;
    roadname?: string;
  } | null;
  onSubmit: (data: EditAddressT) => void;
}

const EditAddress = ({ title, onBack, data, visible, onSubmit, ...rest }: EditAddressProps & ModalProps) => {
  const [email, setEmail] = useState<string | null>(null);
  const [phonenumber, setPhonenumer] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [pincode, setPincode] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [roadname, setRoadname] = useState<string | null>(null);
  const [houseno, setHouseno] = useState<string | null>(null);
  const [type, setType] = useState<AddressType | null>(null);

  const isValidEmail = emailRegex.test(email || "");
  const isValidPincode = !isNaN(pincode as any) && (pincode || "").length === 6;

  useEffect(() => {
    if (visible) {
      resetValues();
      setCity((data && data.city) || null);
      setPincode((data && data.pincode) || null);
      setState((data && data.state) || null);
      setRoadname((data && data.roadname) || null);
    }
  }, [visible]);

  const resetValues = () => {
    setEmail(null);
    setPhonenumer(null);
    setCity(null);
    setPincode(null);
    setState(null);
    setRoadname(null);
    setHouseno(null);
    setType(null);
  };

  const onSubmitHandler = useCallback(() => {
    if (!email || !phonenumber || !city || !pincode || !state || !roadname || !houseno || !type) {
      return Alert.alert("Please provide all the required fields");
    }
    onSubmit({
      city,
      email,
      houseno,
      phonenumber,
      state,
      type,
      locality: roadname,
      postalCode: pincode,
    });
  }, [email, phonenumber, city, pincode, state, roadname, houseno, type]);

  return (
    <Modal visible={visible} onRequestClose={onBack} {...rest}>
      <Appbar.Header theme={theme}>
        <Appbar.BackAction onPress={onBack} />
        <Appbar.Content title={title || "Add delivery address"} />
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* EMAIL Section */}
          <View style={styles.itemContiner}>
            <TextInput
              error={email !== null && !isValidEmail}
              theme={theme}
              style={styles.textinput}
              mode="outlined"
              keyboardType="email-address"
              value={email || ""}
              onChangeText={setEmail}
              label="Email (Required)*"
            />
          </View>
          {/* PHONE NUMBER Section */}
          <View style={styles.itemContiner}>
            <TextInput
              error={phonenumber === ""}
              theme={theme}
              style={styles.textinput}
              mode="outlined"
              keyboardType="number-pad"
              onChangeText={setPhonenumer}
              label="Phone number (Required)*"
            />
          </View>
          {/* [EXTRA INFORMATION] ADD ALTERNATIVE NUMBER Section */}
          <View style={[styles.itemContiner, styles.extraInfoContainer]}>
            <Button compact icon={() => <MaterialIcons name="add" size={18} color="#333" />} uppercase={false} mode="text">
              <Text style={styles.extraInfoText}>Add Alternative Phone Number</Text>
            </Button>
          </View>
          {/* PINCODE Section */}
          <View style={[styles.smallFieldContainer, styles.itemContiner]}>
            <View style={styles.smallField}>
              <TextInput
                error={pincode !== null && !isValidPincode}
                theme={theme}
                value={pincode || ""}
                style={styles.textinput}
                mode="outlined"
                keyboardType="number-pad"
                onChangeText={setPincode}
                label="Pincode (Required)*"
              />
            </View>
            <View style={styles.smallField}>
              <Button color="#333" icon={() => <MaterialIcons name="my-location" size={18} color="#fff" />} mode="contained" compact onPress={() => console.log("Pressed")}>
                <Text style={{ fontSize: 13 }}>Use my location</Text>
              </Button>
            </View>
          </View>
          {/* STATE AND CITY Section */}
          <View style={[styles.smallFieldContainer, styles.itemContiner]}>
            <View style={styles.smallField}>
              <TextInput
                error={state !== null && !state}
                theme={theme}
                style={styles.textinput}
                mode="outlined"
                value={state || ""}
                onChangeText={setState}
                label="State (Required)*"
              />
            </View>
            {/* to prevent screen distortion unset justifyContent */}
            <View style={[styles.smallField, { justifyContent: undefined }]}>
              <TextInput
                theme={theme}
                style={styles.textinput}
                mode="outlined"
                value={city || ""}
                onChangeText={setCity}
                label="City (Required)*"
              />
            </View>
          </View>
          {/* HOUSE NUMBER Section */}
          <View style={styles.itemContiner}>
            <TextInput
              theme={theme}
              style={styles.textinput}
              mode="outlined"
              value={houseno || ""}
              onChangeText={setHouseno}
              label="House No., Building Name (Required)*"
            />
          </View>
          {/* ROAD NAME Section */}
          <View style={styles.itemContiner}>
            <TextInput
              theme={theme}
              style={styles.textinput}
              mode="outlined"
              value={roadname || ""}
              onChangeText={setRoadname}
              label="Road name, Area, Colony (Required)*"
            />
          </View>
          {/* [EXTRA INFORMATION] ADD NEARBY ADDRESS Section */}
          <View style={[styles.itemContiner, styles.extraInfoContainer]}>
            <Button compact icon={() => <MaterialIcons name="add" size={18} color="#333" />} uppercase={false} mode="text">
              <Text style={styles.extraInfoText}>Add Nearby Famous Shop/Mall/Landmark</Text>
            </Button>
          </View>
          {/* ADDRESS TYPE Section */}
          <View style={styles.itemContiner}>
            <Text style={styles.addressTypeTitle}>Type of address</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.addressTypeContainer}>
                <Button
                  onPress={() => setType("home")}
                  theme={theme}
                  compact
                  color="#bfbfbf"
                  icon="home"
                  mode={type === "home" ? "contained" : "outlined"}
                  uppercase={false}>Home</Button>

                <Button
                  onPress={() => setType("work")}
                  style={styles.addressType}
                  theme={theme}
                  compact
                  color="#bfbfbf"
                  icon={() => (
                    <MaterialIcons name="business" size={18} color="#333" />
                  )}
                  mode={type === "work" ? "contained" : "outlined"}
                  uppercase={false}>Work</Button>
              </View>
            </ScrollView>
          </View>
          {/* SUBMIT Section */}
          <View style={styles.itemContiner}>
            <Button style={styles.saveButton} onPress={onSubmitHandler} color="#333" contentStyle={styles.saveButtonContent} mode="contained">SAVE ADDRESS</Button>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default memo(EditAddress);

const styles = StyleSheet.create({
  container: {},
  textinput: {
    height: hp("7%"),
    fontSize: wp("3.5%"),
    backgroundColor: "#fff",
    padding: 0,
  },
  itemContiner: {
    paddingHorizontal: 15,
    marginTop: 12,
  },
  extraInfoContainer: {
    alignItems: "flex-start",
  },
  extraInfoText: {
    color: "#333",
    fontSize: wp("3%"),
  },
  addressTypeTitle: {
    color: "#333",
  },
  addressTypeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: wp("2%"),
  },
  addressType: {
    marginLeft: wp("3%"),
  },
  smallFieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallField: {
    width: "48%",
    justifyContent: "center",
  },
  saveButton: {
    marginBottom: hp("2%"),
  },
  saveButtonContent: {
    paddingVertical: wp("2%"),
  },
});
