import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  Modal
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function ListaTarefas() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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

  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const pendingTasks = tasks.length - completedTasks;

  const chartData = [
    { name: "Concluídas", population: completedTasks, color: "#4CAF50", legendFontColor: "#000", legendFontSize: 15 },
    { name: "Pendentes", population: pendingTasks, color: "#D32F2F", legendFontColor: "#000", legendFontSize: 15 },

  ];
  

  return (
    <ImageBackground 
      source={require("../imagens/fundo.jpg")} // Substitua pelo caminho correto da sua imagem
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.graphButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.graphButtonText}>Ver Gráfico</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <PieChart
              data={chartData}
              width={Dimensions.get("window").width - 40}
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar Gráfico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
                <Text style={styles.taskTitle}>TITULO: {item.title}</Text>
                <Text style={styles.taskDescription}>DESCRIÇÃO: {item.description}</Text>
                <Text style={styles.taskDate}>DATA: {item.date}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => toggleCompletion(index)} style={styles.actionButton}>
                  <Ionicons
                    name={item.isCompleted ? "checkmark-circle" : "checkmark-circle-outline"}
                    size={30}
                    color={item.isCompleted ? "green" : "#ffffff"}
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
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  graphButton: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    margin: 10,
  },
  graphButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",

  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.51)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width:350
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#327485",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
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
    backgroundColor: "rgba(255, 255, 255, 0.51)",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffffff",
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
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#ffffff",
  },
  taskDescription: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#ffffff",
  },
  taskDate: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginLeft: 10,
  },
});
