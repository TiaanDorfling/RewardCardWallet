import DisplayRewardCard from "@/components/DisplayRewardCard";
import { View, StyleSheet,ScrollView, Button, TouchableOpacity } from "react-native";
import { useFileSystemNames } from "@/hooks/useFileSystemNames";
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const {loadNamesFromFile} = useFileSystemNames();
  const [names, setNames] = useState<string[]>([]); 

    const fetchNames = async () => {
      const storedNames = await loadNamesFromFile();
      if (storedNames) {
        setNames(storedNames);
      }
    };

  useEffect(() => {
    fetchNames();
  }, []); //dependencies key is of most importanec for this to work only once

    return(
    <ScrollView>
    <View style={styles.container}>
      <Button title="🔃" onPress={fetchNames}/>
        {names.map((name, index) => (
          <View key={index} style={styles.rewardCard}>
          <DisplayRewardCard key={index} cardName={name} />
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
    marginTop:10,
  },
  Button:{
    marginTop:15,
  }
     
});