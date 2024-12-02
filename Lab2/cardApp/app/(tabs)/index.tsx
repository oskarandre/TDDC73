import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CardFront from "./cardFront";

const CardPayment = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      {/* Card Display */}
      <CardFront
        cardNumber={cardNumber}
        cardHolder={cardHolder}
        cardExpires={`${selectedMonth}/${selectedYear}`}
      />
      </View>
      <View style={styles.whiteBox}>
      {/* Card Input Form */}
      <TextInput
        style={styles.inputNumber}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        maxLength={16}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Card Name"
        value={cardHolder}
        onChangeText={setCardHolder}
      />
      <View style={styles.row}>
        <Picker
          selectedValue={selectedMonth}
          style={[styles.input, styles.smallInput]}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          <Picker.Item label="Month" value="" />
          {Array.from({ length: 12 }, (_, i) => (
            <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedYear}
          style={[styles.input, styles.smallInput]}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          <Picker.Item label="Year" value="" />
          {Array.from({ length: 10 }, (_, i) => (
            <Picker.Item key={i} label={`${new Date().getFullYear() + i}`} value={`${new Date().getFullYear() + i}`} />
          ))}
        </Picker>

        <TextInput style={[styles.input, styles.smallInput]} placeholder="CVV" />
      </View>
      <Button title="Submit" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#e6f7ff",
    paddingTop: 40,
  },
  card: {
    marginBottom: -70, // Slight overlap with the white box
    zIndex: 10, // Ensures card stays above the white box
  },
  whiteBox: {
  
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    flexShrink: 1,
  },
  inputNumber: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    marginBlockStart: 100,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  smallInput: {
    width: "30%",
  },
});

export default CardPayment;