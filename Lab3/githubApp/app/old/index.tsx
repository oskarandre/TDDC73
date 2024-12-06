import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { ApolloProvider, useQuery } from '@apollo/client';
import { client } from '../apolloClient'; // Import your Apollo Client setup
import { GET_POPULAR_REPOSITORIES } from '../queries';
import RepositoryItem from '../RepositoryItem';

const App = () => {
  const { data, loading, error } = useQuery(GET_POPULAR_REPOSITORIES);

  if (loading) return <Text style={styles.text}>Loading...</Text>;
  if (error) return <Text style={styles.text}>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.search.edges}
        keyExtractor={(item) => item.node.id}
        renderItem={({ item }) => (
          <RepositoryItem repository={item.node} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
  },
});

const Main = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Main;
