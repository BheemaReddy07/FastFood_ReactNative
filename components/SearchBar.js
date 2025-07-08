import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { images } from '../utils/constants';
import { Image } from 'react-native';

const SearchBar = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [query, setQuery] = useState(route.params?.query || '');

    const handleSearch = (text) => {
        setQuery(text);
        if (!text) {
            navigation.setParams({ query: undefined });
        }
    };

    const handleSubmit = () => {
        if (query.trim()) {
            navigation.setParams({ query });
        }
    };

    return (
        <View className="relative flex flex-row items-center justify-center w-full bg-white shadow-md shadow-black/10 rounded-full font-quicksand-medium text-dark-100 gap-5">
            <TextInput
                className="flex-1 gap-5"
                placeholder="Search for pizzas, burgers..."
                value={query}
                onChangeText={handleSearch} // Changed to onChangeText
                onSubmitEditing={handleSubmit}
                placeholderTextColor="#A0A0A0"
                returnKeyType="search"
            />
            <TouchableOpacity
                className="pr-5"
                onPress={() => navigation.setParams({ query })}
            >
                <Image
                    source={images.search}
                    className="size-6"
                    resizeMode="contain"
                    tintColor="#5D5F6D"
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({});