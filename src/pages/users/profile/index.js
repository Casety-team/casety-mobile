import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { isLoadingToken } from "../../../../actions/isLoadingToken";
import deviceStorage from "../../../services/deviceStorage";
import { View, Text, Alert } from "react-native";
import axios from "axios";
import { SvgXml } from "react-native-svg";

import { InputUnderLineText } from "../../../components/Input";
import ButtonCirle from "../../../components/Button";
import { Styles } from "./profile.modules";

import user from "./pictures/user.svg";
import valid from "../pictures/valid.svg";
import button_back_white from "../../../assets/app/button_back.svg";

const Profile = ({ navigation }) => {
  const [data, setData] = useState([]);

  //Get AsyncStorage for
  const [id, setId] = useState(1);
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [isSelection, setSelection] = useState(false);

  useEffect(() => {
    refreshUser();
  }, []);

  const handleUpdate = () => {
    //Request POST for register
    if (first.length === 0) {
      setFirst(first);
    } else if (last.length === 0) {
      setLast(last);
    } else if (email.length === 0) {
      setEmail(email);
    } else if (phone.length === 0) {
      setPhone(phone);
    } else if (adress.length === 0) {
      setAdress(adress);
    } else if (city.length === 0) {
      setCity(city);
    } else if (codePostal.length === 0) {
      setCodePostal(codePostal);
    }
    axios
      .put("https://api.casety.fr/api/user/" + id, {
        firstname: first,
        lastname: last,
        email: email,
        phone: phone,
        adress: adress,
        city: city,
        zip: codePostal,
      })
      .then(() => {
        alert(`Le profil ${first} ${last} à bien été modifié !`);
        setSelection(false);
        refreshUser();
        navigation.navigate("Profile");
      })
      .catch((error) => {
        //Error poster error
        console.log("An error occurred during registration =>", error);
      });
  };

  const refreshUser = () => {
    axios
      .get(`https://api.casety.fr/api/user/${id}`)
      .then(async (item) => {
        setData([item.data]);
        setId(item.data.id);
        setEmail(item.data.email);
        setFirst(item.data.firstname);
        setLast(item.data.lastname);
        setPhone(item.data.phone);
        setCity(item.data.city);
        setAdress(item.data.adress);
        setCodePostal(item.data.zip);
      })
      .catch((err) => {
        console.log("User fail", err);
      });
  };

  return (
    <View style={Styles.container}>
      <View>
        <View style={[Styles.contentEllipse, { flex: 1 }]}>
          <SvgXml
            style={{
              flex: 4,
              marginLeft: 20,
              marginTop: 50,
            }}
            xml={button_back_white}
            onPress={() => navigation.navigate("Home")}
          />
          <SvgXml style={Styles.svgCenter} xml={user} />
        </View>
      </View>
      <View style={Styles.card}>
        <View style={Styles.content}>
          {data.map((item, index) => {
            return (
              <View key={index}>
                <Text style={Styles.title}>Profil</Text>
                <Text style={Styles.subTitle}>
                  {item.firstname} {item.lastname}
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    marginLeft: 50,
                    marginRight: 50,
                  }}
                >
                  <View>
                    <Text style={Styles.inputTitle}>Adresse Email</Text>
                    <View style={[Styles.row, { color: "white" }]}>
                      {isSelection ? (
                        <InputUnderLineText
                          placeholder={item.email}
                          defaultValue={item.email}
                          autoCapitalize="none"
                          onChangeText={(text) => setEmail(text)}
                        />
                      ) : (
                        <Text style={{ width: 285, marginTop: 10 }}>
                          {item.email}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={Styles.spaceInput}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <View style={{ width: "40%" }}>
                        <Text style={Styles.inputTitle}>Prénom</Text>
                        <View style={Styles.row}>
                          {isSelection ? (
                            <InputUnderLineText
                              placeholder={item.firstname}
                              defaultValue={item.firstname}
                              onChangeText={(text) => setFirst(text)}
                            />
                          ) : (
                            <Text style={{ width: 120, marginTop: 10 }}>
                              {item.firstname}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={{ width: "40%", marginLeft: "20%" }}>
                        <Text style={Styles.inputTitle}>Nom</Text>
                        <View style={Styles.row}>
                          {isSelection ? (
                            <InputUnderLineText
                              placeholder={item.lastname}
                              defaultValue={item.lastname}
                              onChangeText={(text) => setLast(text)}
                            />
                          ) : (
                            <Text style={{ width: 120, marginTop: 10 }}>
                              {item.lastname}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={Styles.inputTitle}>Adresse</Text>
                    <View style={Styles.row}>
                      {isSelection ? (
                        <>
                          <InputUnderLineText
                            placeholder={item.adress}
                            defaultValue={item.adress}
                            autoCapitalize="none"
                            onChangeText={(text) => setAdress(text)}
                          />
                          {adress.length > 5 && (
                            <SvgXml
                              width="20"
                              height="20"
                              xml={valid}
                              style={[Styles.icon_success, { fill: "black" }]}
                            />
                          )}
                        </>
                      ) : (
                        <Text style={{ width: 285, marginTop: 10 }}>
                          {item.adress}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={Styles.spaceInput}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <View style={{ width: "40%" }}>
                        <Text style={Styles.inputTitle}>Ville</Text>
                        <View style={Styles.row}>
                          {isSelection ? (
                            <>
                              <InputUnderLineText
                                placeholder={item.city}
                                defaultValue={item.city}
                                autoCapitalize="none"
                                onChangeText={(text) => setCity(text)}
                              />
                              {city.length > 1 && (
                                <SvgXml
                                  width="20"
                                  height="20"
                                  xml={valid}
                                  style={[
                                    Styles.icon_success,
                                    { fill: "black" },
                                  ]}
                                />
                              )}
                            </>
                          ) : (
                            <Text style={{ width: 120, marginTop: 10 }}>
                              {item.city}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={{ width: "40%", marginLeft: "20%" }}>
                        <Text style={Styles.inputTitle}>Code Postale</Text>
                        <View style={Styles.row}>
                          {isSelection ? (
                            <>
                              <InputUnderLineText
                                placeholder={item.zip}
                                defaultValue={item.zip}
                                keyboardType="phone-pad"
                                onChangeText={(text) => setCodePostal(text)}
                              />
                              {codePostal.length > 1 && (
                                <SvgXml
                                  width="20"
                                  height="20"
                                  xml={valid}
                                  style={[
                                    Styles.icon_success,
                                    { fill: "black" },
                                  ]}
                                />
                              )}
                            </>
                          ) : (
                            <Text style={{ width: 120, marginTop: 10 }}>
                              {item.zip}
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={[Styles.spaceInput, { marginBottom: 30 }]}>
                    <Text style={Styles.inputTitle}>Numéro de téléphone</Text>
                    <View style={Styles.row}>
                      {isSelection ? (
                        <>
                          <View style={{ width: 285 }}>
                            <InputUnderLineText
                              placeholder={item.phone}
                              defaultValue={item.phone}
                              keyboardType="phone-pad"
                              onChangeText={(defaultValuePhone) =>
                                setPhone(defaultValuePhone)
                              }
                            />
                          </View>
                          {phone.length == 10 && (
                            <SvgXml
                              width="20"
                              height="20"
                              xml={valid}
                              style={[Styles.icon_success]}
                            />
                          )}
                        </>
                      ) : (
                        <Text style={{ width: 285, marginTop: 10 }}>
                          {item.phone}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View>
                    {!isSelection ? (
                      <ButtonCirle
                        navigation={() => setSelection(true)}
                        name="Modifier mon profil"
                        arrowSpace={15}
                        width={225}
                      />
                    ) : (
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "100%" }}>
                          <View style={Styles.rowButton}>
                            <View style={{ width: "40%", marginLeft: -40 }}>
                              <ButtonCirle
                                navigation={() => setSelection(false)}
                                name="Annuler"
                                arrowSpace={15}
                                width={150}
                              />
                            </View>
                            <View style={{ width: "40%", marginLeft: 40 }}>
                              <ButtonCirle
                                navigation={() => handleUpdate()}
                                name="Sauvegarder"
                                arrowSpace={10}
                                width={150}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Profile;
