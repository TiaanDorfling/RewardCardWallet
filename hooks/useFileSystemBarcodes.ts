import * as FileSystem from 'expo-file-system';

export const useFileSystemBarcodes = () => {
  const fileUri = `${FileSystem.documentDirectory}codes.json`;


  const loadCodesFromFile = async (): Promise<string[]> => {
    try {
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      if (!fileExists.exists) {
        console.log('Codes file does not exist, creating empty array.');
        return [];
      }
      
      const fileContents = await FileSystem.readAsStringAsync(fileUri);
      
      if (!fileContents.trim()) {
        console.log('Codes file is empty, returning empty array.');
        return [];
      }
      
      let codes;
      try {
        codes = JSON.parse(fileContents);
      } catch (parseError) {
        console.error('Invalid JSON in codes file, resetting:', parseError);
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify([]));
        return [];
      }
      
      // Ensure codes is an array
      if (!Array.isArray(codes)) {
        console.log('Codes file contains non-array data, resetting.');
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify([]));
        return [];
      }
      
      // Validate and clean codes with extra safety checks
      const validCodes = codes.filter((code: any) => {
        try {
          // Check if it's a string
          if (typeof code !== 'string') {
            console.log('Removing non-string code:', code);
            return false;
          }
          
          // Check if code exists and has a length property
          if (!code || typeof code.length === 'undefined') {
            console.log('Removing code with no length:', code);
            return false;
          }
          
          // Check if it has exactly 13 digits
          const numericOnly = code.replace(/\D/g, '');
          if (!numericOnly || numericOnly.length !== 13) {
            console.log('Removing invalid length code:', code, `(${numericOnly ? numericOnly.length : 'no digits'} digits)`);
            return false;
          }
          
          // Additional check: make sure the original code isn't too long
          if (code.length > 13) {
            console.log('Removing excessively long code:', code, `(${code.length} characters)`);
            return false;
          }
          
          return true;
        } catch (filterError) {
          console.error('Error filtering code:', code, filterError);
          return false; // Remove any code that causes an error
        }
      });
      
      // If we removed invalid codes, save the cleaned version
      if (validCodes.length !== codes.length) {
        const removedCount = codes.length - validCodes.length;
        console.log(`Auto-cleaned ${removedCount} invalid codes`);
        console.log(`Valid codes remaining: ${validCodes.length}`);
        console.log('Removed codes:', codes.filter(code => !validCodes.includes(code)));
        
        // Save the cleaned codes back to file
        try {
          await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(validCodes));
          console.log('Cleaned codes saved successfully');
        } catch (saveError) {
          console.error('Failed to save cleaned codes:', saveError);
        }
      }
      
      console.log('Codes loaded successfully!');
      return validCodes;
      
    } catch (error) {
      console.error('Error loading codes from file:', error);
      // If there's any error, reset the file to prevent crashes
      console.log('Resetting corrupted codes file...');
      try {
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify([]));
        console.log('File reset successfully');
      } catch (resetError) {
        console.error('Failed to reset codes file:', resetError);
      }
      return [];
    }
  };

  const saveCodesToFile = async (newCode: string): Promise<void> => {
    try {
      // 1. Load the existing names from the file.
      const existingCodes = await loadCodesFromFile() || [];

      // 2. Add the new name to the existing array.
      const updatedCodes = [...existingCodes, newCode];

      // 3. Stringify the full array.
      const jsonCodes = JSON.stringify(updatedCodes);

      // 4. Overwrite the file with the complete, updated array.
      await FileSystem.writeAsStringAsync(fileUri, jsonCodes);
      console.log('Codes saved successfully!');
    } catch (error) {
      console.error('Failed to save Codes:', error);
    }
  };

  const removeCodeFromFile = async (codeToRemove: string): Promise<void> => {
    try {
      // 1. Load the existing names from the file.
      const existingNames = await loadCodesFromFile() || [];

      // 2. Filter out the name to remove.
      const updatedNames = existingNames.filter(name => name !== codeToRemove);

      // 3. Stringify the updated array.
      const jsonNames = JSON.stringify(updatedNames);

      // 4. Overwrite the file with the new array.
      await FileSystem.writeAsStringAsync(fileUri, jsonNames);
      console.log(`Successfully removed ${codeToRemove} from the list.`);
    } catch (error) {
      console.error('Failed to remove name:', error);
    }
  };

  const updateBarcode = async (oldCode: string, newCode: string): Promise<void> => {
    try {
      // 1. Load the existing codes from the file.
      const existingCodes = await loadCodesFromFile() || [];

      // 2. Find the index of the code to update.
      const codeIndex = existingCodes.findIndex(code => code === oldCode);
      
      if (codeIndex === -1) {
        console.warn(`Code ${oldCode} not found in the list.`);
        return;
      }

      // 3. Update the code at the found index.
      existingCodes[codeIndex] = newCode;

      // 4. Stringify the updated array.
      const jsonCodes = JSON.stringify(existingCodes);

      // 5. Overwrite the file with the updated array.
      await FileSystem.writeAsStringAsync(fileUri, jsonCodes);
      console.log(`Successfully updated ${oldCode} to ${newCode}.`);
    } catch (error) {
      console.error('Failed to update code:', error);
    }
  };

  return {
    saveCodesToFile,
    loadCodesFromFile,
    removeCodeFromFile,
    updateBarcode
  };
};

