import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Formulario from './componentes/Formulario'; // Ajuste o caminho conforme necessário
import ListaTarefa from './componentes/ListaTarefa'; // Ajuste o caminho conforme necessário

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('./imagens/fundo.jpg')} // Substitua pelo caminho correto da sua imagem
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('InserirTarefa')} style={styles.button}>
          <Ionicons name="add-circle" size={50} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ListarTarefas')} style={styles.button}>
          <Ionicons name="list" size={50} color="green" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'REGISTRO DE TAREFAS' }} />
        <Stack.Screen name="InserirTarefa" component={Formulario} />
        <Stack.Screen name="ListarTarefas" component={ListaTarefa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Faz a imagem cobrir toda a tela
    justifyContent: "center",
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  button: {
    margin: 20,
  },
});
