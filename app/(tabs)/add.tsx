import AddNewCard from "@/components/AddNewCard";
import { View, StyleSheet,ScrollView } from "react-native";
import { useFileSystemNames } from "@/hooks/useFileSystemNames";
import { useState, useEffect } from "react";

export default function Add(){
    
    const {loadNamesFromFile} = useFileSystemNames();
    const [names, setNames] = useState<string[]>([]); 

    const fetchNames = async () => {
        const storedNames = await loadNamesFromFile();
        if (storedNames) {
        setNames(names);
        }
    };

    useEffect(() => {
    fetchNames();
    }, []); //dependencies key is of most importance for this to work only once

    return(
            <View style={styles.container}>
              {/* <DisplayRewardCard cardName="Spar" /> */}
              <AddNewCard />
            </View>

    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "black",
  },
});