import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function DetailedRepoView({ route }: any) {
  const project = route?.params?.project;

  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No project data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <View style={styles.item}>
        <Text style={styles.title}>{project.node.name}</Text>
        <Text style={styles.description}>{project.node.description}</Text>
        <Text style={styles.detail}>Owner: {project.node.owner.login}</Text>
        <Text style={styles.detail}>Stars: {project.node.stargazers.totalCount}</Text>
        <Text style={styles.detail}>Forks: {project.node.forks.totalCount}</Text>
        <Text style={styles.detail}>Created At: {new Date(project.node.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.detail}>Commits: {project.node.defaultBranchRef.target.history.totalCount}</Text>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0D1117",
   
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    color: "white",
    marginBottom: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  item: {
    width: "80%",
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
});