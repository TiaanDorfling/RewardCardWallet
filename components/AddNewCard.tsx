import React, {useState}from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useFileSystemNames } from "@/hooks/useFileSystemNames";
import { useFileSystemBarcodes } from "@/hooks/useFileSystemBarcodes";
import { useImageLogic } from "@/hooks/useImageLogic";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
import { Barcode } from 'expo-barcode-generator';


export default function AddNewCard(){
  const { saveNamesToFile, loadNamesFromFile } = useFileSystemNames();
  const {saveCodesToFile, loadCodesFromFile} = useFileSystemBarcodes();
  const [names, setNames] = useState<string[]>([]);
  const [codes, setCodes] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  const [qrCodeInput, setQrCodeInput] = useState('');
  const {pickImage, openCamera} = useImageLogic();

    const fetchNames = async () => {
      const storedNames = await loadNamesFromFile();
      const storedCodes = await loadCodesFromFile();
      if (storedNames) {
        setNames(storedNames);
        names.forEach(element => {
           console.log("name: "+ element); 
        });
      }
      if (storedCodes){
        setCodes(storedCodes);
      }
    };

  const createQrCode = async (newCard: string, QrCode: string) => {
  // Await the file system operation to get the latest data
  await fetchNames();

  // 1. Validate both inputs simultaneously
  if (newCard.trim() === '' || QrCode.trim() === '') {
    // 2. Provide user-friendly feedback
    Alert.alert('Validation Error', 'Card Name and QR-Code fields cannot be empty.');
    return; // Exit the function early
  }

  // 3. Check for existing card name after validating inputs
  if (names.includes(newCard)) {
    Alert.alert('Validation Error', 'This card name already exists.');
    return; // Exit the function early
  }

  // If all validations pass, proceed with saving the data
  try {
    // Save the new card name and code
    await saveNamesToFile(newCard);
    await saveCodesToFile(QrCode);

    console.log(`New card "${newCard}" added successfully.`);
    console.log(`Generating QR code for data: "${QrCode}"`);

    // Reset the input fields on success
    setInputText('');
    setQrCodeInput('');
    Alert.alert('Success', 'New card and QR code created!');

  } catch (error) {
    // Handle potential errors from file system operations
    Alert.alert('Error', 'An error occurred while saving the card.');
    console.error(error);
  }
};

    return(
    <View style={styles.container}>
      

      <Text style={styles.lable}>Card Name: </Text>
      <TextInput style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          selectTextOnFocus={true}
          placeholder="Card-Name"
          inputMode="text"
          placeholderTextColor={'white'}
      />

      <Text style={styles.lable}>QR-Code: </Text>
      <TextInput style={styles.input}
          onChangeText={setQrCodeInput}
          placeholder="QR-Code"
          placeholderTextColor={'white'}
          value={qrCodeInput}
          keyboardType="numeric"
          maxLength={14}
      />
      
      <TouchableOpacity style={styles.button} onPress={() =>{
          createQrCode(inputText, qrCodeInput);
      }}>
        <Text style={styles.Text}>Create</Text>
      </TouchableOpacity>

      {(qrCodeInput || '').length === 13 && (
        <View style={styles.barcode}>
          <Barcode 
            value={qrCodeInput}
            options={{ format: 'EAN13', background: 'lightblue' }}
          />
        </View>
      )}
    </View>

    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "silver",
    width: 300,
    height: 600,
    borderRadius: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  cardName: {
    color: "black",
    marginBottom: 1,
  },
  input: {
    height: 40,
    width: 100,
    margin: 5,
    borderWidth: 1,
    borderColor: 'white',
    color:'white'
  },
  lable: {
    height: 20,
    color: 'white'
  },
      button: {
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    marginLeft:5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  Text:{
    color:"white",
  },
  barcode:{
    backgroundColor: "white", // Set a clear background for the barcode view
    marginTop: 15,
    padding: 10,
  }
});