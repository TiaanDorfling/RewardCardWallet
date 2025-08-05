import React from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';
import { useImageLogic } from '../hooks/imageLogic'; 

export default function UploadImageButton() {
  // Use the custom hook to get state and functions
  const { file, error, pickImage } = useImageLogic();

  return (
    <View style={styles.container}>
      {/* Display the image if a file exists */}
      {file && <Image source={{ uri: file }} style={styles.image} />}

      {/* Show an error message if one exists */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button title="Add or Change Image" onPress={pickImage} />
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
  }
});