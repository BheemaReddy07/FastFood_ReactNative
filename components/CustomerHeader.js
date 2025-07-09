import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { images } from '../utils/constants';
//className="w-full flex flex-row items-center justify-between mb-10"
const CustomerHeader = ({ title }) => {
    const navigation = useNavigation()
    return (
        <View className="W-full flex flex-row items-center justify-between mb-10">
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Image source={images.arrowBack} className='size-5' resizeMode='contain' />
            </TouchableOpacity>
            {title && <Text clasName="base-semibold">{title}</Text>}
            <Image source={images.search} className="size-5" resizeMode="contain" />
        </View>
    )
}

export default CustomerHeader

const styles = StyleSheet.create({})