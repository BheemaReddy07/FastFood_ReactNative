import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Fragment } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native'
import { images, offers } from '../utils/constants'
import cn from 'clsx';
import { TouchableOpacity } from 'react-native'
import CartButton from '../components/cartButton'
import { useNavigation } from '@react-navigation/native'
const HomeTab = () => {
    const navigation = useNavigation();
    const navigateToSearch = (category) => {
        navigation.navigate('Search', { category });
    };
    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                data={offers}
                renderItem={({ item, index }) => {
                    const isEven = index % 2 == 0;
                    let category;
                    if (index === 0) {
                        category = '686ceca2001bee7e5e58';
                    } else if (index === 1) {
                        category = '686ceca30024465bb069';
                    } else if (index === 2) {
                        category = '686ceca20034bda8047b';
                    } else if (index === 3) {
                        category = '686ceca3000d18ee3d9b';
                    }
                    return (
                        <View>
                            <Pressable onPress={() => navigateToSearch(category)} className={cn("w-full h-48 my-3 rounded-xl overflow-hidden shadow-lg flex items-center gap-5", isEven ? "flex-row-reverse" : "flex-row")} style={{ backgroundColor: item.color }} android_ripple={{ color: "#fffff22" }}>
                                {({ pressed }) => (
                                    <Fragment>
                                        <View className={"w-1/2 h-full"}>
                                            <Image source={item.image} className={"size-full"} resizeMode={"contain"} />
                                        </View>
                                        <View className={cn(" flex-1 h-full flex flex-col justify-center items-start gap-4", isEven ? 'pl-10' : 'pr-10')}>
                                            <Text className="text-3xl font-quicksand-bold text-white leading-tight">{item.title}</Text>
                                            <Image source={images.arrowRight} className="size-10" resizeMode="contain" tintColor="#ffffff" />
                                        </View>
                                    </Fragment>
                                )}
                            </Pressable>
                        </View>
                    )
                }}
                contentContainerClassName="pb-28 px-5"
                ListHeaderComponent={() => (
                    <View className="flex-between flex-row w-full my-5">
                        <View className="flex-start">
                            <Text className="small-bold text-primary">DELIVER TO</Text>
                            <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                                <Text className="paragraph-bold text-dark-100">Croatia</Text>
                                <Image source={images.arrowDown} className="size-3" resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                        <CartButton />

                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default HomeTab

const styles = StyleSheet.create({})