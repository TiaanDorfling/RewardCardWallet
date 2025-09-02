import { useState, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

// The custom hook
export const useImageLogic = () => {
  const [file, setFile] = useState<string | null>(null);
  const [error, setError] = useState(null);


    const loadImageLocally = useCallback(async (localImageUri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(localImageUri);
      if (fileInfo.exists) {
        //setFile(localImageUri);
        setFile(`${localImageUri}?v=${Date.now()}`);
      } else {
        setFile(null);
        Alert.alert('Error', 'No image found in local storage.');
      }
    } catch (e: any) {
      console.error('Error loading image:', e);
      setError(e.message || 'Failed to load image from local storage.');
      setFile(null);
    }
  }, []); // Dependency is a stable variable

  const saveImageLocally = useCallback(async (uri: string, localImageUri: string) => {
    try {
      await FileSystem.copyAsync({
        from: uri,
        to: localImageUri
      });
      console.log('Image saved successfully!');
      setFile(`${localImageUri}?v=${Date.now()}`);
      loadImageLocally(localImageUri);
    } catch (e: any) {
      console.error('Error saving image:', e);
      setError(e.message || 'Failed to save image locally.');
    }
  }, [loadImageLocally]); // Add loadImageLocally as a dependency

  const pickImage = useCallback(async (cardName:string) => {
  try {
    let localImageUri = FileSystem.documentDirectory + cardName +'.jpg';
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', '...');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      const imageUrl = result.assets[0]?.uri;
      if (imageUrl) {
        await saveImageLocally(imageUrl, localImageUri);

        setError(null);
      }
    }
  } catch (e: any) {
    setError(e.message || 'An error occurred while picking the image.');
    Alert.alert('Error picking image', e.message);
  }
}, [saveImageLocally]);

    const openCamera = useCallback(async (cardName: string) => {
        try {
            let localImageUri = FileSystem.documentDirectory + cardName + '.jpg';
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
                return;
            }
            const result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) {
                const imageUrl = result.assets[0]?.uri;
                if (imageUrl) {
                    await saveImageLocally(imageUrl, localImageUri);
                    setError(null);
                }
            }
        } catch (e: any) {
            setError(e.message || 'An error occurred while opening the camera.');
            Alert.alert('Error opening camera', e.message);
        }
    }, [saveImageLocally]);
  //Load the image when the hook is first used

//   useEffect(() => {
//     loadImageLocally();
//   }, [loadImageLocally]);

  return { file, error, pickImage, openCamera, loadImageLocally };
};