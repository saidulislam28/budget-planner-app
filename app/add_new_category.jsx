import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors'
import ColorPicker from '../components/ColorPicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import {supabase} from '../utils/SupabaseConfig'
export default function add_new_category() {
  const [selectedIcon, setSelectedIcon] = useState('IC');
  const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);
  const [categoryName, setCategoryName] = useState()
  const [totalBudget, setTotalBudget] = useState()


  const onCreateCategory = async () => {
    try {
      const { data, error } = await supabase
        .from('Category') 
        .insert([
          {
            name: categoryName,
            assigned_budget: Number(totalBudget), // Ensure this is a number
            icon: selectedIcon,
            color: selectedColor,
            created_by: 'saiduldev28@gmail.com',
          },
        ])
        .select();
  
      if (error) {
        console.error('Supabase Insert Error:', error.message);
       
        return;
      }
  
      console.log('Inserted Data:', data);
      
    } catch (err) {
      console.error('Unexpected Error:', err);
     
    }
  };
  



  return (
    <View style={{
      marginTop: 20,
      padding: 20,

    }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(value => setSelectedIcon(value))}
        >{selectedIcon}</TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        ></ColorPicker>
      </View>


      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
        <TextInput onChangeText={(v) => setCategoryName(v)} style={{ width: "100%" }} placeholder='Category Name' />
      </View>


      <View style={styles.inputView}>
        <Feather name="dollar-sign" size={24} color={Colors.GRAY} />
        <TextInput onChangeText={(v) => setTotalBudget(v)} keyboardType='numeric' style={{ width: "100%" }} placeholder='Total Budget' />
      </View>


      <TouchableOpacity onPress={() => onCreateCategory()} style={styles.button}
        disabled={!categoryName || !totalBudget}
      >
        <Text style={{
          textAlign: 'center',
          fontSize: 16, color: Colors.WHITE
        }}>Create</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  iconInput: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    borderRadius: 99,
    paddingHorizontal: 28,
    color: Colors.WHITE

  },
  inputView: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    padding: 14,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    marginVertical: 15
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 30
  }
})