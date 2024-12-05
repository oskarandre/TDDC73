import React, { useState, useRef } from "react";
import { View, TextInput, Button, StyleSheet, Animated } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CardFront from "../../components/cardFront";
import CardBack from "../../components/cardBack";

const CardPayment = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardType, setCardType] = useState("visa");
  const [cvv, setCvv] = useState("");
  const [isCvvFocused, setIsCvvFocused] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (cardNumber.startsWith("4")) {
      setCardType("visa");
    } else if (cardNumber.startsWith("34") || cardNumber.startsWith("37")) {
      setCardType("amex");
    } else if (cardNumber.startsWith("5") && cardNumber[1] < "6") {
      setCardType("mastercard");
    } else if (cardNumber.startsWith("6011")) {
      setCardType("discover");
    } else if (cardNumber.startsWith("9792")) {
      setCardType("troy");
    } else {
      setCardType("visa");
    }
    console.log(cardType);
  }, [cardNumber]);

  const handleFocus = () => {
    setIsCvvFocused(true);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsCvvFocused(false);
    Animated.timing(spinValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const frontSpin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backSpin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Animated.View style={[styles.card, { transform: [{ rotateY: frontSpin }] }]}>
          <CardFront
            cardNumber={cardNumber}
            cardHolder={cardHolder}
            cardExpires={`${selectedMonth}/${selectedYear}`}
            cardType={cardType}
          />
        </Animated.View>
        <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backSpin }] }]}>
          <CardBack cvv={cvv} cardType={cardType} />
        </Animated.View>
      </View>
      <View style={styles.whiteBox}>
        <TextInput
          style={styles.inputNumber}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text.replace(/[^0-9]/g, ""))}
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
            style={[styles.picker, { flex: 1 }]}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)
            
            }
          >
            <Picker.Item label="MM" value="" />
            {Array.from({ length: 12 }, (_, i) => (
              <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>

            <Picker
              selectedValue={selectedYear}
              style={[styles.picker, { flex: 1 }]}
              onValueChange={(itemValue) => setSelectedYear(itemValue)}
            >
              <Picker.Item label="YY" value="" />
              {Array.from({ length: 8 }, (_, i) => (
                <Picker.Item key={i} label={`${2023 + i}`} value={`${2023 + i}`} />
              ))}
            </Picker>

          <TextInput
            style={[styles.input, styles.smallInput]}
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={4}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.submitBtn}>
          <Button title="Submit" onPress={() => {}} />
        </View>
      </View>
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
  cardContainer: {
    position: "relative",
    width: 300,
    height: 200,
    zIndex : 10,
    marginBottom: -70,
  },
  card: {
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  cardBack: {
    transform: [{ rotateY: "180deg" }],
  },
  whiteBox: {
    width: "95%",
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
    alignItems: "center",
    width: "100%",
  },
  smallInput: {
    width: "25%",
    marginEnd: 0,
  },
  picker:{
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 0,
    backgroundColor: "#fff",
    
  },
  submitBtn: {
    width: "100%",
    borderRadius: 10,
  },
});

export default CardPayment;