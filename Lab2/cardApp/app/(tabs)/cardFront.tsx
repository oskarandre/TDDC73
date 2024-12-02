import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import CardLogo from './cardLogo';



interface CardFrontProps {
    cardNumber: string;
    cardHolder: string;
    cardExpires: string;
}

const CardFront: React.FC<CardFrontProps> = ({ cardNumber, cardHolder, cardExpires}) => {
    const backgroundImage = require('C:/Users/oskar/Documents/GitHub/TDDC73/Lab2/cardApp/assets/images/25.jpeg');

    const [cardType, setCardType] = React.useState('visa');

    React.useEffect(() => {
        if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
            setCardType('amex');
        }
        if (cardNumber.startsWith('4')) {
            setCardType('visa');
        }
        if (cardNumber.startsWith('5') && cardNumber[1] < '6') {
            setCardType('mastercard');
        }
        if (cardNumber.startsWith('6011')) {
            setCardType('discover');
        }
        if (cardNumber.startsWith('9792')) {
            setCardType('troy');
        }
    }, [cardNumber]); 


    const formatCardNumber = (number: string) => {
        if (cardType === 'amex') {
          const formattedNumber = number.padEnd(15, '#').replace(/(.{4})(.{6})(.{5})/, '$1 $2 $3').trim();
          return formattedNumber;
        }else{
        const formattedNumber = number.padEnd(16, '#').replace(/(.{4})/g, '$1 ').trim();
        return formattedNumber;
        }
      };

    return (
    <View style={styles.shadowContainer}>
        <ImageBackground source={backgroundImage} style={styles.card} imageStyle={{ borderRadius: 10 }}>
            <CardLogo cardType={cardType}/>
            <Text style={styles.cardNumber}>{formatCardNumber(cardNumber)}</Text>
            <Text style={styles.cardHolder}>Card Holder: {cardHolder}</Text>
            <Text style={styles.cardExpires}>Expires {cardExpires}</Text>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    shadowContainer: {
        borderRadius: 10, // Ensure shadow follows card shape
        backgroundColor: 'transparent', // Prevent shadow container from showing background
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
        padding: 20,
        borderRadius: 10,
        width: 300,
        height: 200,
        justifyContent: 'space-between',


  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardHolder: {
    fontSize: 16,
    color: '#fff',
  },
  cardExpires: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CardFront;