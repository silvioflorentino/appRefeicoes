
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { firestore } from '../firebase';
import { collection, doc, updateDoc } from "firebase/firestore";

export default function AlterarCriptos({navigation, route}) {

    const id = route.params.id;

    const [nomeRefeicao,setNomeRefeicao] = useState(route.params.nomeRefeicao);
    const [bebida,setBebida] = useState(route.params.bebida);
    const [sobremesa,setSobremesa] = useState(route.params.sobremesa);


    async function AlterarRefeicao(id, nomeRefeicao, bebida, sobremesa) {
        try {
            await updateDoc(doc(collection(firestore, "tbRefeicao"), id), {
                nomeRefeicao: nomeRefeicao,
                bebida: bebida,
                sobremesa: sobremesa
            })
            Alert.alert("Aviso", "Refeição Alterada com sucesso.")
            navigation.navigate("Home")
        }
        catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por favor, tente novamente.");
        }
    }
        return (
        <ImageBackground style={estilo.fundo2} resizeMode="cover" source={require('../assets/refeicao.jpg')}>
            <View style={estilo.container}>
                <View>
                    <Text style={estilo.titulo}> Alterar dados da Refeição </Text>
                </View>
                <View  style={estilo.inputView} >
                    <TextInput autoCapitalize='words' style={estilo.input} placeholder="Digite a Refeição" onChangeText={setNomeRefeicao} value={nomeRefeicao} />
                    <TextInput style={estilo.input} placeholder="Digite a Bebida" onChangeText={setBebida} value={bebida} />
                    <TextInput style={estilo.input} placeholder="Digite a Sobremesa" onChangeText={setSobremesa} value={sobremesa} />
                    <TouchableOpacity
                        style={estilo.btnenviar}
                        onPress={() => {
                            AlterarRefeicao(id,  nomeRefeicao, bebida, sobremesa);
                        }}>
                        <Text style={estilo.btntxtenviar}> Alterar </Text>
                    </TouchableOpacity>
                </View>
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
            width:260,
            fontSize: 18,
            borderRadius: 10,
        },

        inputView: {
            justifyContent:'center',
            textAlign:'center',
            alignItems:'center',
        },
        btnenviar: {
            marginTop: 38,
            backgroundColor: '#686868',
            borderColor:'#ffffff',
            borderWidth:0.6,
            borderRadius:10,
            padding:10,
            width:110,
        },
        btntxtenviar: {
            color:'white',
            fontWeight:'600',
            backgroundColor:'',
            fontSize: 18,
            justifyContent:'center',
            textAlign:'center',

        },
        titulo: {
            color:'white',
            marginVertical: 40,
            fontSize: 25,
            textAlign: 'center',
        },
    });