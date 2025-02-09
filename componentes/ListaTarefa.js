import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ListaTarefas() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas", error);
    }
  };

  const toggleCompletion = async (taskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].isCompleted = !updatedTasks[taskIndex].isCompleted;

    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = async (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    
    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <ImageBackground 
      source={require("../imagens/fundo.jpg")} // Substitua pelo caminho correto da sua imagem
      style={styles.background}
      resizeMode="cover" // Pode ser "cover", "contain" ou "stretch"
    >
      {tasks.length === 0 ? (
        <View style={styles.alertContainer}>
          <Ionicons name="alert-circle" size={50} color="white" />
          <Text style={styles.alertMessage}>NENHUMA TAREFA CADASTRADA.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskCard}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>Título: {item.title}</Text>
                <Text style={styles.taskDescription}>Descrição: {item.description}</Text>
                <Text style={styles.taskDate}>Data: {item.date}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => toggleCompletion(index)} style={styles.actionButton}>
                  <Ionicons
                    name={item.isCompleted ? "checkmark-circle" : "checkmark-circle-outline"}
                    size={30}
                    color={item.isCompleted ? "green" : "gray"}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(index)} style={styles.actionButton}>
                  <Ionicons name="trash" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Faz a imagem cobrir toda a tela
    padding: 10,
    justifyContent: "center",
  },
  alertContainer: {
    backgroundColor: "#D9A300",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10, // Sombra no Android
  },
  alertMessage: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  taskCard: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5, // Sombra no Android
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 4,
    color: "#666",
  },
  taskDate: {
    fontSize: 12,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginLeft: 10,
  },
});
