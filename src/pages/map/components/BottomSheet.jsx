//BottomSheet.js
import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/fr";
import deviceStorage from "../../../services/deviceStorage";

import axios from "axios";
import { Dimensions, StyleSheet, View, Keyboard } from "react-native";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import { ListItem } from "./ListItem";
import ReserverForm from "./ListItem/form";
import Market from "./ListItem/market";
import CodePage from "./ListItem/code";

const windowHeight = Dimensions.get("window").height;

export function BottomSheet({
  getReset,
  onPressElement,
  navigation,
  reverserId,
}) {
  const [openHome, setOpenHome] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [finalPage, setFinalPage] = useState(false);
  const [getIdLocation, setGetIdLocation] = useState("");
  const [firstnameLocal, setFirstnameLocal] = useState("");
  const [userLocal, setUserLocal] = useState([]);
  const [idLocal, setLocalId] = useState("");
  //Form STATE
  const [typesCasier, setTypesCasier] = useState(0);
  const [typesCasierValue, setTypesCasierValue] = useState([""]);
  const [lengthLockers, setLengthLockers] = useState(1);
  const [depot, setDepot] = useState("");
  const [retrait, setRetrait] = useState("");
  const [getDataLocker, setGetDataLocker] = useState([]);
  const [locationsData, setLocationsData] = useState([]);

  const [idReserver, setIdReserver] = useState("");
  const [idLocker, setIdLocker] = useState("");

  useEffect(() => {
    if (getReset) {
      setOpenHome(false);
      setOpenForm(false);
      setFinalPage(false);
    } else {
      setOpenHome(true);
      setOpenForm(false);
      setFinalPage(false);
    }
  }, []);

  useEffect(() => {
    deviceStorage
      .getMyObject()
      .then(async (item) => await setUserLocal([item]));
  }, []);

  useEffect(() => {
    axios
      .get("https://api.casety.fr/api/locations/", { timeout: 9000 })
      .then((item) => {
        setLocationsData(item.data);
      })
      .catch((err) => {
        console.log("Location fail", err);
      });
  }, []);

  const handleShop = (price, name) => {
    axios
      .post("https://api.casety.fr/api/reservers", {
        date_start: depot,
        date_end: retrait,
        userId: idLocal,
        lockerId: lengthLockers,
      })
      .then((item) => {
        axios
          .get(`https://api.casety.fr/api/lockers/${item.data.lockerId}`)
          .then((data) => {
            console.log("Update to_rent success");
            setIdReserver(item.data.id);
            setIdLocker(item.data.lockerId);
            navigation.navigate("Shop", {
              idReserver: item.data.id,
              idLocker: item.data.lockerId,
              name,
              price,
            });
          });
      })
      .catch((err) => {
        console.log("Error booking  is not create =>", err);
      });
  };

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
    setTimeout(() => {
      hideDateTimePickerDepot();
    }, 250);
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
    setTimeout(() => {
      hideDateTimePickerRetrait();
    }, 250);
  };

  return !getReset ? (
    <ScrollBottomSheet
      componentType="FlatList"
      snapPoints={[100, "50%", windowHeight - 200]}
      initialSnapIndex={1}
      renderHandle={() => <View style={styles.header} />}
      data={locationsData}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View>
          {openHome && !openForm && !finalPage && (
            <View style={{ display: openForm ? "none" : "" }}>
              <ListItem
                setOpenHome={setOpenHome}
                openForm={openForm}
                setOpenForm={setOpenForm}
                item={item}
                setGetIdLocation={setGetIdLocation}
                onPressElement={onPressElement}
              />
            </View>
          )}
          {!openHome && openForm && !finalPage && (
            <ReserverForm
              setOpenHome={setOpenHome}
              setOpenForm={setOpenForm}
              userLocal={userLocal}
              setFirstnameLocal={setFirstnameLocal}
              setLocalId={setLocalId}
              getIdLocation={getIdLocation}
              firstnameLocal={firstnameLocal}
              depot={depot}
              showDepot={showDepot}
              showDateTimePickerDepot={showDateTimePickerDepot}
              handleDatePickedDepot={handleDatePickedDepot}
              hideDateTimePickerDepot={hideDateTimePickerDepot}
              retrait={retrait}
              showRetrait={showRetrait}
              showDateTimePickerRetrait={showDateTimePickerRetrait}
              handleDatePickedRetrait={handleDatePickedRetrait}
              hideDateTimePickerRetrait={hideDateTimePickerRetrait}
              typesCasier={typesCasier}
              setTypesCasier={setTypesCasier}
              typesCasierValue={typesCasierValue}
              setTypesCasierValue={setTypesCasierValue}
              lengthLockers={lengthLockers}
              getDataLocker={getDataLocker}
              setLengthLockers={setLengthLockers}
              setGetDataLocker={setGetDataLocker}
              setFinalPage={setFinalPage}
            />
          )}
          {!openHome && finalPage && !openForm && (
            <Market
              setOpenHome={setOpenHome}
              handleShop={handleShop}
              setOpenForm={setOpenForm}
              setFinalPage={setFinalPage}
              depot={depot}
              retrait={retrait}
              idLocal={idLocal}
              getDataLocker={getDataLocker}
            />
          )}
        </View>
      )}
      contentContainerStyle={styles.contentContainerStyle}
    />
  ) : (
    <ScrollBottomSheet
      componentType="FlatList"
      snapPoints={[100, "50%", windowHeight - 200]}
      initialSnapIndex={1}
      renderHandle={() => <View style={[styles.header, { marginTop: 250 }]} />}
      data={locationsData}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View>
          <CodePage
            idReserver={idReserver}
            navigation={navigation}
            setOpenHome={setOpenHome}
            setOpenForm={setOpenForm}
            setFinalPage={setFinalPage}
          />
        </View>
      )}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
});
