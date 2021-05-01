import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SvgXml } from "react-native-svg";
import { Styles } from "./code.module.js";
import axios from "axios";

import arrowBack from "../../../../../assets/app/arrow-back.svg";
import profilCity from "../market/pictures/profilCity.jpeg";

const CodePage = ({
  idReserver,
  navigation,
  setOpenHome,
  setOpenForm,
  setFinalPage,
}) => {
  const [dataBasket, setDataBasket] = useState();
  const [dataLocation, setDataLocation] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.casety.fr/stripe/charge/genere/${idReserver}`)
      .then((item) => {
        console.log("item =>", item.data);
        item.data.map((item) => setDataBasket(item.code_unlock));
        axios
          .get(`https://api.casety.fr/api/reservers/${idReserver}`)
          .then((items) => {
            axios
              .get(`https://api.casety.fr/api/lockers/${items.data.lockerId}`)
              .then((dataLocker) => {
                axios
                  .get(
                    `https://api.casety.fr/api/locations/${dataLocker.data.locationId}`
                  )
                  .then((dataLockerLocation) => {
                    setDataLocation(dataLockerLocation.data);
                  });
              });
          });
      })
      .catch((err) => {
        console.log("Get reservers fail =>", err);
      });
  }, []);
  return (
    <View style={Styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 5,
          marginLeft: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setOpenHome(true);
            setOpenForm(false);
            setFinalPage(false);
            navigation.navigate("Home", {
              reset: false,
            });
          }}
        >
          <View>
            <SvgXml width="15" height="15" xml={arrowBack} />
          </View>
        </TouchableOpacity>
        <View style={Styles.row}>
          <Image style={Styles.tinyLogo} source={profilCity} />
          <View style={{ marginLeft: 20, marginTop: 10 }}>
            <Text
              style={[
                Styles.title,
                {
                  fontWeight: "bold",
                  color: "#2067F9",
                },
              ]}
            >
              Votre code
            </Text>
            <Text style={Styles.code}>{dataBasket}</Text>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 10,
                color: "#000000",
                fontSize: 10,
                alignItems: "stretch",
              }}
            >
              {dataLocation.first_adress}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 1,
                color: "#000000",
                fontSize: 10,
                alignItems: "stretch",
              }}
            >
              {dataLocation.city}, {dataLocation.zip_code}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CodePage;
