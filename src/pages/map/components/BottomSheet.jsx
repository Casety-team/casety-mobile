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

const windowHeight = Dimensions.get("window").height;

export function BottomSheet({ onPressElement, navigation }) {
  const [openForm, setOpenForm] = useState(false);
  const [firstnameLocal, setFirstnameLocal] = useState("");
  const [userLocal, setUserLocal] = useState([]);
  const [idLocal, setLocalId] = useState("");

  //Form STATE
  // const [localisation, setLocalisation] = useState("");
  const [typesCasier, setTypesCasier] = useState(0);
  const [typesCasierValue, setTypesCasierValue] = useState([]);
  const [lengthLockers, setLengthLockers] = useState(1);
  const [depot, setDepot] = useState("");
  const [retrait, setRetrait] = useState("");
  const [getDataLocker, setGetDataLocker] = useState([]);
  const [locationsData, setLocationsData] = useState([]);

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

  useEffect(() => {
    axios
      .get(`https://api.casety.fr/api/lockers/`, {
        timeout: 9000,
      })
      .then((res) => {
        res.data.map((data) => {
          typesCasierValue.filter((type) => {
            axios
              .get(`https://api.casety.fr/api/locker_types/types/${type}`, {
                timeout: 9000,
              })
              .then((items) => {
                if (data.locationId == item.id) {
                  setGetDataLocker(
                    items.data.map((data_item) => {
                      if (data.locker_type_id === data_item.id) {
                        return {
                          value: data_item.id,
                          label:
                            " Height: " +
                            data_item.height +
                            " Width: " +
                            data_item.width +
                            " Lenght: " +
                            data_item.length,
                        };
                      } else {
                        setTypesCasierValue(["init"]);
                      }
                    })
                  );
                }
              });
          });
        });
      })
      .catch((err) => {
        console.log("Get lockers fail", err);
      });
  }, [typesCasierValue]);

  const handleLogin = () => {
    axios
      .post(
        "https://api.casety.fr/api/reservers",
        {
          date_start: depot,
          date_end: retrait,
          userId: idLocal,
          lockerId: lengthLockers,
        },
        { timeout: 9000 }
      )
      .then((item) => {
        navigation.navigate("Shop");
      })
      .catch((err) => {
        console.log("Reservers fail", err);
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

  return (
    <ScrollBottomSheet
      componentType="FlatList"
      snapPoints={[100, "50%", windowHeight - 200]}
      initialSnapIndex={1}
      renderHandle={() => <View style={styles.header} />}
      data={locationsData}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View>
          <View style={{ display: openForm ? "none" : "" }}>
            <ListItem
              openForm={openForm}
              setOpenForm={setOpenForm}
              item={item}
              onPressElement={onPressElement}
            />
          </View>
          {openForm && (
            <ReserverForm
              setOpenForm={setOpenForm}
              userLocal={userLocal}
              setFirstnameLocal={setFirstnameLocal}
              setLocalId={setLocalId}
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
              handleLogin={handleLogin}
            />
          )}
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
