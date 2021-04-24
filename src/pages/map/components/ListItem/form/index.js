import React, { useEffect } from "react";
import { SvgXml } from "react-native-svg";
import moment from "moment";
import "moment/locale/fr";
import DateTimePicker from "react-native-modal-datetime-picker";
import SelectInput from "react-native-select-input-ios";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { Styles } from "../ListItem.module";

import direction from "../../../../../assets/app/direction.svg";
import arrow from "../../../../../assets/app/arrow.svg";
import arrowBack from "../../../../../assets/app/arrow-back.svg";
//import geolocal from "../../../../../assets/app/geolocal.svg";
import calendar from "../../../../../assets/app/calendar.svg";

export default function ReserverForm({
  setOpenForm,
  userLocal,
  setFirstnameLocal,
  setLocalId,
  firstnameLocal,
  depot,
  showDepot,
  showDateTimePickerDepot,
  handleDatePickedDepot,
  hideDateTimePickerDepot,
  retrait,
  showRetrait,
  showDateTimePickerRetrait,
  handleDatePickedRetrait,
  hideDateTimePickerRetrait,
  typesCasier,
  setTypesCasier,
  typesCasierValue,
  setTypesCasierValue,
  lengthLockers,
  getDataLocker,
  setLengthLockers,
  handleLogin,
}) {
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

  return (
    <View style={Styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "-12%",
        }}
      >
        <TouchableOpacity onPress={() => setOpenForm(false)}>
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
      {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={Styles.input}
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
            {/**moment(retrait).format("D MMMM YYYY hh:mm") */}
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
      <View style={{ display: "flex", flexDirection: "row", marginTop: "5%" }}>
        <View
          style={{
            width: typesCasierValue != "init" ? "45%" : "100%",
            marginRight: "10%",
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
        {typesCasierValue != "init" && (
          <View style={{ width: "45%" }}>
            <SelectInput
              style={Styles.input}
              value={lengthLockers}
              options={getDataLocker}
              onValueChange={(valuez) => {
                setLengthLockers(valuez);
              }}
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        style={{ marginTop: "5%" }}
        onPress={() => handleLogin()}
      >
        <View style={Styles.buttonForm}>
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
  );
}
