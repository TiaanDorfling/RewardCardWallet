import * as FileSystem from 'expo-file-system';

export const useFileSystemBarcodes = () => {
  const fileUri = `${FileSystem.documentDirectory}codes.json`;

  const loadCodesFromFile = async (): Promise<string[] | null> => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const codes = JSON.parse(fileContent);
      console.log('Codes loaded successfully!');
      return codes;
    } catch (error: any) {
      console.warn('Failed to load codes. The file may not exist yet.');
      return null;
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

  const removeCodeFromFile = async (nameToRemove: string): Promise<void> => {
    try {
      // 1. Load the existing names from the file.
      const existingNames = await loadCodesFromFile() || [];

      // 2. Filter out the name to remove.
      const updatedNames = existingNames.filter(name => name !== nameToRemove);

      // 3. Stringify the updated array.
      const jsonNames = JSON.stringify(updatedNames);

      // 4. Overwrite the file with the new array.
      await FileSystem.writeAsStringAsync(fileUri, jsonNames);
      console.log(`Successfully removed ${nameToRemove} from the list.`);
    } catch (error) {
      console.error('Failed to remove name:', error);
    }
  };

  return {
    saveCodesToFile,
    loadCodesFromFile,
    removeCodeFromFile
  };
};

