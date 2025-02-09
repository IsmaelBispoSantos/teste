import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable, ImageBackground, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm, Controller } from "react-hook-form";

export default function Formulario({ navigation }) {
  const { control, handleSubmit, reset } = useForm();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
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

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Erro ao salvar tarefas", error);
    }
  };

  const onSubmit = async (data) => {
    const newTask = {
      title: data.title,
      description: data.description,
      date: new Date(data.date).toLocaleDateString(),
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);

    Alert.alert("Tarefa Criada", `Título: ${newTask.title}\nDescrição: ${newTask.description}\nData: ${newTask.date}`);

    reset({ title: "", description: "", date: "" });
    setDate(new Date());
    navigation.navigate("ListarTarefas");
  };

  return (
    <ImageBackground
      source={require('../imagens/fundo.jpg')} // Certifique-se de que o caminho está correto
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require('../imagens/imageTarefas.png')} // Substitua com o caminho da sua imagem
          style={styles.logo}
        />

        <Text style={styles.title}>REGISTRO DE TAREFAS</Text>

        <Text style={styles.label}>Título da Tarefa</Text>
        <Controller
          control={control}
          name="title"
          rules={{ required: "O título é obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} placeholder="Digite o título" onChangeText={onChange} value={value} />
          )}
        />

        <Text style={styles.label}>Descrição</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, { height: 120 }]}
              placeholder="Digite a descrição"
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          )}
        />

        <Text style={styles.label}>Data de conclusão</Text>
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <View>
              <Pressable onPress={() => setShow(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="Selecione a data"
                  value={value ? new Date(value).toLocaleDateString() : ""}
                  editable={false}
                />
              </Pressable>

              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="calendar"
                  onChange={(event, selectedDate) => {
                    setShow(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                      onChange(selectedDate.toISOString());
                    }
                  }}
                />
              )}
            </View>
          )}
        />

        <Button title="Criar Tarefa" onPress={handleSubmit(onSubmit)} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 200, // Ajuste o tamanho da imagem conforme necessário
    height: 200,
    alignSelf: "center",
    marginBottom: 20, // Espaço entre a imagem e o título
  },
  container: {
    padding: 20,
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.28)", // Leve transparência para melhor leitura
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F3F3F3",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
  },
});





