import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useBarcodeLogic } from '../hooks/useBarcodeLogic'; 
import { useFileSystemNames } from '@/hooks/useFileSystemNames';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Barcode } from 'expo-barcode-generator';
// Define the type for your component's props
interface Props {
  cardName: string;
  barcode: string;
}

export default function UploadBarcode({cardName, barcode}: Props) {
  // Use the custom hook to get state and functions
  const { deleteBarcode } = useBarcodeLogic(barcode);
  const {removeNameFromFile} = useFileSystemNames();

  return (
    <View style={styles.container}>

        <View style={styles.barcode}>
          <Barcode 
            value={barcode}
            options={{ format: 'EAN13', background: 'white' }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() =>{
            //needs to become edit barcode
          }}>
          <Icon name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>{
            removeNameFromFile(cardName)
            deleteBarcode(barcode)
          }}>
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
    // Style for the new button container
  buttonContainer: {
    flexDirection: 'row', // Key style: aligns children horizontally
    justifyContent: 'space-between', // Adds space between buttons
    width: 100, // Adjust width to control spacing
    marginTop: 10, // Adds some space below the image
  },
  barcode:{
    backgroundColor: "white", // Set a clear background for the barcode view
    marginTop: 15,
    padding: 10,
  }
});