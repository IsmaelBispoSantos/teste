import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Pressable, ImageBackground, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


export default function Formulario({ navigation }) {

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);

  
  useEffect(() => {loadTasks()}, []);


  const taskSchema = z.object({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    description: z.string().optional(),
    date: z
      .string()
      .refine(
        (date) => {
          const selectedDate = new Date(date);
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Normaliza para garantir apenas a data
          return selectedDate >= today;
        },
        { message: "A data deve ser hoje ou uma data futura" }
      ),
  });


  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(taskSchema) });


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
    Alert.alert("Tarefa Criada");
    const newTask = {
      title: data.title,
      description: data.description || "",
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
    <ImageBackground source={require("../imagens/fundo.jpg")} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        {/* <Image source={require("../imagens/imageTarefas.png")} style={styles.logo} /> */}

        <Text style={styles.title}>REGISTRO DE TAREFAS</Text>

        <Text style={styles.label}>Título da Tarefa</Text>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput style={styles.input} placeholder="Digite o título" onChangeText={onChange} value={value} />
              {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
            </>
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
          render={({ field: { value } }) => (
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
                      setValue("date", selectedDate.toISOString(), { shouldValidate: true });
                    }
                  }}
                  minimumDate={new Date()} // Garante que apenas a data atual ou futura pode ser selecionada
                />
              )}

              {errors.date && <Text style={styles.error}>{errors.date.message}</Text>}
            </View>
          )}
        />

        <Button color="#327485" title="Criar Tarefa" onPress={handleSubmit(onSubmit)} />
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
    width: 300,
    height: 300,
    alignSelf: "center",
    marginBottom: 5,
  },
  container: {
    padding: 20,
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.51)",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffffff",
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
    backgroundColor: "#FFFFFF", // Fundo branco para destaque
    borderWidth: 3,
    borderColor: "#BBB", // Cor de borda mais visível
    borderRadius: 10, // Bordas mais arredondadas para suavidade
    paddingHorizontal: 14, // Mais espaçamento interno
    paddingVertical: 12,
    marginTop: 8,
    marginBottom: 12,
    width: "100%",
    
    // Sombra para efeito 3D no iOS
    shadowColor: "#000",  
    shadowOffset: { width: 3, height: 3 },  
    shadowOpacity: 0.2,  
    shadowRadius: 5,  
    
    // Elevação no Android para efeito 3D
    elevation: 5,  
  },
  
  error: {
    color: "red",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
  },
});
