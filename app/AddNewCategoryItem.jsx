import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../utils/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../utils/SupabaseConfig';
const placeholder = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

// import * as ImagePicker from 'expo-image-picker';

export default function AddNewCategoryItem() {
    const [image, setImage] = useState(placeholder);
    const [Name, setName] = useState()
    const [url, setUrl] = useState()
    const [cost, setCost] = useState()
    const [note, setNote] = useState()
    const { categoryId} = useLocalSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    // const onImagePick = async () => {
    //     console.log("cliccked")
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ['images', 'videos'],
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);
    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //     }
    // };

    const onClickAdd = async ()=>{
        setLoading(true)
        const {data, error} = await supabase.from('CategoryItems')
        .insert([{
            name: Name,
            cost: cost,
            url: url,
            image: image,
            note: note,
            category_id: categoryId

        }]).select();

         ToastAndroid.show('new item added!!!!', ToastAndroid.SHORT)
         setLoading(false)
         router.replace({
            pathname: '/Category_details',
            params: {
              categoryId: categoryId
            }
          })
    }


    return (
        <KeyboardAvoidingView>
        <ScrollView style={{ padding: 20 }}>
            <TouchableOpacity>
                <Image style={styles.image} source={{ uri: image }} />
            </TouchableOpacity>
            <View style={styles.textInputContainer}>
                <FontAwesome name="tag" size={24} color="black" />
                <TextInput style={styles.input} 
                onChangeText={(value)=>setName(value)}
                placeholder='Item Name' />
            </View>
            <View style={styles.textInputContainer}>
                <FontAwesome name="tag" size={24} color="black" />
                <TextInput  style={styles.input} onChangeText={(value)=>setCost(value)}keyboardType='number-pad' placeholder='Cost' />
            </View>
            <View style={styles.textInputContainer}>
                <FontAwesome name="tag" size={24} color="black" />
                <TextInput  style={styles.input} onChangeText={(value)=>setUrl(value)}placeholder='Url ' />
            </View>
            <View style={styles.textInputContainer}>
                <FontAwesome name="tag" size={24} color="black" />
                <TextInput style={[styles.input,{ height: 80 }]} 
                onChangeText={(value)=>setNote(value)}placeholder='Note' numberOfLines={4} />
            </View>
            <TouchableOpacity onPress={()=>onClickAdd()}
            disabled={!Name|| !cost}
            style={styles.button}>
               {loading ? <ActivityIndicator /> :
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>Add</Text>
               }
            </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
    )


}
const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150
    },
    textInputContainer: {

        padding: 8,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20

    },
    button: {
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        textAlign: 'center',
        padding: 20,
        marginTop: 20,
        borderRadius: 99
    },
    input: {
        width: '100%',
        fontSize: 16
    }
})