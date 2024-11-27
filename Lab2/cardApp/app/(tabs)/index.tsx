import React from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";



const CardPayment = () => {
  return (
    <View style={styles.container}>
      {/* Card Display */}
      <View style={styles.card}>
        <Text style={styles.cardNumber}>6011 2312 38## ####</Text>
        <Text style={styles.cardHolder}>Card Holder: AD SOYAD</Text>
        <Text style={styles.cardExpires}>Expires MM/YY</Text>
      </View>

      {/* Card Input Form */}
      <TextInput style={styles.input} placeholder="Card Number" />
      <TextInput style={styles.input} placeholder="Card Name" />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.smallInput]} placeholder="Month" />
        <TextInput style={[styles.input, styles.smallInput]} placeholder="Year" />
        <TextInput style={[styles.input, styles.smallInput]} placeholder="CVV" />
      </View>
      <Button title="Submit" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6f7ff",
    padding: 20,
  },
  card: {
    width: "90%",
    height: 200,
    backgroundColor: "#202046",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  cardNumber: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 2,
  },
  cardHolder: {
    color: "#fff",
    fontSize: 14,
  },
  cardExpires: {
    color: "#fff",
    fontSize: 14,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  smallInput: {
    width: "30%",
  },
});

export default CardPayment;
