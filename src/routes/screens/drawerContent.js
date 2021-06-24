import React from "react";
import deviceStorage from "../../services/deviceStorage";
import { View, StyleSheet } from "react-native";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import { isLoadingToken } from "../../../actions/isLoadingToken";

export function DrawerContent(props) {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Map"
              onPress={() => {
                props.navigation.navigate("Map");
              }}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Profil"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              label="Mes commandes"
              onPress={() => {
                props.navigation.navigate("Basket");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <DrawerItem
        label="Déconnexion"
        onPress={() => {
          dispatch(isLoadingToken(false));
          deviceStorage.deleteJWT();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
