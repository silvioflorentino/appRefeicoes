import React, { useState } from 'react';
import { View,Text,TextInput,StyleSheet,TouchableOpacity,Alert } from 'react-native';
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
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}> Cadastre uma nova Criptomoeda</Text>
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
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#9ac234',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 15,
        borderRadius: 10,
    },
    btnenviar: {
        marginTop: 20,
    },
    btntxtenviar: {
        fontSize: 25,
    },
    titulo: {
        marginVertical: 40,
        fontSize: 25,
        textAlign: 'center',
    },
});




        


