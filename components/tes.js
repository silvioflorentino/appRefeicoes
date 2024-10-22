import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Firebase from './Firebase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function dados(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  function logar() {
    Firebase.auth()
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        if (user) {
          alert('User does not exist anymore.');
          return;
        }
        //const user = user.uid
        navigation.navigate('Home', { email });
      })
      .catch((error) => {
        alert(error);
        navigation.navigate('login');
      })
      .catch((error) => {
        alert(error);
        navigation.navigate('login');
      });
  }

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(function (user) {
      const uid = user.uid;
      const email = user.email;
      //alert(email);
    });
  }, []);

  if (user) {
    //alert("Logado"+user.uid)
    //console.log("Logado"+user.uid)
    return navigation.navigate('Home');
  } else {
    //alert("'não logado!'")
    //console.log('não logado!')
  }
  return (
    <View style={estilo.container}>
      <Image
        source={{
          uri:
            'https://asmetro.org.br/portalsn/wp-content/uploads/2017/11/Agenda-696x418.jpg',
        }}
        style={estilo.img}
      />

      <Text style={estilo.titulo}> Agenda </Text>

      <TextInput
        style={estilo.input}
        onChangeText={(email) => setEmail(email)}
        value={email}
        placeholder="Digite o E-mail"
      />

      <TextInput
        style={estilo.input}
        secureTextEntry={true}
        onChangeText={(senha) => setSenha(senha)}
        value={senha}
        placeholder="Digite a Senha"
      />

      <TouchableOpacity
        style={estilo.btnLo}
        onPress={() => {
          logar();
        }}>
        <Text style={estilo.btnTextLo}>Logar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text
          style={estilo.btnCad}
          onPress={() => navigation.navigate('Cadastro')}>
          Cadastrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#116611',
  },
  img: {
    width: 250,
    height: 150,
    borderRadius: 90,
  },
  input: {
    width: 250,
    height: 30,
    backgroundColor: '#5f5c',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 25,
  },
  titulo: {
    marginVertical: 25,
    fontSize: 55,
    color: '#995599',
  },
  btnLo: {
    backgroundColor: '#00008B',
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextLo: {
    color: '#ffffff',
    fontSize: 25,
  },
  btnCad: {
    marginTop: 20,
    color: '#ffffff',
    fontSize: 20,
    borderBottomColor: '#225588',
    borderBottomWidth: 2,
  },
});