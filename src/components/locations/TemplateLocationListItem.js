import React from "react";
import { ListItem } from "react-native-elements";

const TemplateLocationListItem = ({ item }) => {
  return (
    <ListItem key={item.id} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.first_adress}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default TemplateLocationListItem;
