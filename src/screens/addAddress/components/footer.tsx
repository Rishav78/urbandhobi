import React, { memo, useCallback } from "react";
import { StyleSheet, Text, View, Animated, StyleProp, ViewStyle } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Button, Input } from "@urbandhobi/components";
import { ReverseGeoCode } from "@urbandhobi/@types";
import { useForm, UseFormProps } from "@urbandhobi/hooks/form";
import { AddAddressFormData } from "@urbandhobi/@types/screens";

export interface AddAddressFooterProps {
  title: string;
  data: ReverseGeoCode | null;
  contentContainerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  onSubmit: (data: AddAddressFormData) => void;
}

const formMetaData: UseFormProps = {
  action: "",
  method: "POST",
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "location",
      type: "string",
    },
    {
      name: "houseno",
      type: "string",
    },
    {
      name: "email",
      type: "email",
    },
  ],
};

const Footer: React.FC<AddAddressFooterProps> = memo(({
  title,
  contentContainerStyle,
  data,
  onSubmit,
}) => {
  const { getValue, setValue, error } = useForm(formMetaData, {
    title: "",
    location: data ? `${data.title}, ${data.address.district}, ${data.address.city} ${data.address.postalCode}, ${data.address.state}, ${data.address.countryName}(${data.address.countryCode})` : "",
    houseno: "",
    email: "",
  });
  const disable = error.error;
  const values = getValue();

  const onAddressTitleChange = useCallback((text: string) => {
    setValue("title", text);
  }, []);

  const onLocationChange = useCallback((text: string) => {
    setValue("location", text);
  }, []);

  const onHousenoChange = useCallback((text: string) => {
    setValue("houseno", text);
  }, []);

  const onEmailChange = useCallback((text: string) => {
    setValue("email", text);
  }, []);

  const onFormSubmit = useCallback(() => {
    if (onSubmit) {
      onSubmit(getValue());
    }
  }, []);

  return (
    <Animated.View style={[styles.container, contentContainerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ marginVertical: hp("1%") }}>
        <Input
          title="TITLE"
          onChangeText={onAddressTitleChange}
          value={values.title}
          contentContainerStyle={styles.inputContainer} />
        <Input
          title="LOCATION"
          editable={false}
          multiline={true}
          onChangeText={onLocationChange}
          value={values.location}
          contentContainerStyle={styles.inputContainer} />
        <Input
          title="HOUSE/FLAT NO."
          onChangeText={onHousenoChange}
          value={values.houseno}
          contentContainerStyle={styles.inputContainer}
        />
        <Input
          title="E-MAIL"
          onChangeText={onEmailChange}
          value={values.email}
          contentContainerStyle={styles.inputContainer}
        />
      </View>
      <Button
        disabled={disable}
        title="SAVE"
        onPress={onFormSubmit}
      />
    </Animated.View>
  );
});

export default Footer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: wp("5%"),
    paddingVertical: wp("4%"),
    elevation: 10,
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    marginVertical: 10,
  },
});
