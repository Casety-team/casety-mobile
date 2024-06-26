import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState([]);

  //Get AsyncStorage for
  const [id, setId] = useState(1);

  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = () => {
    axios
      .get(`https://api.casety.fr/api/user/${id}`)
      .then(async (item) => {
        setData([item.data]);
      })
      .catch((err) => {
        console.log("User fail", err);
      });
  };

  return (
    <View>
      <Text>Profile</Text>
      {data.map((item, index) => {
        return (
          <View key={index}>
            <Text style={{ marginTop: 50, marginLeft: 50 }}>
              {item.firstname} {item.lastname}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Profile;
