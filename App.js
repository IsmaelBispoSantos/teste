import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

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
          <Image source={require('./imagens/add.jpg')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ListarTarefas')} style={styles.button}>
          <Image source={require('./imagens/list.jpg')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'MENU DO APLICATIVO' }} />
        <Stack.Screen name="InserirTarefa" component={Formulario} />
        <Stack.Screen name="ListarTarefas" component={ListaTarefa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 50,
    alignItems: "center",

  },
  button: {
    margin: 20,
  },
  icon: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffffff",
    width: 180,  // Ajuste o tamanho da imagem conforme necessário
    height: 180,
  },
});
