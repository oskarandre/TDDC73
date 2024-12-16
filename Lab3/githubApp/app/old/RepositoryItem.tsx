import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Repository {
  name: string;
  owner: {
    login: string;
  };
  stargazerCount: number;
  description?: string;
}

const RepositoryItem = ({ repository }: { repository: Repository }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{repository.name}</Text>
      <Text style={styles.owner}>Owner: {repository.owner.login}</Text>
      <Text style={styles.stars}>⭐ {repository.stargazerCount} stars</Text>
      {repository.description && (
        <Text style={styles.description}>{repository.description}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  owner: {
    color: '#555',
  },
  stars: {
    marginTop: 8,
    color: '#333',
  },
  description: {
    marginTop: 4,
    color: '#666',
  },
});

export default RepositoryItem;
