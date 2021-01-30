import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
// import { useDispatch, useSelector } from "react-redux";

// import { getRecipes } from "../src/redux/selectors";
// import { fetchAllLocations } from "../src/api/locations";

// import RecipeListItem from "../src/Components/locations/TemplateLocationListItem";

const Home = () => {
  // const dispatch = useDispatch();
  // const recipes = useSelector(getRecipes);
  // useEffect(() => {
  //   fetchAllLocations(dispatch);
  // }, []);

  // const _renderItem = ({ item }) => {
  //   return <RecipeListItem item={item} />;
  // };

  // return (
  //   <View>
  //     <FlatList
  //       keyExtractor={(item) => item.toString()}
  //       data={recipes}
  //       renderItem={_renderItem}
  //     />
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
export default Home;
