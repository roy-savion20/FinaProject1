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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
    <View style={item.user ? styles.userMessageContainer : styles.botMessageContainer}>
      <Text style={styles.messageText}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.containerheader}>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesList}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Entypo name="paper-plane" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerheader:{
    height: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(7,140,101,0.6)",
    paddingTop: 40,
    height: 850
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  userMessageContainer: {
    backgroundColor: "rgba(7,140,101,0.2)",
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    alignSelf: "flex-end",
    maxWidth: '80%',
  },
  botMessageContainer: {
    backgroundColor: "rgba(7,140,101,0.1)",
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    alignSelf: "flex-start",
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(7,140,101,0.6)",
    backgroundColor: "rgba(7,140,101,0.6)",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(7,140,101,0.5)",
    borderRadius: 20,
    color: "white",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "rgba(7,140,101,1)",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GeminiChat;
