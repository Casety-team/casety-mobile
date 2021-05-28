import React, { useState, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import moment from "moment";
import "moment/locale/fr";
import axios from "axios";
import deviceStorage from "../../../../../services/deviceStorage";
import DateTimePicker from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import ButtonCirle from "../../../../../components/Button";

import { Styles } from "../ListItem.module";

import arrow from "../../../../../assets/app/arrow.svg";
import arrowBack from "../../../../../assets/app/arrow-back.svg";
import calendar from "../../../../../assets/app/calendar.svg";

export default function ReserverForm({
  setOpenHome,
  setOpenForm,
  getIdLocation,
  depot,
  retrait,
  setDepot,
  setRetrait,
  typesCasier,
  typesCasierValue,
  setTypesCasier,
  setTypesCasierValue,
  getDataLocker,
  setGetDataLocker,
  setFinalPage,
}) {
  const [isSelected, setSelected] = useState(false);
  const [typeUpdateLockers, setTypeUpdateLockers] = useState("");
  const [firstnameLocal, setFirstnameLocal] = useState("");
  const tCasier = [
    { value: 0, label: "Casier Vélo" },
    { value: 1, label: "Casier Valise" },
    { value: 2, label: "Casier Sac à dos" },
  ];

  useEffect(() => {
    deviceStorage.getMyObject().then(async (item) => {
      await setFirstnameLocal(item.firstname);
    });
  }, []);

  useEffect(() => {
    if (depot && retrait) {
      if (typesCasier != null) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    } else {
      setSelected(false);
    }
  }, [depot, retrait]);

  useEffect(() => {
    typesCasierValue.filter(async (type) => {
      if (type == "") {
        setTypesCasierValue(["init"]);
      } else {
        await axios
          .get(`https://api.casety.fr/api/locker_types/types/${type}`)
          .then(async (items) => {
            await setGetDataLocker(items.data);
          });
      }
    });
  }, [typesCasierValue]);

  //Depot
  const [showDepot, setShowDepot] = useState(false);
  const showDateTimePickerDepot = () => {
    setShowDepot(true);
    Keyboard.dismiss();
  };
  const hideDateTimePickerDepot = () => {
    setShowDepot(false);
  };
  const handleDatePickedDepot = (value) => {
    moment().locale("fr");
    var stillUtc = moment.utc(value).toDate();
    var local = moment(stillUtc).local().format("YYYY-MM-DD HH:mm:ss");
    setDepot(local);
    hideDateTimePickerDepot();
  };

  //Retrait
  const [showRetrait, setShowRetrait] = useState(false);
  const showDateTimePickerRetrait = () => {
    setShowRetrait(true);
    Keyboard.dismiss();
  };
  const hideDateTimePickerRetrait = () => {
    setShowRetrait(false);
  };
  const handleDatePickedRetrait = (value) => {
    moment().locale("fr");
    var stillUtc = moment.utc(value).toDate();
    var local = moment(stillUtc).local().format("YYYY-MM-DD HH:mm:ss");
    setRetrait(local);
    hideDateTimePickerRetrait();
  };

  const handleFinale = () => {
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
              id="depot"
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
              isVisible={showDepot}
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
              id="retrait"
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
              isVisible={showRetrait}
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
          <View style={Styles.input}>
            <RNPickerSelect
              items={tCasier}
              onValueChange={(values) => {
                values != null
                  ? values == 1
                    ? (setTypesCasier(values), setTypesCasierValue(["lockers"]))
                    : values == 2
                    ? (setTypesCasier(values),
                      setTypesCasierValue(["suitcases"]))
                    : (setTypesCasier(values), setTypesCasierValue(["bikes"]))
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
