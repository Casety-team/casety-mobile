import React from "react";
import "moment/locale/fr";
import { View } from "react-native";

//PAGES
import ListLocation from "./location";

export function ListItem({ item, setOpenForm, onPressElement }) {
  return (
    <View>
      <ListLocation
        setOpenForm={setOpenForm}
        onPressElement={onPressElement}
        item={item}
      />
    </View>
  );
}
