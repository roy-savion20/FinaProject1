import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native-gesture-handler";

type Message = {
  text: string;
  user: boolean;
};

const GeminiChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showStopIcon, setShowStopIcon] = useState<boolean>(false);

  const API_KEY = 'AIzaSyB1aaPHPfVZ9gthHR9fZFbr1KHflqL4Aqw';

  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = 'hello!';
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = await response.text();
      console.log(text);
      showMessage({
        message: 'Welcome to DogHouse AI',
        description: text,
        type: 'info',
        icon: 'info',
        duration: 2000,
      });
      setMessages([{ text, user: false }]);
    };

    startChat();
  }, []);

  const sendMessage = async () => {
    setLoading(true);
    const userMessage: Message = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();
    setMessages((prevMessages) => [...prevMessages, { text, user: false }]);
    setLoading(false);
    setUserInput('');
  };



  const clearMessages = () => {
    setMessages([]);
    setIsSpeaking(false);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.scroll}>
          <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={styles.input}
          placeholderTextColor="#fff"
        />
        {showStopIcon && (
          <TouchableOpacity style={styles.stopIcon} onPress={clearMessages}>
            <Entypo name="controller-stop" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "rgba(255,159,71,0.2)",height: 'auto' },
  messageContainer: { padding: 10, marginVertical: 5 },
  messageText: { fontSize: 16,color: 'white' },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(255,159,71,1)",
    borderRadius: 10,
    height: 50,
    color: "white",
  },
  micIcon: {
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  stopIcon: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
  },
  userMessage:{
    color: '#A5A5A5'
  },
  scroll:{
    backgroundColor:'rgba(255,159,71,0.2)',
    height: '100%'
  }
});

export default GeminiChat;