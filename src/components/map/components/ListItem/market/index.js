import React, { useState, useEffect } from "react";
import axios from "axios";
import { SvgXml } from "react-native-svg";
import { View, Text, TouchableOpacity, Image } from "react-native";
import ButtonCirle from "../../../../../components/Button";
import { Styles } from "../ListItem.module";
import moment from "moment";
import "moment/locale/fr";

import arrowBack from "../../../../../assets/app/arrow-back.svg";
import profilCity from "./pictures/profilCity.jpeg";

export default function Market({
  setOpenHome,
  handleShop,
  setOpenForm,
  setFinalPage,
  depot,
  setDepot,
  retrait,
  setRetrait,
  setTypesCasier,
  setTypesCasierValue,
  idLocal,
  getDataLocker,
}) {
  const [adressLocation, setAdressLocation] = useState("");
  const [cityLocation, setCityLocation] = useState("");
  const [zipCodeLocation, setZipCodeLocation] = useState("");
  const [nameLocker, setNameLocker] = useState("");
  const [price, setPrice] = useState(0);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    axios.get(`https://api.casety.fr/api/locations/${idLocal}`).then((res) => {
      setAdressLocation(res.data.first_adress);
      setCityLocation(res.data.city);
      setZipCodeLocation(res.data.zip_code);
    });
  }, []);

  useEffect(() => {
    getDataLocker.map((item) => {
      setNameLocker(item.name);
      setWidth(item.width);
      setHeight(item.height);
      setLength(item.length);
      setPrice(item.price);
    });
    const startDate = moment(depot);
    const timeEnd = moment(retrait);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    const hours = diffDuration.hours();
    const days = diffDuration.days();

    var count = 0;
    if (days) {
      for (var i = 0; i < days; i++) {
        count += 24;
      }
    }
    const r = hours + count;
    const result = r;
    setResult(result);
  }, []);

  return (
    <View style={Styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "-12%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setDepot("");
            setRetrait("");
            setTypesCasier(0);
            setTypesCasierValue(["init"]);
            setOpenForm(true), setOpenHome(false), setFinalPage(false);
          }}
        >
          <View style={Styles.buttonTop2}>
            <SvgXml width="15" height="15" xml={arrowBack} />
          </View>
        </TouchableOpacity>
        <View style={Styles.row}>
          <Image style={Styles.tinyLogo} source={profilCity} />
          <View style={{ marginLeft: 50, marginTop: 10 }}>
            <Text
              style={[
                Styles.subTitle,
                {
                  fontWeight: "bold",
                  color: "#2067F9",
                  fontSize: 14,
                },
              ]}
            >
              DETAILS
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                marginTop: 10,
                color: "#000000",
                fontSize: 9,
                alignItems: "stretch",
              }}
            >
              {adressLocation}
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
              {cityLocation} {zipCodeLocation}
            </Text>
          </View>
        </View>
      </View>
      <View style={[Styles.row, { marginTop: 15 }]}>
        <Text style={{ fontSize: 13, fontWeight: "bold" }}>
          Dépots possible à partir de
        </Text>
        <View>
          <Text style={{ marginLeft: 55, fontSize: 12 }}>{depot}</Text>
        </View>
      </View>
      <View style={[Styles.row, { marginTop: 15 }]}>
        <Text style={{ fontSize: 13, fontWeight: "bold" }}>
          Récupération obligatoire avant
        </Text>
        <View>
          <Text style={{ marginLeft: 30, fontSize: 12 }}>{retrait}</Text>
        </View>
      </View>
      <View style={[Styles.row, { marginTop: 15 }]}>
        <Text style={{ fontSize: 13, fontWeight: "bold" }}>
          Taille du casier
        </Text>
        <View>
          <Text style={{ marginLeft: 70, fontSize: 12 }}>
            Largeur: {width}cm, Hauteur: {height}cm
          </Text>
          <Text style={{ marginLeft: 70, fontSize: 12 }}>
            Profondeur: {length} cm
          </Text>
        </View>
      </View>
      <View style={[Styles.payCard, { marginTop: 20 }]}>
        <View style={[Styles.row, { padding: 5 }]}>
          <Text style={{ fontSize: 12, color: "#ffffff" }}>
            Sous-total(H.T.)
          </Text>
          <View>
            <Text style={{ marginLeft: 168, fontSize: 12, color: "#ffffff" }}>
              {result - 2},00€
            </Text>
          </View>
        </View>
        <View style={[Styles.row, { padding: 5 }]}>
          <Text style={{ fontSize: 12, color: "#ffffff" }}>Taxes(20%)</Text>
          <View>
            <Text style={{ marginLeft: 192.5, fontSize: 12, color: "#ffffff" }}>
              2,00€
            </Text>
          </View>
        </View>
        <View style={[Styles.row, { padding: 5 }]}>
          <Text style={{ fontSize: 12, color: "#ffffff", fontWeight: "bold" }}>
            Total
          </Text>
          <View>
            <Text
              style={{
                marginLeft: 230,
                fontSize: 12,
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              {result},00€
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <ButtonCirle
          navigation={() => handleShop(price + 2, nameLocker)}
          name="Payer"
          arrowSpace={60}
          width={180}
        />
      </View>
    </View>
  );
}
