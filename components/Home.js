import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { firestore } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";

export default function Home({ navigation }) {
    const [refeicao, setRefeicao] = useState([]);

    async function deleteRefeicao(id) {
        try {
            await deleteDoc(doc(firestore, 'tbRefeicao', id));
            Alert.alert("Refeição deletada.")
        } catch (error) {
            console.error("Erro ao deletar.", error)
        }
    }

    useEffect(() => {
        const unsubcribe = onSnapshot(collection(firestore, 'tbRefeicao'), (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            });
            setRefeicao(lista);
        });
        return () => unsubcribe();

    }, []);

    return (
        <ImageBackground style={estilo.fundo} resizeMode="cover" source={require('../assets/refeicao.jpg')}>
            <View style={estilo.container}>

                <View style={estilo.blocoTitulo}>
                    <Text style={estilo.titulo2}> Lista de Refeições </Text>
                </View>

                <View style={estilo.itensView}>
                <FlatList
                    data={refeicao}
                    renderItem={({ item }) => {
                        return (
                            
                            <View style={estilo.refeicoesstyle}>
                                    <TouchableOpacity onPress={() => navigation.navigate("Alterar", {
                                        id: item.id,
                                        nomeRefeicao: item.nomeRefeicao,
                                        bebida: item.bebida,
                                        sobremesa: item.sobremesa
                                    })}>
                                        <View style={estilo.itens}>
                                            <Text style={estilo.titulo4}> <Text>Refeição Cadastrada</Text> </Text>
                                            <Text style={estilo.titulo3}> <Text>{item.nomeRefeicao}</Text> </Text>
                                            <Text style={estilo.titulo3}> <Text>{item.bebida}</Text> </Text>
                                            <Text style={estilo.titulo3}> <Text>{item.sobremesa}</Text> </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View estyle={estilo.botaodeletar}>
                                        <TouchableOpacity onPress={() => { deleteRefeicao(item.id) }}>

                                            <Text style={estilo.deletar}> X </Text>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                        );
                    }}
                    />
                <TouchableOpacity style={estilo.BtnCadastrar} onPress={() => navigation.navigate("Cadastrar")}>
                    <Text style={estilo.cadastrar}>+</Text>
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
        marginTop:200,
    },

    fundo: {
        flex: 1,
        resizeMode: '',
    },

    fundo2: {
        flex: 1,
        width:'auto',
        height:'100%',
        borderColor:'white',
        borderTopWidth:1.2,
        borderBottomWidth:1.2,
        margin:8,
    },

    itens: {
        borderRadius: 60,
        zIndex: 1,
        color: 'black',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        width: 200,
        height:100,
        justifyContent: 'center',
        textAlign: 'center',
    },


    titulo2: {
        fontSize: 25,
        justifyContent: 'center',
        textAlign: 'center',
        color: "white",
        fontWeight: '900',
        margin: 18,
        textDecorationStyle:'double',
        textDecorationLine:'underline'
    },

    titulo1: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 25,
        color: "white",
        fontWeight: '900',
        margin: 8,
      
    },

    titulo3: {
        position: 'relative',
        left: 12,
        justifyContent: 'center',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: '400',
    },
    
    titulo4: {
        position: 'relative',
        left: 3,
        top: -10,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
    },


    refeicoesstyle: {
        backgroundColor:'#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
    },
    botaodeletar: {
        fontSize: 30,
        zIndex: 1,
        Color: 'Black',
        textAlignVertical: 'center',
        marginVertical: 20,
        left: 180,
        borderRadius:30,
    },
    deletar: {
        backgroundColor: '#FF5050',
        fontSize: 18,
        color: "white",
        borderRadius: 3,
        fontWeight: '800',
    },
    cadastrar: {
        fontSize:32,
        color: "white",
        fontWeight:'600',
    },
    
    BtnCadastrar: {
        fontSize: 80,
        left:'72%',
        bottom:'10%',
        width:50,
        height:50,
        justifyContent:'center',
        textAlign:'center',
        alignItems:'center',
        borderRadius:16,
        borderColor:'white',
        borderWidth:2,
        marginBottom:10,
        backgroundColor: '#787878',
    },

    itensView: {
        height:'110%',
    },


});
