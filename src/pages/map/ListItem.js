import React, { useState, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import SelectInput from "react-native-select-input-ios";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import axios from "axios";
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
import deviceStorage from "../../services/deviceStorage";
import { default as logo } from "../../../assets/app/dark_logo.png";
import direction from "../../assets/app/direction.svg";
import arrow from "../../assets/app/arrow.svg";
import arrowBack from "../../assets/app/arrow-back.svg";
//import geolocal from "../../assets/app/geolocal.svg";
import calendar from "../../assets/app/calendar.svg";
import StripeCheckout from "./stripe/StripeCheckout";

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
      .get(`http://api.casety.fr/api/lockers/`, {
        timeout: 9000,
      })
      .then((res) => {
        res.data.map((data) => {
          typesCasierValue.filter((type) => {
            axios
              .get(`http://api.casety.fr/api/locker_types/types/${type}`, {
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
        "http://api.casety.fr/api/reservers",
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

  const onPaymentSuccess = (token) => {
    console.log(token);
  };

  const onClose = () => {
    // maybe navigate to other screen here?
  };

  return isOpen == true ? (
    openStripe == true ? (
      <View>
        <StripeCheckout
          publicKey="pk_test_51I6xfpGWsM2bVeof75ZGYq7KXzLoNhta0xQFMtwbOZTz6sQKE2200cc7J8QoeGXkILPAve6Wl1zdLRL1TBFaGaQZ00k7zmJZhm"
          amount={100000}
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Flag_of_the_Schutzstaffel.svg/1200px-Flag_of_the_Schutzstaffel.svg.png"
          storeName="Stripe Checkout"
          description="Test"
          currency="USD"
          allowRememberMe={false}
          prepopulatedEmail="test@test.com"
          onClose={onClose}
          onPaymentSuccess={onPaymentSuccess}
        />
      </View>
    ) : (
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
            <Text style={styles.title}>Bonjour {firstnameLocal}</Text>
            <Text style={styles.subTitle}>
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
                style={styles.input}
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
                style={styles.input}
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
    )
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
