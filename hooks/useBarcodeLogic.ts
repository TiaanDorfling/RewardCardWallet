import { useState, useEffect, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import { useFileSystemBarcodes } from './useFileSystemBarcodes';

// The custom hook
export const useBarcodeLogic = (barcode:string) => {
  const {removeCodeFromFile, loadCodesFromFile} = useFileSystemBarcodes();
  let barcodes : string[] | null;
    
  const deleteBarcode = async (barcode:string) => {
    try{
    removeCodeFromFile(barcode);
    }
    catch(e:any){
      Alert.alert('Error deleting code', e.message)
    } 
  }

  


  return { deleteBarcode };
};