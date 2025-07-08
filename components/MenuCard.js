import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import cn from 'clsx'
const MenuCard = ({ item }) => {
    const { $id, image_url, name, price } = item;
    return (
        <TouchableOpacity className="relative py-9 px-3.5 pt-24 flex items-center justify-end bg-white shadow-md shadow-black/10 rounded-3xl" style={
            Platform.OS === 'android'
                ? { elevation: 10, shadowColor: '#878787' }
                : {}
        }>

            <Image source={{ uri: image_url }} className="size-32 absolute -top-10" resizeMode="contain" />
            <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>
                {name}
            </Text>
            <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
            <TouchableOpacity onPress={() => console.log("add items",$id)}>
                <Text className="paragraph-bold text-primary">Add to Cart +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default MenuCard

const styles = StyleSheet.create({})