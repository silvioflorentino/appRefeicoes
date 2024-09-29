import React,{ useEffect,useState } from "react";
import { View,Text,StyleSheet,FlatList,TouchableOpacity,Alert,ImageBackground } from "react-native";
import{ firestore } from "../firebase";
import { collection, onSnapshot, deleteDoc,doc } from "firebase/firestore";

export default function Home({navigation}) {
    const [refeicao, setRefeicao] = useState([]);
    
    async function deleteRefeicao(id){
        try {
            await deleteDoc(doc(firestore,'tbRefeicao',id));
            Alert.alert("Refeição deletada.")
        } catch (error) {
            console.error("Erro ao deletar.", error)
        }
    }

    useEffect(()=>{
        const unsubcribe = onSnapshot(collection(firestore,'tbRefeicao'),(querySnapshot)=>{
            const lista =[];
            querySnapshot.forEach((doc)=>{
                lista.push({...doc.data(), id: doc.id});
            });
            setRefeicao(lista);
        });
        return () => unsubcribe();
    
},[]);

return(
   <View style={estilo.container}>
        <View>
             <Text style={estilo.titulo}> Lista de Refeições </Text>
        </View>     
        <FlatList
            data={refeicao}
            renderItem={({item})=>{
                return(
                    <View style={estilo.refeicoesstyle}>
                        <TouchableOpacity onPress={()=>navigation.navigate("Alterar",{
                            id: item.id,
                            nomeRefeicao: item.nomeRefeicao,
                            bebida: item.bebida,
                            sobremesa: item.sobremesa
                        })}>
                            <View style={estilo.itens}>
                                <Text style={estilo.titulo2}>Refeição <Text>{item.nomeRefeicao}</Text> </Text>
                                <Text style={estilo.titulo2}>Bebida <Text>{item.bebida}</Text> </Text>
                                <Text style={estilo.titulo2}>Sobremesa <Text>{item.sobremesa}</Text> </Text>
                            </View>
                        </TouchableOpacity>
                        <View estyle={estilo.botaodeletar}>
                            <TouchableOpacity onPress={()=>{deleteRefeicao(item.id)}}>
                            
                                <Text style={estilo.deletar}> [X] </Text>

                            </TouchableOpacity>
                        </View>

                    </View>
                );
            }}            
      />
      <TouchableOpacity onPress={()=> navigation.navigate("Cadastrar")}>
        
        <Text style={estilo.cadastrar}>[+]</Text>

      </TouchableOpacity>
   </View>
);

}


const estilo = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titulo:{
        
      marginTop: 50,
      fontSize:30,
        color: 'Black',
        
    },
    itens:{
        zIndex:1,
        color: 'black',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
    },
    titulo2:{
        fontSize: 25,
        color:"black",
    },
 
   
    refeicoesstyle:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 10,
      marginVertical: 10,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius:10
    },
    botaodeletar:{
        fontSize: 50,
        zIndex:1,
        Color:'Black',
      textAlignVertical: 'center',
      marginVertical: 20,
      left:180,
    },
    deletar:{
        fontSize: 20,
        color:"Black",
    },
    cadastrar:{
        zIndex:1,
        Color:'green',
        fontSize: 50,
        color:"Black",
        left:180,
        bottom:20,

    },
    
    addbutton:{
    backgroundColor: '#ffffff',
    borderRadius: 50,
    position: 'absolute',
    left: 20,
    bottom: 40,
    justifyContent: "center",
    alignItems: "center"
    }
});
