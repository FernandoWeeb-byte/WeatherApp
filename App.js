import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const api = axios.create()

export default function App() {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [weather, setWeather] = useState()


  async function handleWeather() {
    if (city === '' && state === '') {
      Alert.alert(
        "Preencha os campos",
        "Os campos devem ser preenchidos",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK" }
        ]
      );

    }
    else {
      const response = await api.get(`https://weather.contrateumdev.com.br/api/weather/city/?city=${city},${state}`)
      console.log(response.data)
      setWeather(response.data)
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text>Digite a cidade e o estado para saber a previsão do tempo</Text>
        <TextInput onChangeText={(text) => setCity(text)} placeholder='City' style={styles.input}></TextInput>
        <TextInput onChangeText={(text) => setState(text)} placeholder='State' style={styles.input}></TextInput>
        <Button onPress={handleWeather} title='Comfirmar'></Button>
      </View>
      <View >
        <Text style={styles.texto}>Temperatura: {weather?.main.temp}</Text>
        <Text style={styles.texto}>Previsão: {weather?.weather[0].description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    textAlign: 'center',
    borderWidth: 1,
    width: '50%',
    marginVertical: 4
  },
  texto: {
    fontSize: 20,
    marginTop: 10,
    color: 'blue'
  }
});
