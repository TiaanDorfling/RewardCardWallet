import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import UploadImageButton from "@/components/UploadImageButton";

// Define the type for your component's props
interface DisplayRewardCardProps {
  cardName: string;
}

export default function DisplayRewardCard({ cardName } : DisplayRewardCardProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.cardName}>Card Name: {cardName}</Text>
            <UploadImageButton />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "white",
    width: 250,
    height: 350,
    borderRadius: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
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