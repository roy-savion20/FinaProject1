import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Modal, Alert, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function Posts() {
  const [modalVisible, setModalVisible] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSubmit = () => {
    console.log('Input 1:', input1);
    console.log('Input 2:', input2);
    console.log('Image URI:', imageUri);
    Alert.alert('Post Added');
    toggleModal();
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const uri = response.assets && response.assets[0].uri;
          if (uri) {
            setImageUri(uri);
          }
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
              <Text style={styles.textadd}>Add Post</Text>
            <Text>Title:</Text>
            <TextInput
              style={styles.input}
              value={input1}
              onChangeText={setInput1}
            />
            <Text>Description:</Text>
            <TextInput
              style={styles.input}
              value={input2}
              onChangeText={setInput2}
            />
            <View style={styles.buttondiv}>
              <Button title="Pick an image" onPress={pickImage}/>
            </View>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <View style={styles.buttondiv}>
              <Button title="Submit" 
              onPress={handleSubmit}  
              />
            </View>
            <View
            style={styles.buttondiv}>
              <Button title="Close" onPress={toggleModal}/>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(7,140,101,0.6)',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    lineHeight: 24, // Ensures the "+" sign is vertically centered
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  textadd:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  btn:{
    marginTop: 30
  },
  buttondiv:{
    marginTop: 15
  }
});
