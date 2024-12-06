import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


interface TrendingReposProps {
  lang: string;
  sortOption: string;
  dateRange: string;
}

export default function TrendingRepos({ lang, sortOption, dateRange }: TrendingReposProps) {
  const navigation = useNavigation<any>();

  const GET_TRENDING_REPOS = gql`
    query GetTrendingRepos($query: String!) {
      search(query: $query, type: REPOSITORY, first: 20) {
        edges {
          node {
            ... on Repository {
              id
              name
              owner {
                login
              }
              stargazers {
                totalCount
              }
              description
              forks {
                totalCount
              }
              primaryLanguage {
                name
              }
              createdAt
              defaultBranchRef {
                target {
                  ... on Commit {
                    history {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const getDateRangeQuery = (range: string) => {
    const today = new Date();
    let startDate = new Date();

    switch (range) {
      case "daily":
        startDate.setDate(today.getDate() - 1);
        break;
      case "weekly":
        startDate.setDate(today.getDate() - 7);
        break;
      case "monthly":
        startDate.setMonth(today.getMonth() - 1);
        break;
      case "yearly":
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        startDate.setDate(today.getDate() - 1);
    }

    return `created:>${startDate.toISOString().split('T')[0]}`;
  };

  const { loading, error, data, refetch } = useQuery(GET_TRENDING_REPOS, {
    variables: { query: `language:${lang} sort:${sortOption}-desc ${getDateRangeQuery(dateRange)}` },
  });

  useEffect(() => {
    refetch();
  }, [lang, sortOption, dateRange]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.containerLoading]}>
        <ActivityIndicator size={100} color="#FBF2C0" />
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <View style={styles.errorMessage}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate("DetailedRepoView", { project: item });
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
        {item.node.name}
      </Text>
      <Text style={{ color: "white", fontSize: 14 }}>
        {item.node.description}
      </Text>
      <Text style={{ color: "white", fontSize: 14, fontStyle: "italic" }}>
      Language: {item.node.primaryLanguage?.name || "Unknown"}
    </Text>
    
      <View style={styles.detailsContainer}>
        
        <View style={styles.detailRow}>
          <Ionicons name="star-outline" color="white" size={14} />
          <Text style={styles.repoDetails}>
            {item.node.stargazers.totalCount}
          </Text>
        </View>

        <View style={styles.detailRow} >
          
            <View style={styles.forkAndDate}>
              <View style={styles.detailRow}>
                <AntDesign name="fork" size={14} color="white" />
                <Text style={styles.repoDetails}>{item.node.forks.totalCount}</Text>
              </View>
              
                <Text style={{ color: "white", fontSize: 12 }}>
                  Created on: {new Date(item.node.createdAt).toLocaleDateString()}
                </Text>
            </View>
          
        </View>
      </View>

      {/* <View style={{ flex: 1, alignSelf: 'flex-end'}}>
            <Text style={{ color: "white", fontSize: 12 }}>
              Created on: {new Date(item.node.createdAt).toLocaleDateString()}
            </Text>
      </View> */}

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data.search.edges}
        renderItem={renderItem}
        keyExtractor={(item) => item.node.id}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    marginBlockStart: 100,
  },
  errorMessage: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(117, 171, 188, 1)",
  },
  errorText: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 0,
  },
  item: {
    alignSelf:"center",
    width: Dimensions.get("window").width*0.8,
    marginBlockEnd: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 15,
    marginHorizontal: 30,
    borderRadius: 5,
    backgroundColor: "rgba(117, 171, 188, 0.3)",
    shadowColor: "#FBF2C0",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  detailsContainer: {
    
    alignItems: "flex-start",
    marginVertical: 5,
    marginHorizontal: 5,
    
  },
  detailRow: {
    
    flexDirection: "row",
    marginVertical: 3,
  },
  repoDetails: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
  },
  forkAndDate: {
    flex: 1,
    width: Dimensions.get("window").width*0.75,
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
});