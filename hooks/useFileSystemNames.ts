import * as FileSystem from 'expo-file-system';

export const useFileSystemNames = () => {
  const fileUri = `${FileSystem.documentDirectory}names.json`;

  const loadNamesFromFile = async (): Promise<string[] | null> => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const names = JSON.parse(fileContent);
      console.log('Names loaded successfully!');
      return names;
    } catch (error: any) {
      console.warn('Failed to load names. The file may not exist yet.');
      return null;
    }
  };

  const saveNamesToFile = async (newName: string): Promise<void> => {
    try {
      // 1. Load the existing names from the file.
      const existingNames = await loadNamesFromFile() || [];

      // 2. Add the new name to the existing array.
      const updatedNames = [...existingNames, newName];

      // 3. Stringify the full array.
      const jsonNames = JSON.stringify(updatedNames);

      // 4. Overwrite the file with the complete, updated array.
      await FileSystem.writeAsStringAsync(fileUri, jsonNames);
      console.log('Names saved successfully!');
    } catch (error) {
      console.error('Failed to save names:', error);
    }
  };

  const removeNameFromFile = async (nameToRemove: string): Promise<void> => {
    try {
      // 1. Load the existing names from the file.
      const existingNames = await loadNamesFromFile() || [];

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
    saveNamesToFile,
    loadNamesFromFile,
    removeNameFromFile
  };
};

