import React, {useState}from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useFileSystemNames } from "@/hooks/useFileSystemNames";
import { useFileSystemBarcodes } from "@/hooks/useFileSystemBarcodes";
import { Alert } from 'react-native';
import { Barcode } from 'expo-barcode-generator';


export default function AddNewCard(){
  const { saveNamesToFile, loadNamesFromFile } = useFileSystemNames();
  const {saveCodesToFile, loadCodesFromFile} = useFileSystemBarcodes();
  const [names, setNames] = useState<string[]>([]);
  const [codes, setCodes] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  const [qrCodeInput, setQrCodeInput] = useState('');

    const fetchData = async () => {
    try {
        const storedNames = await loadNamesFromFile();
        const storedCodes = await loadCodesFromFile();

        // Update state for UI, but don't rely on it for validation
        if (storedNames) {
            setNames(storedNames);
        }
        if (storedCodes) {
            setCodes(storedCodes);
        }
        
        // Return the fetched data directly
        return { names: storedNames || [], codes: storedCodes || [] };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { names: [], codes: [] }; // Return empty arrays on error
    }
};

  const createQrCode = async (newCard: string, QrCode: string) => {
  // Await the file system operation to get the latest data
  const { names, codes } = await fetchData(); 

  // 1. Validate both inputs simultaneously
  if (newCard.trim() === '' || QrCode.trim() === '') {
    // 2. Provide user-friendly feedback
    Alert.alert('Validation Error', 'Card Name and QR-Code fields cannot be empty.');
    return; // Exit the function early
  }

  // 3. Check for existing card name after validating inputs
  if (names.includes(newCard.trim().toLowerCase()) || codes.includes(QrCode.trim().toLowerCase())) {
    Alert.alert('Validation Error', 'The card name or barcode already exists.');
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
          placeholderTextColor={'gray'}
      />

      <Text style={styles.lable}>QR-Code: </Text>
      <TextInput 
        style={styles.input}
        onChangeText={(text) => { 
          if (text.length > 13) {
            setQrCodeInput(text.substring(0, 13)); 
          } else {
            setQrCodeInput(text); 
          }
        }}
        placeholder="QR-Code"
        placeholderTextColor={'gray'}
        value={qrCodeInput}
        keyboardType="numeric"
        maxLength={20}
      />
      
      <TouchableOpacity style={styles.button} onPress={() =>{
          createQrCode(inputText, qrCodeInput);
      }}>
        <Text style={styles.button}>Create</Text>
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
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#F8FAFC', // Light gray background
    maxWidth: '100%',
    minHeight: '30%',
    borderRadius: 9,
    borderWidth:5,
    borderColor: "#4dc7ffff",
  },
  errorText: {
    color: '#EF4444', // Modern red
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardName: {
    color: '#1F2937', // Dark gray
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    height: 52,
    minWidth: 120,
    marginVertical: 8,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    fontSize: 16,
    color: '#374151',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  lable: { // Fixed typo from 'lable'
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'left',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6', // Modern blue
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 8,
    borderRadius: 12,
    minWidth: 100,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  barcode: {
    backgroundColor: '#FFFFFF',
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  // Additional modern styles for better UX
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputFocused: {
    borderColor: '#3B82F6',
    borderWidth: 2,
    shadowColor: '#3B82F6',
    shadowOpacity: 0.1,
  }
});