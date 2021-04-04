import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const Shop = () => {
  const [data, setData] = useState([]);

  //Get AsyncStorage for
  const [id, setId] = useState(8);

  useEffect(() => {
    refreshUser();
  });

  const refreshUser = () => {
    axios
      .get(`http://192.168.1.44:4545/api/user/${id}`, { timeout: 9000 })
      .then(async (item) => {
        setData([item.data]);
      })
      .catch((err) => {
        console.log("User fail", err);
      });
  };

  return (
    <View>
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

export default Shop;
