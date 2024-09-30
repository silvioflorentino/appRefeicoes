import React, { useState } from 'react';
import { View,Text,TextInput,StyleSheet,TouchableOpacity,Alert, ImageBackground } from 'react-native';
import { firestore } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

export default function CadastrarRefeicao({navigation}) {
    const [nomeRefeicao, setNomeRefeicao] = useState(null);
    const [bebida, setBebida] = useState(null);
    const [sobremesa, setSobremesa] = useState(null);

    async function addRefeicao(){
        try {
            const docRef = await addDoc(collection(firestore, 'tbRefeicao'),{
            nomeRefeicao: nomeRefeicao,
            bebida: bebida,
            sobremesa: sobremesa
            });
            console.log("Cadastrado com Id:", docRef.id);
            Alert.alert("Cadastro","Registros cadastrados com sucesso")
            navigation.navigate("Home");
            
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            Alert.alert("Erro","Erro ao cadastrar, Por favor, Tente novamente.");
        }
    }
    return (
        <ImageBackground style={estilo.fundo2} resizeMode="cover" source={require('../assets/refeicao.jpg')}>
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}> Cadastre uma nova refeição no cardápio</Text>
            </View>
            <TextInput autoCapitalize='words' style={estilo.input} placeholder="Digite a Refeição" onChangeText={setNomeRefeicao} value={nomeRefeicao} />
            <TextInput style={estilo.input} placeholder="Digite a Bebida" onChangeText={setBebida} value={bebida} />
            <TextInput style={estilo.input} placeholder="Digite Sobremesa " onChangeText={setSobremesa} value={sobremesa} />

            <TouchableOpacity
                style={estilo.btnenviar}
                onPress={() => {
                    addRefeicao();
                }}>
                <Text style={estilo.btntxtenviar}> Enviar </Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fundo2: {
        flex: 1,
    },
    input: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor:'white',
        fontWeight:'700',
        padding:8,
        width:180,
        fontSize: 18,
        borderRadius: 10,
    },
    btnenviar: {
        marginTop: 20,
        backgroundColor: '#686868',
        borderColor:'#ffffff',
        borderWidth:0.6,
        borderRadius:10,
        padding:10,
    },
    btntxtenviar: {
        color:'white',
        fontWeight:'600',
        backgroundColor:'',
        fontSize: 18,
    },
    titulo: {
        color:'white',
        marginVertical: 40,
        fontSize: 25,
        textAlign: 'center',
    },
});




        


