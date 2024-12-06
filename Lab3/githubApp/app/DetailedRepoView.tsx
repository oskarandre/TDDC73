import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function DetailedRepoView({ route }: any) {
  const { project } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{project.node.name}</Text>
      <Text style={styles.description}>{project.node.description}</Text>
      <Text style={styles.detail}>Owner: {project.node.owner.login}</Text>
      <Text style={styles.detail}>Stars: {project.node.stargazers.totalCount}</Text>
      <Text style={styles.detail}>Forks: {project.node.forks.totalCount}</Text>
      <Text style={styles.detail}>Created At: {new Date(project.node.createdAt).toLocaleDateString()}</Text>
      {/* <Text style={styles.detail}>Commits: {project.node.defaultBranchRef.target.history.totalCount}</Text> */}
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
});