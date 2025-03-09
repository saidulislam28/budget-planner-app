import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import services from '../../utils/services'
import { Link, useRouter } from 'expo-router'
import { supabase } from '../../utils/SupabaseConfig'
import Header from "../../components/Header"
import Colors from '../../utils/Colors'
// import CircularChart from '../../components/CircularChart'
import AntDesign from '@expo/vector-icons/AntDesign';
import CategoryList from '../../components/CategoryList';

export default function Home() {

    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();


    useEffect(() => {
        checkUserAuth();
        getCategoryList()

    }, [])

    const checkUserAuth = async () => {
        const result = await services.getData('login');
        if (result !== 'true') {

            // router.replace('/login')

        }
        console.log("result", result)
    }

    const getCategoryList = async () => {
        setLoading(true)

        const { data, error } = await supabase.from('Category')
            .select('*,CategoryItems(*)')
        setCategoryList(data);
        data && setLoading(false);
    }

    return (
        <View style={{
            marginTop: 20,
            flex: 1
        }}>
            <ScrollView
                refreshControl={<RefreshControl onRefresh={() => getCategoryList()} refreshing={loading} />}
            >
                <View style={{
                    marginTop: 20,
                    padding: 20,
                    backgroundColor: Colors.PRIMARY
                }}>
                    <Header>

                    </Header>


                </View>
                <CategoryList categoryList={categoryList} />
            </ScrollView>
            <Link href="/add_new_category" style={styles.buttonContainer}>
                <AntDesign name="pluscircle" size={44} color={Colors.PRIMARY} />
            </Link>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16


    }
})