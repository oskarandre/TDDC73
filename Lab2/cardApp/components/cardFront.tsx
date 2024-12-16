import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated } from 'react-native';
import CardLogo from './cardLogo';



interface CardFrontProps {
    cardNumber: string;
    cardHolder: string;
    cardExpires: string;
    cardType: string;
}

const CardFront: React.FC<CardFrontProps> = ({ cardNumber, cardHolder, cardExpires, cardType}) => {
    // had to do this to get the image to work
    const backgroundImage = require('C:/Users/oskar/Documents/GitHub/TDDC73/Lab2/cardApp/assets/images/25.jpeg');

    // format card number and different if it is amex 
    const formatCardNumber = (number: string) => {
        if (cardType === 'amex') {
          const formattedNumber = number.padEnd(15, '#').replace(/(.{4})(.{6})(.{5})/, '$1    $2    $3').trim();
          return formattedNumber;
        }else{
        const formattedNumber = number.padEnd(16, '#').replace(/(.{4})/g, '$1    ').trim();
        return formattedNumber;
        }
      };

    

    return (
    <View style={styles.shadowContainer}>
        <ImageBackground source={backgroundImage} style={styles.card} imageStyle={{ borderRadius: 10 }}>
            <ImageBackground
              // had to do this to get the image to work
              source={require('C:/Users/oskar/Documents/GitHub/TDDC73/Lab2/cardApp/assets/images/chip.png')}
              style={styles.chip}
              resizeMode="contain"
            />
            {/* Import card logo that changes depending on what brand */}
            <CardLogo cardType={cardType}/>
            
            <Text style={styles.cardNumber}>{formatCardNumber(cardNumber)}</Text>
            <Text style={styles.cardHolder}>
                <Text style={styles.cardHolderLabel}>Card Holder</Text>
                <Text style={styles.cardHolderWrite}>{'\n'}{cardHolder ? cardHolder.toUpperCase() : 'FULL NAME'}</Text>
            </Text>

            <Text style={styles.cardExpires}>
            <Text style={styles.expireLable}>Expires {'\n'}</Text>
              <Text>
                    {(() => {
                  const [month = 'MM', year = 'YY'] = cardExpires.split('/');
                  const formattedMonth = month.trim() || 'MM';
                  const formattedYear = year.slice(-2) || 'YY';
                  return `${formattedMonth}/${formattedYear}`;
                })()}
              </Text>
            </Text>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
      borderRadius: 10,
      backgroundColor: 'transparent',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 9 },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,
      elevation: 18,
  },
  card: {
      borderRadius: 10,
      width: 300,
      height: 200,
  },
  chip: {
      position: 'absolute',
      top: 20,
      left: 20,
      width: 45,
      height: 40,
  },
  cardLogo: {
      position: 'absolute',
      top: 20,
      right: 10,
  },
  cardNumber: {
      fontFamily: 'sans-serif',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginTop: 25,
  },
  cardHolder: { 
      position: 'absolute',
      bottom: 20,
      left: 20,
      width: 200,
      fontSize: 16,
      color: '#fff',
  },
  cardHolderLabel: {
    fontSize: 12,
    color: '#fff',
  },
  cardHolderWrite: {
    fontSize: 16,
    color: '#fff',
  },
  cardExpires: {
      position: 'absolute',
      width: 55,
      bottom: 20,
      right: 20,
      fontSize: 16,
      color: '#fff',
  },
  expireLable: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: '#fff',
  },
});

export default CardFront;

