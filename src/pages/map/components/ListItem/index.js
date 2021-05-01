import React from "react";
import "moment/locale/fr";
import { View } from "react-native";

//PAGES
import ListLocation from "./location";

export function ListItem({
  item,
  setOpenHome,
  setGetIdLocation,
  setOpenForm,
  onPressElement,
}) {
  return (
    <View>
      <ListLocation
        setOpenHome={setOpenHome}
        setOpenForm={setOpenForm}
        setGetIdLocation={setGetIdLocation}
        onPressElement={onPressElement}
        item={item}
      />
    </View>
  );
}
