import * as React from "react";
import { Text, View, StyleSheet, Modal, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const textinputTheme = { colors: { primary: "#333" } };

interface EditAddressProps { }

const EditAddress = ({}: EditAddressProps) => {
  return (
    <Modal visible={true}>
      <ScrollView>
        <View>
          {/* EMAIL Section */}
          <View style={styles.itemContiner}>
            <TextInput
              theme={textinputTheme}
              style={styles.textinput}
              mode="outlined"
              label="Email (Required)*"
            />
          </View>
          {/* PHONE NUMBER Section */}
          <View style={styles.itemContiner}>
            <TextInput
              theme={textinputTheme}
              style={styles.textinput}
              mode="outlined"
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
                theme={textinputTheme}
                style={styles.textinput}
                mode="outlined"
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
                theme={textinputTheme}
                style={styles.textinput}
                mode="outlined"
                label="State (Required)*"
              />
            </View>
            <View style={styles.smallField}>
              <TextInput
                theme={textinputTheme}
                style={styles.textinput}
                mode="outlined"
                label="City (Required)*"
              />
            </View>
          </View>
          {/* HOUSE NUMBER Section */}
          <View style={styles.itemContiner}>
            <TextInput
              theme={textinputTheme}
              style={styles.textinput}
              mode="outlined"
              label="House No., Building Name (Required)*"
            />
          </View>
          {/* ROAD NAME Section */}
          <View style={styles.itemContiner}>
            <TextInput
              theme={textinputTheme}
              style={styles.textinput}
              mode="outlined"
              label="Road name, Area, Colony (Required)*"
            />
          </View>
          {/* [EXTRA INFORMATION] ADD NEARBY ADDRESS Section */}
          <View style={[styles.itemContiner, styles.extraInfoContainer]}>
            <Button compact icon={() => <MaterialIcons name="add" size={18} color="#333" />} uppercase={false} mode="text">
              <Text style={styles.extraInfoText}>Add Nearby Famous Shop/Mall/Landmark</Text>
            </Button>
          </View>
          {/* SUBMIT Section */}
          <View style={styles.itemContiner}>
            <Button color="#333" style={styles.saveButton} mode="contained">SAVE ADDRESS</Button>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  container: {},
  textinput: {
    height: hp("7%"),
    fontSize: wp("3.5%"),
    backgroundColor: "#fff",
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
  smallFieldContainer: { flexDirection: "row", justifyContent: "space-between" },
  smallField: { width: "48%", justifyContent: "center" },
  saveButton: {
    paddingVertical: wp("2%"),
  },
});
