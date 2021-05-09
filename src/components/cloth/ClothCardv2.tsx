import { Cloth } from "@urbandhobi/@types";
import { toTitleCase } from "@urbandhobi/lib/helpers/string";
import Service from "@urbandhobi/lib/service";
import React, { memo, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CardView from "../cardview";
import Counter from "../counter";

export interface ClothCardProps {
  imageUri?: string;
  data: Cloth | string;
  onAdd?: () => boolean;
  onRemove?: () => boolean;
  editable?: boolean;
  quantity: number;
}

const ClothCard: React.FC<ClothCardProps> = ({
  data,
  onAdd,
  onRemove,
  editable = true,
  quantity,
}) => {

  const [cloth, setCloth] = useState(data);
  const title = useMemo(() => (typeof cloth === "string" ? "" : toTitleCase(cloth.name)), [cloth]);

  const fetchClothInfo = async (id: string) => {
    const service = new Service().cloth();
    const d = await service.getById(id);
    if (d) {
      setCloth(d);
    }
  };

  useEffect(() => {
    if (typeof cloth === "string") {
      fetchClothInfo(cloth);
    }
  }, []);

  if (typeof cloth === "string") {
    return (
      <Text>Loading...</Text>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.clothDescription}>
          <Text style={{ fontSize: wp("5%") }}>
            {title}
          </Text>
          <Text>₹{cloth.cost}/Pcs</Text>
          {
            editable === false &&
            <>
              <Text>Quantity {quantity} Pcs</Text>
              <View style={{flex: 1}} />
              <Text>Total ₹{cloth.cost * (quantity || 0)}</Text>
            </>
          }
        </View>
        <View style={styles.rightSide}>
          <View style={styles.imageContainer} />
          {editable &&
            <CardView style={styles.counterContainer}>
              <Counter
                value={quantity}
                onCounterMinus={onRemove}
                onCounterPlus={onAdd} />
            </CardView>
          }
        </View>
      </View>
    </View>
  );
};

export default memo(ClothCard);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp("3%"),
    paddingVertical: wp("5%"),
  },
  clothDescription: {
    flex: 1,
    paddingHorizontal: wp("2%"),
    justifyContent: "center",
  },
  rightSide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("2%"),
  },
  imageContainer: {
    width: wp("28%"),
    height: wp("27%"),
    borderRadius: wp("3%"),
    backgroundColor: "#333",
  },
  counterContainer: {
    position: "absolute",
    width: "90%",
    height: wp("9%"),
    bottom: -wp("3.5%"),
    borderRadius: wp("1%"),
    overflow: "hidden",
  },
});
