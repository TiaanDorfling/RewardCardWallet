import DisplayRewardCardBarcode from "@/components/DisplayRewardCardBarcode";
import { View, StyleSheet, ScrollView, Button } from "react-native";
import { useFileSystemNames } from "@/hooks/useFileSystemNames";
import { useFileSystemBarcodes } from "@/hooks/useFileSystemBarcodes";
import { useState, useEffect } from "react";
import * as FileSystem from 'expo-file-system';

export default function HomeScreen() {
  const { loadNamesFromFile } = useFileSystemNames();
  const { loadCodesFromFile } = useFileSystemBarcodes();
  const [names, setNames] = useState<string[]>([]);
  const [codes, setCodes] = useState<string[]>([]);

  const fetchNames = async () => {
    const storedNames = await loadNamesFromFile();
    const storedCodes = await loadCodesFromFile();
    if (storedNames) {
      setNames(storedNames);
    }
    if (storedCodes) {
      setCodes(storedCodes);
    }
  };

    const nukeEverything = async () => {
    try {
      const barcodeFileUri = `${FileSystem.documentDirectory}barcodes.json`;
      const nameFileUri = `${FileSystem.documentDirectory}names.json`;
      
      // Clear both files
      await FileSystem.writeAsStringAsync(barcodeFileUri, JSON.stringify([]));
      await FileSystem.writeAsStringAsync(nameFileUri, JSON.stringify([]));
      
      console.log('🚀 NUKED! All data cleared on app open');
      
      // Set empty arrays in state
      setNames([]);
      setCodes([]);
      
    } catch (error) {
      console.error('Nuke error:', error);
    }
  };

  useEffect(() => {
    // nukeEverything();
    fetchNames();
  }, []); // Only runs once on component mount

  return (
    <ScrollView>
      <View style={styles.container}>
        <Button title="🔃" onPress={fetchNames} />
        {names.map((name, index) => (
          <View key={index} style={styles.rewardCard}>
            <DisplayRewardCardBarcode key={index} cardName={name} barcode={codes[index]} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "black",
  },
  rewardCard: {
    flexDirection: "column",
    marginTop: 10,
  },
  Button: {
    marginTop: 15,
  }
});