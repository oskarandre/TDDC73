import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import TrendingRepos from "../TrendingRepos";
import { Picker } from "@react-native-picker/picker";
import { apiKey } from "../secrets/token.js";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${apiKey}`,
  },
});

console.log(apiKey);
export default function HomeScreen() {
  const [value, setValue] = useState("all");
  const [sortOption, setSortOption] = useState("stars");
  const [dateRange, setDateRange] = useState("monthly");
  const [items, setItems] = useState([
    { label: "All Languages", value: "all" },
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Python", value: "python" },
    { label: "C#", value: "c#" },
    { label: "CSS", value: "css" },
    { label: "Ruby", value: "ruby" },
    { label: "Java", value: "java" },
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

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <StatusBar />

        <View style={styles.filterContainer}>
          <View style ={styles.filterBox}>
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

          <View style ={styles.filterBox}>
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

          <View style ={styles.filterBox}>
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

        </View>

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
  filterBox: {
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gray",
    //borderRadius: 5,
    backgroundColor: "#151B23",
    //marginTop: 10,
    //marginHorizontal: 10,
    //borderBottomWidth: 20,
  },
});