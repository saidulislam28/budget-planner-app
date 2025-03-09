import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { supabase } from '../utils/SupabaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import CourseInfo from '../components/CourseDetail/CourseInfo';
import CourseItemsList from '../components/CourseDetail/CourseItemsList';
import Colors from '../utils/Colors';
export default function Category_details() {
    const { categoryId } = useLocalSearchParams();
    const [categoryData, setCategoryData] = useState([]);
    const router = useRouter();


    useEffect(() => {
        console.log(categoryId)
        getCategoryDetail();
    }, [categoryId])

    const getCategoryDetail = async () => {
        const { data, error } = await supabase.from('Category')
            .select('*, CategoryItems(*)')
            .eq('id', categoryId)
        setCategoryData(data[0])


        console.log("cateeee", data)
    }


    return (
        <View style={{ padding: 15, marginTop: 20, flex: 1 }}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle" size={44} color="black" />
            </TouchableOpacity>
            <CourseInfo categoryData={categoryData} />
            <CourseItemsList categoryData={categoryData} />

            <Link
                href={{

                    pathname: '/AddNewCategoryItem',
                    params: {
                        categoryId: categoryData.id
                    }
                }}
                style={styles.floatingBtn}>
                <Ionicons name="add-circle" size={44} color={Colors.PRIMARY} />
            </Link>
        </View>
    )
}
const styles = StyleSheet.create({
    floatingBtn: {
        position: 'absolute',
        bottom: 16,
        right: 16
    }
})