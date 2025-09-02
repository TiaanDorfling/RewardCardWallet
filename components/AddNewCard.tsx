import React, {useState}from "react";
import { View, StyleSheet, Button, TextInput, Text, TouchableOpacity } from 'react-native';
import { useFileSystemNames } from "@/hooks/useFileSystemNames";
import { useImageLogic } from "@/hooks/useImageLogic";
import Icon from 'react-native-vector-icons/FontAwesome';
import Barcode from "react-native-barcode-builder";


export default function AddNewCard(){
  const { saveNamesToFile, loadNamesFromFile } = useFileSystemNames();
  const [names, setNames] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  const {pickImage, openCamera} = useImageLogic();

    const fetchNames = async () => {
      const storedNames = await loadNamesFromFile();
      if (storedNames) {
        setNames(storedNames);
        names.forEach(element => {
           console.log("name: "+ element); 
        });
      }
    };


  const uploadHandleSave = async (newCard: string) => {
    fetchNames();
    if (newCard.trim() === ''){
        console.log('No card name entered.')
        setInputText('');
                names.forEach(element => {
            console.log("name: " + element)
        });
    } else if (names.includes(newCard)){
        console.log('This card name already exists')
        setInputText('');
    } else {
        await saveNamesToFile(newCard);
        setInputText('');
        await console.log('new card added.');
        pickImage(newCard);
    }
  };

    const cameraHandleSave = async (newCard: string) => {
    fetchNames();
    if (newCard.trim() === ''){
        console.log('No card name entered.')
        setInputText('');
                names.forEach(element => {
            console.log("name: " + element)
        });
    } else if (names.includes(newCard)){
        console.log('This card name already exists')
        setInputText('');
    } else {
        await saveNamesToFile(newCard);
        setInputText('');
        await console.log('new card added.');
        openCamera(newCard);
    }

    //setNames([]) to clear array if validation fails
  };

    return(
        <View style={styles.container}>
          
        <Text style={styles.lable}>Card Name: </Text>
        <TextInput style={styles.input}
            onChangeText={setInputText}
            value={inputText}
        />
        
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() =>{
              uploadHandleSave(inputText);
            }}>
            <Icon name="upload" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>{
              cameraHandleSave(inputText);
            }}>
            <Icon name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "silver",
    width: 150,
    height: 250,
    borderRadius: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  cardName: {
    color: "black",
    marginBottom: 1,
  },
  input: {
    height: 40,
    width: 80,
    margin: 5,
    borderWidth: 1,
    borderColor: 'white',
    color:'white'
  },
  lable: {
    height: 20,
    color: 'white'
  },
      button: {
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    marginLeft:5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
  }
});