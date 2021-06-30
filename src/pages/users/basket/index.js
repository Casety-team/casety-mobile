import React, { useState, useEffect } from "react";
import { Image, View, Text, FlatList } from "react-native";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";
import deviceStorage from "../../../services/deviceStorage";

import { Styles } from "./basket.modules";

import profilCity from "./pictures/profilCity.jpeg";

const Basket = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [reserverId, setReserverId] = useState("");
  const [dataReserver, setDataReserver] = useState("");
  const [id, setId] = useState();

  useEffect(() => {
    deviceStorage.getMyObject().then(async (item) => {
      await setId(item.id);
    });
  }, []);

  useEffect(() => {
    data.map((r) => setReserverId(r.reserverId));
  }, []);

  useEffect(() => {
    axios
      .get(`http://api.casety.fr/api/reservers/baskets/${id}`)
      .then((item) => {
        setData(item.data);
      })
      .catch((err) => {
        console.log("User fail", err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://api.casety.fr/api/reservers/${reserverId}`)
      .then((item) => {
        setDataReserver(item.data);
      })
      .catch((err) => {
        console.log("User fail", err);
      });
  }, [reserverId]);

  return (
    <View style={Styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) =>
          item.map(
            (r) =>
              r.pay !== "false" && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingBottom: 10,
                    borderBottomWidth: 2,
                    borderBottomColor: "#486CB5",
                    marginTop: 10,
                  }}
                >
                  <View style={Styles.row}>
                    <Image style={Styles.tinyLogo} source={profilCity} />
                    <View style={{ display: "flex", flexDirection: "row" }}>
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
                        <Text style={Styles.code}>{r.code_secure}</Text>
                        <Text style={{ marginTop: 10 }}>n°{r.id}</Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Text style={{ marginTop: 10 }}>
                            Du{" "}
                            <Text style={{ color: "red" }}>
                              {moment(dataReserver.date_start).format(
                                "DD/MM/YYYY hh:mm"
                              )}
                            </Text>{" "}
                            au{" "}
                            <Text style={{ color: "green" }}>
                              {moment(dataReserver.date_end).format(
                                "DD/MM/YYYY hh:mm"
                              )}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontWeight: "bold",
                            marginTop: 17,
                            marginLeft: -130,
                            color: "#000000",
                            fontSize: 15,
                            alignItems: "stretch",
                          }}
                        >
                          {r.pay === "false" ? (
                            <Text style={{ color: "red" }}>
                              Erreur de payement
                            </Text>
                          ) : (
                            <View>
                              <Text style={{ color: "green" }}>
                                Payement réussi
                              </Text>
                              <Text>
                                {r.price
                                  .toString()
                                  .substr(0, r.price.toString().length - 2)}
                                ,00€
                              </Text>
                            </View>
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
          )
        }
      />
    </View>
  );
};

export default Basket;
