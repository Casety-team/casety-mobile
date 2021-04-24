import React, { useState, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import DateTimePicker from "react-native-modal-datetime-picker";
import SelectInput from "react-native-select-input-ios";
import moment from "moment";
import axios from "axios";
import "moment/locale/fr";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import deviceStorage from "../../../../services/deviceStorage";
import StripeCheckouts from "../../stripe/StripeCheckout";

import direction from "../../../../assets/app/direction.svg";
import arrow from "../../../../assets/app/arrow.svg";
import arrowBack from "../../../../assets/app/arrow-back.svg";
//import geolocal from "../../../../assets/app/geolocal.svg";
import calendar from "../../../../assets/app/calendar.svg";

import ListLocation from "./location/";
import { Styles } from "./ListItem.module";

export function ListItem({ item, onPressElement, navigation }) {
  // const [localisation, setLocalisation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [typesCasier, setTypesCasier] = useState(0);
  const [typesCasierValue, setTypesCasierValue] = useState([]);
  const [lengthLockers, setLengthLockers] = useState(1);
  const [depot, setDepot] = useState("");
  const [retrait, setRetrait] = useState("");
  const [getDataLocker, setGetDataLocker] = useState([]);
  const [userLocal, setUserLocal] = useState([]);
  const [firstnameLocal, setFirstnameLocal] = useState("");
  const [idLocal, setLocalId] = useState("");
  const [openStripe, setOpenStripe] = useState(false);

  const tCasier = [
    { value: 0, label: "Types de casier" },
    { value: 1, label: "Casier Vélo" },
    { value: 2, label: "Casier Sac à dos" },
  ];

  useEffect(() => {
    deviceStorage
      .getMyObject()
      .then(async (item) => await setUserLocal([item]));
    userLocal.map(
      (item) => setFirstnameLocal(item.firstname),
      setLocalId(item.id)
    );
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
        setOpenStripe(true);
      })
      .catch((err) => {
        console.log("Reservers fail", err);
      });
  };

  //DatePicker
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

  return isOpen == true ? (
    openStripe == true ? (
      <StripeCheckouts nameProduct="Marcus" unitAmount={200} />
    ) : (
      <View style={Styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "-12%",
          }}
        >
          <TouchableOpacity onPress={() => setIsOpen(false)}>
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
                    ? (moment().locale("fr"),
                      moment(depot).format("D MMMM YYYY"))
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
        <View
          style={{ display: "flex", flexDirection: "row", marginTop: "5%" }}
        >
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
                      : (setTypesCasier(values),
                        setTypesCasierValue(["lockers"]))
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
    )
  ) : (
    <ListLocation
      setIsOpen={setIsOpen}
      onPressElement={onPressElement}
      item={item}
    />
  );
}
