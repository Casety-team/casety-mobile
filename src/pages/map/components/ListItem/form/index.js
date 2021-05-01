import React, { useState, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import moment from "moment";
import "moment/locale/fr";
import axios from "axios";
import DateTimePicker from "react-native-modal-datetime-picker";
import SelectInput from "react-native-select-input-ios";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ButtonCirle from "../../../../../components/Button";

import { Styles } from "../ListItem.module";

import direction from "../../../../../assets/app/direction.svg";
import arrow from "../../../../../assets/app/arrow.svg";
import arrowBack from "../../../../../assets/app/arrow-back.svg";
//import geolocal from "../../../../../assets/app/geolocal.svg";
import calendar from "../../../../../assets/app/calendar.svg";

export default function ReserverForm({
  setOpenHome,
  setOpenForm,
  userLocal,
  setFirstnameLocal,
  setLocalId,
  getIdLocation,
  firstnameLocal,
  depot,
  setDepot,
  showDepot,
  showDateTimePickerDepot,
  handleDatePickedDepot,
  hideDateTimePickerDepot,
  retrait,
  setRetrait,
  showRetrait,
  showDateTimePickerRetrait,
  handleDatePickedRetrait,
  hideDateTimePickerRetrait,
  typesCasier,
  setTypesCasier,
  typesCasierValue,
  setTypesCasierValue,
  getDataLocker,
  setGetDataLocker,
  setFinalPage,
}) {
  const [isSelected, setSelected] = useState(false);
  const tCasier = [
    { value: 0, label: "Types de casier" },
    { value: 1, label: "Casier Vélo" },
    { value: 2, label: "Casier Sac à dos" },
  ];

  useEffect(() => {
    userLocal.map(function (item) {
      setFirstnameLocal(item.firstname), setLocalId(item.id);
    });
  }, []);

  useEffect(() => {
    if (depot && retrait) {
      if (typesCasier != 0) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    } else {
      setSelected(false);
    }
  }, [depot, retrait, getDataLocker]);

  useEffect(() => {
    axios
      .get(`https://api.casety.fr/api/lockers/`)
      .then((res) => {
        res.data.map((data) => {
          typesCasierValue.filter((type) => {
            if (type == "") {
              setTypesCasierValue(["init"]);
            } else if (data.locationId == getIdLocation) {
              axios
                .get(`https://api.casety.fr/api/locker_types/types/${type}`)
                .then((items) => {
                  setGetDataLocker(items.data);
                });
            }
          });
        });
      })
      .catch((err) => {
        console.log("Get lockers fail", err);
      });
  }, [typesCasierValue]);

  const handleFinale = () => {
    setDepot(""),
      setRetrait(""),
      setTypesCasier(0),
      setTypesCasierValue(["init"]);
    setFinalPage(true), setOpenHome(false), setOpenForm(false);
  };
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
            setOpenHome(true);
            setOpenForm(false);
          }}
        >
          <View style={Styles.buttonTop}>
            <SvgXml width="15" height="15" xml={arrowBack} />
          </View>
        </TouchableOpacity>
        <View style={{ marginLeft: "5%" }}>
          <Text style={Styles.title}>Bonjour {firstnameLocal}</Text>
          <Text style={Styles.subTitle}>
            Souhaitez-vous réserver un casier ?
          </Text>
        </View>
      </View>
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
            <TextInput
              style={{ paddingTop: 4 }}
              placeholder="Depôt"
              caretHidden
              value={
                depot
                  ? (moment().locale("fr"), moment(depot).format("D MMMM YYYY"))
                  : ""
              }
              onFocus={showDateTimePickerDepot}
            />
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
            <TextInput
              placeholder="Retrait"
              style={{ paddingTop: 4 }}
              value={
                retrait
                  ? (moment().locale("fr"),
                    moment(retrait).format("D MMMM YYYY"))
                  : ""
              }
              onFocus={showDateTimePickerRetrait}
            />
            <DateTimePicker
              date={retrait ? new Date(retrait) : new Date()}
              isVisible={showRetrait}
              local="fr-FR"
              mode={"datetime"}
              onConfirm={handleDatePickedRetrait}
              onCancel={hideDateTimePickerRetrait}
            />
          </View>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <View
          style={{
            width: typesCasierValue != "init" ? "45%" : "100%",
            marginRight: "10%",
            marginTop: 10,
          }}
        >
          <View>
            <SelectInput
              style={Styles.input}
              value={typesCasier}
              options={tCasier}
              onValueChange={(values) => {
                values != 0
                  ? values == 1
                    ? (setTypesCasier(values), setTypesCasierValue(["bikes"]))
                    : (setTypesCasier(values), setTypesCasierValue(["lockers"]))
                  : (setTypesCasier(values), setTypesCasierValue(["init"]));
              }}
            />
          </View>
        </View>
        {typesCasierValue != "init" && getDataLocker.length > 0 ? (
          <View style={{ width: "45%" }}>
            <Text>Longueur : {getDataLocker[0].height} cm</Text>
            <Text>Largeur : {getDataLocker[0].width} cm</Text>
            <Text>Profondeur : {getDataLocker[0].length} cm</Text>
          </View>
        ) : (
          <View style={{ marginTop: 10 }}>
            <Text>Il n'y a plus de casier!</Text>
          </View>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <ButtonCirle
          navigation={() => (isSelected ? handleFinale() : setFinalPage(false))}
          name="Détail du panier"
          disabled={!isSelected}
          arrowSpace={15}
          width={225}
        />
      </View>
    </View>
  );
}
