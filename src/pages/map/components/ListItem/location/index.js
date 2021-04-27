import React from "react";
import { Pressable, Image, View, Text } from "react-native";

import { Styles } from "../ListItem.module";

import { default as logo } from "../../../../../../assets/app/dark_logo.png";

export default function ListLocation({
  setOpenForm,
  setGetIdLocation,
  onPressElement,
  item,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#FAFAFA" : "#FFFFFF",
        },
        Styles.item,
      ]}
      onPress={() => {
        setOpenForm(true);
        setGetIdLocation(item.id);
        onPressElement(item.id, item.latitude, item.longitude);
      }}
    >
      <View style={[Styles.logo, { backgroundColor: item.color }]}>
        <Image source={logo} style={Styles.logoImage} resizeMode="contain" />
      </View>
      <View>
        <Text style={Styles.titleLocation}>{item.first_adress}</Text>
        <Text style={Styles.direction}>
          Ouvert de {item.opening_hours} Heures à {item.closing_hours} Heures
        </Text>
      </View>
    </Pressable>
  );
}
