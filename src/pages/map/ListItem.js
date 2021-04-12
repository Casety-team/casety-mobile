import React, { useState } from "react";
import { SvgXml } from "react-native-svg";
import { Item, Input, Form } from "native-base";
import SelectInput from "react-native-select-input-ios";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import "moment/locale/fr";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import { default as logo } from "../../../assets/dark_logo.png";
import direction from "../../assets/direction.svg";
import arrow from "../../assets/arrow.svg";
import arrowBack from "../../assets/arrow-back.svg";
//import geolocal from "../../assets/geolocal.svg";
import calendar from "../../assets/calendar.svg";

export function ListItem({ item, onPressElement, navigation }) {
  const [isOpen, setIsOpen] = useState(true);
  const [typesCasier, setTypesCasier] = useState(0);
  const [nombreCasier, setNombreCasier] = useState(0);
  // const [localisation, setLocalisation] = useState("");
  const firstname = "Mathieu";

  //From DatePicker

  //Depot
  const [showDepot, setShowDepot] = useState(false);
  const [depot, setDepot] = useState("");
  const showDateTimePickerDepot = () => {
    setShowDepot(true);
    Keyboard.dismiss();
  };
  const hideDateTimePickerDepot = () => {
    setShowDepot(false);
  };
  const handleDatePickedDepot = (value) => {
    setDepot(value);
    setTimeout(() => {
      hideDateTimePickerDepot();
    }, 250);
  };

  //Retrait
  const [showRetrait, setShowRetrait] = useState(false);
  const [retrait, setRetrait] = useState("");
  const showDateTimePickerRetrait = () => {
    console.log("ok");
    setShowRetrait(true);
    Keyboard.dismiss();
  };
  const hideDateTimePickerRetrait = () => {
    setShowRetrait(false);
  };
  const handleDatePickedRetrait = (value) => {
    setRetrait(value);
    setTimeout(() => {
      hideDateTimePickerRetrait();
    }, 250);
  };

  const tCasier = [
    { value: 0, label: "Types de casier" },
    { value: 1, label: "Casier Vélo" },
    { value: 2, label: "Casier Sac à dos" },
  ];

  const nombre = [
    { value: 0, label: "Nombre casier" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  return isOpen == true ? (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "-12%",
        }}
      >
        <TouchableOpacity onPress={() => setIsOpen(false)}>
          <View style={styles.buttonTop}>
            <SvgXml width="15" height="15" xml={arrowBack} />
          </View>
        </TouchableOpacity>
        <View style={{ marginLeft: "5%" }}>
          <Text style={styles.title}>Bonjour {firstname}</Text>
          <Text style={styles.subTitle}>
            Souhaiter vous réserver un casier ?
          </Text>
        </View>
      </View>
      {/* <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Ma Position"
          value={localisation}
          onChangeText={(valueLocalisation) =>
            setLocalisation(valueLocalisation)
          }
        />
        <View style={{ marginLeft: "-10%", marginTop: 10 }}>
          <SvgXml width="15" height="15" xml={geolocal} />
        </View>
      </View> */}
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderStyle: "solid",
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              width: "5%",
              paddingTop: 5,
              marginLeft: "0%",
            }}
          >
            <SvgXml width="15" height="15" xml={calendar} />
          </View>
          <View style={{ width: "45%", marginLeft: "2%" }}>
            <TouchableOpacity onPress={() => showDateTimePickerDepot}>
              <TextInput
                style={{ paddingTop: 4 }}
                placeholder="Depôt"
                caretHidden
                value={
                  depot
                    ? (moment().locale("fr"),
                      moment(depot).format("D MMMM YYYY hh:mm"))
                    : ""
                }
                onFocus={handleDatePickedDepot}
              />
            </TouchableOpacity>
            <DateTimePicker
              date={depot ? new Date(depot) : new Date()}
              isVisible={showDepot}
              local="fr-FR"
              mode={"datetime"}
              onConfirm={handleDatePickedDepot}
              onCancel={hideDateTimePickerDepot}
            />
          </View>
          <View
            style={{
              width: "5%",
              paddingTop: 5,
              marginLeft: "-2%",
            }}
          >
            <SvgXml width="15" height="15" xml={arrow} />
          </View>
          <View style={{ width: "45%", marginLeft: "2%" }}>
            <Form onPress={() => showDateTimePickerRetrait()}>
              <TouchableOpacity onPress={() => showDateTimePickerRetrait()}>
                <TextInput
                  placeholder="Retrait"
                  style={{ paddingTop: 4 }}
                  value={
                    retrait
                      ? (moment().locale("fr"),
                        moment(retrait).format("D MMMM YYYY hh:mm"))
                      : ""
                  }
                  onFocus={handleDatePickedRetrait}
                />
              </TouchableOpacity>
              <DateTimePicker
                date={retrait ? new Date(retrait) : new Date()}
                isVisible={showRetrait}
                local="fr-FR"
                mode={"datetime"}
                onConfirm={handleDatePickedRetrait}
                onCancel={hideDateTimePickerRetrait}
              />
            </Form>
          </View>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginTop: "5%" }}>
        <View style={{ width: "45%", marginRight: "10%" }}>
          <View>
            <SelectInput
              style={styles.input}
              value={nombreCasier}
              options={tCasier}
              onValueChange={(values) => {
                setNombreCasier(values);
              }}
            />
          </View>
        </View>
        <View style={{ width: "45%" }}>
          <SelectInput
            style={styles.input}
            value={typesCasier}
            options={nombre}
            onValueChange={(valuez) => {
              setTypesCasier(valuez);
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{ marginTop: "5%" }}
        onPress={() => handleLogin()}
      >
        <View style={styles.buttonForm}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "15%",
            }}
          >
            <Text style={{ color: "#ffffff" }}>Payer ma réservation</Text>
            <View style={{ marginLeft: 10, marginTop: 2 }}>
              <SvgXml width="15" height="15" xml={direction} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#FAFAFA" : "white",
        },
        styles.item,
      ]}
      onPress={() => {
        setIsOpen(true);
        onPressElement(item.id, item.latitude, item.longitude);
      }}
    >
      <View style={[styles.logo, { backgroundColor: item.color }]}>
        <Image source={logo} style={styles.logoImage} resizeMode="contain" />
      </View>
      <View>
        <Text style={styles.titleLocation}>{item.name}</Text>
        <Text style={styles.direction}>
          Ouvert de {item.opening_hours} Heures à {item.closing_hours} Heures
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    height: 32,
    width: 32,
    borderRadius: 50,
    marginRight: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    height: "65%",
    width: "65%",
  },
  titleLocation: {
    fontFamily: "Helvetica-Light",
    fontWeight: "500",
    fontSize: 16,
    marginTop: "3%",
  },
  title: {
    fontFamily: "Helvetica-Light",
    fontWeight: "500",
    fontSize: 30,
    marginTop: "3%",
  },
  subTitle: {
    fontFamily: "Helvetica-Light",
    width: "70%",
    fontSize: 18,
    marginTop: "3%",
    marginBottom: "3%",
  },
  direction: {
    fontSize: 14,
    fontWeight: "400",
    color: "#989CA5",
  },
  differentSelectLabel: {
    fontSize: 16,
    color: "blue",
  },
  differentSelectValue: {
    fontSize: 18,
    color: "#000000",
  },
  input: {
    marginBottom: "3%",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
  },
  inputPicker: {
    marginTop: "-10%",
    width: "100%",
  },
  container: {
    width: "80%",
    height: "100%",
    marginLeft: "10%",
  },
  buttonTop: {
    width: "10%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  button: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "#2067F9",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonForm: {
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "#2067F9",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 40,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
    fontSize: 17,
  },
});
