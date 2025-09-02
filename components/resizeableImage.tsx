import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

interface ResizableImageProps {
  source: { uri: string };
  originalSize?: number;
  enlargedSize?: number;
}

const screenWidth = Dimensions.get('window').width;

export default function ResizableImage({
  source,
  originalSize = 200,
  enlargedSize = screenWidth - 15,
}: ResizableImageProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const toggleSize = () => {
    setIsEnlarged(!isEnlarged);
  };

  const imageStyle = {
    width: isEnlarged ? enlargedSize : originalSize,
    height: isEnlarged ? enlargedSize : originalSize,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSize}>
        <Image
          source={source}
          style={[styles.image, imageStyle]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    resizeMode: 'contain',
  },
});