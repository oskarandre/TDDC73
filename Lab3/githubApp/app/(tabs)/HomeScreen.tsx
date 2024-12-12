import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import TrendingRepos from "../TrendingRepos";
import { Picker } from "@react-native-picker/picker";
import { apiKey } from "../secrets/token.js";
import { Ionicons } from "@expo/vector-icons";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${apiKey}`,
  },
});

export default function HomeScreen() {
  const [value, setValue] = useState("all");
  const [sortOption, setSortOption] = useState("stars");
  const [dateRange, setDateRange] = useState("monthly");
  const [items, setItems] = useState([
    { label: "All Languages", value: "all" },
    { label: "Python", value: "python" },
    { label: "HTML", value: "html" },
    { label: "Kotlin", value: "kotlin" },
    {label: "XML", value: "xml"},
    { label: "C#", value: "c#" },
    { label: "C++", value: "c++" },
    { label: "CSS", value: "css" },
    { label: "Java", value: "java" },
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
  ]);
  const [sortBy, setSortBy] = useState([
    { label: "Stars", value: "stars" },
    { label: "Forks", value: "forks" },
    { label: "Updated", value: "updated" },
  ]);
  const [dateRanges, setDateRanges] = useState([
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        {/* ===================NavBar ====================*/}
        <View style={styles.navBar}>
        <View style={styles.repoTitle}>
          <Text style={{ color: "white", fontSize: 25, fontWeight:"500"}}>Top Repos</Text>
        </View>

        <StatusBar />

        {/* Filter button to make menue visable */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <View style={{ flexDirection: "row", alignItems:"center" }}>
          <Ionicons name="menu" color="white" size={14} />
          <Text style={{ color: "white" }}>  Filters</Text>
          </View>
        </TouchableOpacity>

        {/* Modal for filters if modalVisable is true */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={{ color: "white", fontSize: 18 }}>Filters</Text>

                  <View style={styles.filterBox}>
                    <Text style={{ color: "white" }}>Language:</Text>
                    <Picker
                      selectedValue={value}
                      onValueChange={(itemValue) => setValue(itemValue)}
                    >
                      {items.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                    </Picker>
                  </View>

                  <View style={styles.filterBox}>
                    <Text style={{ color: "white" }}>Date Range:</Text>
                    <Picker
                      selectedValue={dateRange}
                      onValueChange={(itemValue) => setDateRange(itemValue)}
                    >
                      {dateRanges.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                    </Picker>
                  </View>

                  <View style={styles.filterBox}>
                    <Text style={{ color: "white" }}>Sort By:</Text>
                    <Picker
                      selectedValue={sortOption}
                      onValueChange={(itemValue) => setSortOption(itemValue)}
                    >
                      {sortBy.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                    </Picker>
                  </View>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={{ color: "white" }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        </View>
        {/* ===================Display repos ====================*/}
        <TrendingRepos lang={value} sortOption={sortOption} dateRange={dateRange} />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1117",
  },
  filterButton: {
    width: 100,
    backgroundColor: "#151B23",
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 100,
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#151B23",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  filterBox: {
    width: "100%",
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  repoTitle: {
    alignItems: "center",
    marginTop: 10,
  },
  navBar: {
    backgroundColor: "#151B23",
  },
});