import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import CardLogo from './cardLogo';

interface CardBackProps {
  cardType: string;
  cvv: string;
}

const CardBack: React.FC<CardBackProps> = ({ cvv, cardType }) => {
  const backgroundImage = require('C:/Users/oskar/Documents/GitHub/TDDC73/Lab2/cardApp/assets/images/25.jpeg');

  return (
    <View style={styles.shadowContainer}>
      <ImageBackground source={backgroundImage} style={styles.card} imageStyle={{ borderRadius: 10 }}>
        <View style={styles.magneticStrip} />
        <Text style={styles.cvvLabel}>CVV</Text>
        <View style={styles.cvvContainer}>
          <Text style={styles.cvv}>{'*'.repeat(cvv.length)}</Text>
        </View>
        {/* Import logo that changes */}
        <CardLogo cardType={cardType}/>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    borderRadius: 10,
    backgroundColor: 'transparent',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  card: {
    padding: 0,
    borderRadius: 10,
    width: 300,
    height: 200,
    justifyContent: 'space-between',
  },
  magneticStrip: {
    height: 40,
    width: '100%',
    backgroundColor: '#000',
    marginTop: 20,
  },
  cvvContainer: {
    marginTop: -10,
    width: '95%',
    height: 35,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'center',
  },
  cvvLabel: {
    marginTop: -5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 260,
  },
  cvv: {
    fontSize: 20,
    color: '#000',
    textAlign: 'right',
  },
});

export default CardBack;