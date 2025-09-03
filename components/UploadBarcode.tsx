import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Modal, 
  TextInput 
} from 'react-native';
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
  const { 
    deleteBarcode, 
    editBarcode,
    isEditModalVisible,
    newBarcodeValue,
    setNewBarcodeValue,
    handleUpdateBarcode,
    closeEditModal
  } = useBarcodeLogic(barcode);
  
  const {removeNameFromFile} = useFileSystemNames();

  const isValidEAN13 = (ean : string) => {
  // A valid EAN-13 must be a 13-digit string.
  if (!/^\d{13}$/.test(ean)) {
    return false;
  }

  // Split the number into digits.
  const digits = ean.split('').map(Number);
  
  // Calculate the sum of digits at odd positions (1st, 3rd, 5th, etc.).
  const oddSum = digits.slice(0, 12).filter((_, index) => index % 2 === 0).reduce((sum, digit) => sum + digit, 0);

  // Calculate the sum of digits at even positions (2nd, 4th, 6th, etc.), and multiply by 3.
  const evenSum = digits.slice(0, 12).filter((_, index) => index % 2 !== 0).reduce((sum, digit) => sum + digit, 0);
  const totalSum = oddSum + (evenSum * 3);
  
  // The check digit is the last digit of the number.
  const checkDigit = digits[12];
  
  // The checksum is the last digit of the total sum.
  const checksum = totalSum % 10;
  
  // If the checksum is 0, the check digit should also be 0. Otherwise, the check digit should be 10 minus the checksum.
  return (checksum === 0 && checkDigit === 0) || (checkDigit === 10 - checksum);
};

  return (
    <View style={styles.container}>
      <View style={styles.barcode}>
        <Barcode 
          value={barcode}
          options={{ format: 'EAN13', background: 'white' }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => editBarcode(barcode)}
        >
          <Icon name="pencil" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            removeNameFromFile(cardName);
            deleteBarcode(barcode);
          }}
        >
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Barcode</Text>
            
            <TextInput
              style={styles.textInput}
              value={newBarcodeValue}
              onChangeText={(text) => {
                const truncated = text.slice(0, 13);
                setNewBarcodeValue(truncated);
              }}
              placeholder="Enter 13-digit barcode"
              keyboardType="numeric"
              maxLength={13}
              autoFocus={true}
            />
            
            {/* Show character count */}
            <Text style={styles.characterCount}>
              {newBarcodeValue.length}/13 digits
            </Text>
            
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={closeEditModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.updateButton]} 
                onPress={handleUpdateBarcode}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  barcode: {
    backgroundColor: "white",
    marginTop: 15,
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
    marginTop: 10,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  characterCount: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  updateButton: {
    backgroundColor: '#007BFF',
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  updateButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});