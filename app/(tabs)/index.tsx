import DisplayRewardCard from "@/components/DisplayRewardCard";
import { View, StyleSheet } from "react-native";

export default function HomeScreen() {
    return(
    <View style={styles.container}>
        <DisplayRewardCard cardName="Spar"/>
    </View>
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
});