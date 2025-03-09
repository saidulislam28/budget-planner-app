import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
export default function CourseInfo({ categoryData }) {

    const [totalCost, setTotalCost] = useState();
    const [perctotal, setPerctotal] = useState(0)

    useEffect(()=>{
        calculateTotalPerc()
    }, [categoryData])

    const calculateTotalPerc =()=>{

        let total = 0;
        categoryData?.CategoryItems?.forEach(item=>{
            total=total+item.cost;
        })
        
        setTotalCost(total)

        const perc = (total/categoryData.assigned_budget)* 100
        setPerctotal(perc)
    }


    return (
        <View>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Text style={[styles.textIcon, { backgroundColor: categoryData?.color }]}>
                        {categoryData.icon}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.categoryName}>{categoryData.name}</Text>
                    <Text style={styles.categoryItemText}>{categoryData?.CategoryItems?.length} Items</Text>
                </View>
                <FontAwesome name="trash" size={30} color="red" />
            </View>
            {/* progress bar  */}
            <View style={styles.amountContainer}>
                <Text>${totalCost}</Text>
                <Text style={{fontWeight: '500'}}> Total Budget: {categoryData.assigned_budget}</Text>
            </View>
            <View style={styles.progressBarMainContainer}>
                <View style={[styles.progressBarSubContainer,{width: perctotal+'%'}]}>

                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    textIcon: {
        fontSize: 20,
        padding: 20,
        borderRadius: 15
    },
    iconContainer: {
        alignItems: 'baseline',
        justifyContent: 'center'
    },
    container: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center'
    },
    categoryName: {
        fontWeight: 'bold',
        fontSize: 20,

    },
    categoryItemText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    amountContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15

    },
    progressBarMainContainer:{
        width: '100%',
        height: 15,
        backgroundColor: Colors.GRAY,
        borderRadius: 99,
        marginTop: 10


    },
    progressBarSubContainer:{

        width: '40%',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        height: 15

    }


})