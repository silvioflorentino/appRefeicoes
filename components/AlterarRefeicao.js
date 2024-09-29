
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
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
            <View style={estilo.container}>
                <View>
                    <Text style={estilo.titulo}> Alterar dados da Refeição </Text>
                </View>
                <View>
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