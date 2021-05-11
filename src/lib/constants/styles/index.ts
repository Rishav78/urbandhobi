import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const globalStyles = StyleSheet.create({
  textinput: {
    height: hp("7%"),
    fontSize: wp("3.5%"),
    backgroundColor: "#fff",
    padding: 0,
  },
  button: {
    marginBottom: hp("2%"),
  },
  buttonContent: {
    paddingVertical: wp("2%"),
  },
});

export const theme = {
  dark: { colors: { primary: "#333" } },
  light: { colors: { primary: "#fff" } },
};

