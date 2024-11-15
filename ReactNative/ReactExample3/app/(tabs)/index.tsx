import { Image, StyleSheet, Platform, View, TextInput } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import CustomButton from '@/components/CustomButton'; 

export default function HomeScreen() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <ThemedView style={styles.background}>
      <View style={styles.headerContainer}>
        <ThemedText style={styles.header}>Example 3: React Native</ThemedText>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/circle.png')}
          style={styles.image}
        />
      </View>

      <ThemedView style={styles.buttonContainer}>

        <ThemedView style={styles.buttonRow}>
          <CustomButton title="Button 1" onPress={() => {}} />
          <CustomButton title="Button 2" onPress={() => {}} />
        </ThemedView>

        <ThemedView style={styles.buttonRow}>
          <CustomButton title="Button 3" onPress={() => {}} />
          <CustomButton title="Button 4" onPress={() => {}} />
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.textInputContainer}>
        <ThemedText style={styles.label}>Email:</ThemedText>
        <TextInput
          style={[styles.textInput, isFocused && styles.textInputFocused]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#2D8577', 
    padding: 22,
    alignItems: 'flex-start',
  },
  background: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  imageContainer: {
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20, // Add space between the header and the image
  },
  buttonContainer: {
    backgroundColor: '#F5FCFF',
    flexDirection: 'column',
    gap: 32,
    marginBottom: 30,
  },
  buttonRow: {
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 64,
  },
  textInputContainer: {
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 8,
  },
  label: {
    marginRight: 8, 
  },
  textInput: {
    padding: 8,
    width: 290,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textInputFocused: {
    borderBottomColor: 'red',
  },
});