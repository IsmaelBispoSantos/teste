# Registro de Tarefas - React Native (Expo)

## Descrição do Projeto
Este projeto é um aplicativo de registro de tarefas desenvolvido em **React Native** com **Expo**. Ele permite aos usuários adicionar, listar e excluir tarefas, armazenando os dados localmente com **AsyncStorage**.

## Dependências Necessárias
Antes de rodar o projeto, é necessário instalar as seguintes dependências:

### 1. React Navigation
O projeto usa **React Navigation** para a navegação entre telas.
```sh
expo install @react-navigation/native
expo install @react-navigation/stack
```
Além disso, é necessário instalar dependências adicionais:
```sh
expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
```

### 2. AsyncStorage
Para armazenar tarefas localmente:
```sh
expo install @react-native-async-storage/async-storage
```

### 3. DateTimePicker
Para seleção de datas nas tarefas:
```sh
expo install @react-native-community/datetimepicker
```

### 4. Hook Form e Validação com Zod
Para manipulação e validação de formulários:
```sh
npm install react-hook-form
npm install @hookform/resolvers
npm install zod
```

### 5. React Native Vector Icons
Para exibir ícones no aplicativo:
```sh
expo install react-native-vector-icons
```

## Como Rodar o Projeto
1. Clone o repositório e entre na pasta do projeto.
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Execute o aplicativo no emulador ou dispositivo físico:
   ```sh
   expo start
   ```

## Estrutura do Projeto
```
/registro-de-tarefas
├── componentes/
│   ├── Formulario.js
│   ├── ListaTarefa.js
│
├── imagens/
│   ├── fundo.jpg
│   ├── add.jpg
│   ├── list.jpg
│
├── App.js
├── package.json
├── README.md
```



