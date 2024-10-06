// My references for this assignment: Youtube, Course website, React Native Documentation(reactnative.dev), multiple in-class exercises, Class notes, google, Professor Shoaib, Stack Overflow.
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import Icon from "react-native-vector-icons/Ionicons";

export default function App() {
  const [users, myUsers] = useState([]);
  const [refreshing, myRefresh] = useState(false);

  const fetchMyUsers = async () => {
    try {
      const response = await fetch(
        "https://random-data-api.com/api/v2/users?size=10" //fetching 10 users
      );
      const data = await response.json();
      myUsers(data);
    } catch (error) {
      console.error("Error cannot fetch the users", error);
    }
  };

  const fetchOneUser = async () => {
    try {
      const response = await fetch(
        "https://random-data-api.com/api/v2/users?size=1" //fetching 1 user
      );
      const data = await response.json();
      myUsers((prevUsers) => [data, ...prevUsers]);
    } catch (error) {
      console.error("Error, cannot load new user", error);
    }
  };
  useEffect(() => {
    fetchMyUsers();
  }, []);

  const onRefresh = () => {
    myRefresh(true);
    fetchMyUsers().then(() => myRefresh(false));
  };

  const displayProfile = ({ item }) => (
    <View style={styles.item}>
      {Platform.OS === "android" && ( //platform specific code for android
        <UserAvatar
          size={50}
          name={`${item.first_name} ${item.last_name}`}
          src={item.avatar}
        />
      )}
      <View style={styles.namesContainer}>
        <Text style={styles.firstName}>{item.first_name}</Text>
        <Text style={styles.lastName}>{item.last_name}</Text>
      </View>
      {Platform.OS === "ios" && ( //platform specific code for ios
        <UserAvatar
          size={50}
          name={`${item.first_name} ${item.last_name}`}
          src={item.avatar}
        />
      )}
    </View>
  );

  return (
    //created a welcome message and a message to show who created the app at the top of the app.
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to my React Native App</Text>
      <Text style={styles.create}>Created by: Ahmed Wardhere</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={displayProfile}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity style={styles.fab} onPress={fetchOneUser}>
        <Icon name="add-circle" size={70} color="green" />
      </TouchableOpacity>
    </View>
  );
} //

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  welcome: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 14,
    fontWeight: "bold",
    color: "#61dafb",
  },
  create: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#61dafb",
  },
  item: {
    flexDirection: "row",
    padding: 18,
    borderBottomWidth: 8,
    borderBottomColor: "lightgrey",
  },
  namesContainer: {
    flex: 1,
    paddingHorizontal: 35,
  },
  firstName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastName: {
    fontSize: 16,
    color: "black",
  },
  fab: {
    position: "absolute",
    zIndex: 10,
    right: 35,
    bottom: 22,
  },
});
