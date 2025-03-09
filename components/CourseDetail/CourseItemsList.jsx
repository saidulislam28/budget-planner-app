import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function CourseItemsList({ categoryData }) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>CourseItemsList</Text>
            <View style={{ marginTop: 20 }}>
                {categoryData?.CategoryItems?.map((item, index) => (
                    <View style={styles.Itemcontainer} key={index}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={{flex: 1}}>
                            <Text>{item.name}</Text>
                            <Text>{item.url}</Text>
                        </View>

                        <Text>${item.cost}</Text>

                    </View>
                ))}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 15
    },
    Itemcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
        marginTop: 10
    }
})