import React from "react";
import { View, StyleSheet, Image } from 'react-native';

interface CardLogoProps {
  cardType: string;
}

const CardLogo: React.FC<CardLogoProps> = ({ cardType }) => {
  const cardLogos: { [key: string]: any } = {
    amex: require('C:/Users/oskar/Documents/GitHub/TDDC73/Lab2/cardApp/assets/images/amex.png'),
    visa: require('C:/Users/oskar/Documents/GitHub/TDDC73/Lab2/cardApp/assets/images/visa.png'),
    mastercard: require('C:/Users/oskar/Documents/GitHub/TDDC73/Lab2/cardApp/assets/images/mastercard.png'),
    discover: require('C:/Users/oskar/Documents/GitHub/TDDC73/Lab2/cardApp/assets/images/discover.png'),
    troy: require('C:/Users/oskar/Documents/GitHub/TDDC73/Lab2/cardApp/assets/images/troy.png'),
    default: require('C:/Users/oskar/Documents/GitHub/TDDC73/Lab2/cardApp/assets/images/visa.png'),
  };

  const cardLogo = cardLogos[cardType] || cardLogos['default'];

  return (
    <View style={styles.logoContainer}>
      <Image source={cardLogo} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'flex-end',
  },
  logo: {
    width: 80,
    height: 40,
  },
});

export default CardLogo;