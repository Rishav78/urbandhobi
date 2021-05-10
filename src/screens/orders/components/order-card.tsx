import { Address, Request } from "@urbandhobi/@types";
import { monthNames } from "@urbandhobi/lib/constants";
import React, { useCallback, useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button, Card, TouchableRipple } from "react-native-paper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

interface OrderCardProps {
  request: Request;
  address: Address;
  onRevoke: (request: Request) => void;
  onDelete: (request: Request) => void;
}

const converDate = (text: string) => {
  const date = new Date(text);
  const dateString = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  return dateString;
};

const OrderCard = ({ request, address, onRevoke, onDelete }: OrderCardProps) => {
  const date = useMemo(() => converDate(request.createdAt), [request.createdAt]);
  const scheduleDate = useMemo(() => converDate(request.pickupDate), [request.pickupDate]);

  const revokeHandler = useCallback(() => {
    if (onRevoke) {
      onRevoke(request);
    }
  }, []);

  const deleteHandler = useCallback(() => {
    if (onDelete) {
      onDelete(request);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Card>
        <TouchableRipple
          style={styles.touchable}
          onPress={() => { }}>
          <>
            <Card.Title title={date} />
            <Card.Content>
              <Text>
                <Text>Payment Method </Text>
                <Text style={{ color: "#4d4d4d" }}>{request.paymentMethod.toUpperCase()}</Text>,
                <Text> Scheduled On</Text> <Text style={{ color: "#4d4d4d" }}>{scheduleDate}</Text>
              </Text>
              {address && <Text style={{ marginVertical: wp("2%") }}>{address.houseno}, {address.locality}, {address.city}, {address.state} {address.postalCode}</Text>}
            </Card.Content>
            <Card.Actions style={{ justifyContent: "flex-end" }}>
              {request.revoked === true ?
                <>
                  <Button theme={{ colors: { primary: "#333" } }} onPress={() => { }}>Reschedule</Button>
                  <Button theme={{ colors: { primary: "#333" } }} onPress={deleteHandler}>Delete</Button>
                </> :
                <>
                  <Button theme={{ colors: { primary: "#333" } }} onPress={revokeHandler}>Cancel</Button>
                </>
              }
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
