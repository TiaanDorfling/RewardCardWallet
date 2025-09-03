import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import UploadBarcode from '@/components/UploadBarcode';

// Define the type for your component's props
interface DisplayRewardCardProps {
  cardName: string;
  barcode: string;
}

export default function DisplayRewardCardBarcode({ cardName, barcode } : DisplayRewardCardProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.cardName}>Card Name: {cardName}</Text>
            <UploadBarcode cardName={cardName} barcode={barcode}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#c4e9faff",
    width: 250,
    height: 350,
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "#4dc7ffff",
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  cardName: {
    color: "black",
    marginBottom: 1,
  }
});