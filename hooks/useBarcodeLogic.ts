import { Alert } from 'react-native';
import { useState } from 'react';
import { useFileSystemBarcodes } from './useFileSystemBarcodes';

// The custom hook
export const useBarcodeLogic = (barcode: string) => {
  const { removeCodeFromFile, updateBarcode } = useFileSystemBarcodes();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentBarcodeToEdit, setCurrentBarcodeToEdit] = useState('');
  const [newBarcodeValue, setNewBarcodeValue] = useState('');

  const deleteBarcode = async (barcode: string) => {
    try {
      removeCodeFromFile(barcode);
    } catch (e: any) {
      Alert.alert('Error deleting code', e.message);
    }
  };

  const editBarcode = async (barcode: string) => {
    setCurrentBarcodeToEdit(barcode);
    setNewBarcodeValue(barcode); // Pre-fill with current barcode
    setIsEditModalVisible(true);
  };

  const handleUpdateBarcode = async () => {
    try {
      if (newBarcodeValue && newBarcodeValue.trim() !== '') {
        await updateBarcode(currentBarcodeToEdit, newBarcodeValue.trim());
        Alert.alert('Success', 'Barcode updated successfully!');
        closeEditModal();
      } else {
        Alert.alert('Invalid Input', 'Please enter a valid barcode.');
      }
    } catch (error: any) {
      Alert.alert('Error updating code', error.message);
    }
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setCurrentBarcodeToEdit('');
    setNewBarcodeValue('');
  };

  return {
    deleteBarcode,
    editBarcode,
    isEditModalVisible,
    newBarcodeValue,
    setNewBarcodeValue,
    handleUpdateBarcode,
    closeEditModal,
  };
};