import { Request } from "@urbandhobi/@types";
import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button, Card, TouchableRipple } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

interface OrderCardProps {
  data: Request;
}

const OrderCard = ({ data }: OrderCardProps) => {
  return (
    <View style={styles.container}>
      <Card>
        <TouchableRipple
          style={styles.touchable}
          onPress={() => { }}>
          <>
            <Card.Title title={data.createdAt} />
            <Card.Content>
              <Text>Payment Method: {data.paymentMethod.toUpperCase()}</Text>
            </Card.Content>
            <Card.Actions style={{justifyContent: "flex-end"}}>
              <Button theme={{colors: {primary: "#333"}}} onPress={() => {}}>Cancel</Button>
            </Card.Actions>
          </>
        </TouchableRipple>
      </Card>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp("1%"),
  },
  touchable: {
    paddingBottom: wp("3%"),
  },
});
