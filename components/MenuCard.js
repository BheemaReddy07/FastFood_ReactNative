import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import cn from 'clsx'
import { useCartStore } from '../store/cart.store';
const MenuCard = ({ item }) => {
    const { $id, image_url, name, price } = item;
    const {addItem} = useCartStore();
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
            <TouchableOpacity onPress={() => addItem({id:$id,name,price,image_url,customizations:[]})}>
                <Text className="paragraph-bold text-primary">Add to Cart +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default MenuCard

const styles = StyleSheet.create({})