import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../lib/useAppwrite'
import { getCategories, getMenu } from '../lib/appwrite'
import { useRoute } from '@react-navigation/native'
import MenuCard from '../components/MenuCard'
import CartButton from '../components/cartButton'
import SearchBar from '../components/SearchBar'
import cn from 'clsx'
import Filter from '../components/Filter'
const Search = () => {
  const route = useRoute();
  const { category, query } = route.params || {};
  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
  })

  const { data: categories } = useAppwrite({ fn: getCategories })
  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query])
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;
          return (
            <View className={cn("flex-1  max-w-[48%", !isFirstRightColItem ? 'mt-10' : 'mt-0')}>
              <MenuCard item={item} />
            </View>
          )
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => {
          return (
            <View className="my-5 gap-5">
              <View className="flex-between flex-row w-full">
                <View className="flex-start">
                  <Text className=" text-lg font-bold text-primary">Search</Text>
                  <View className="flex-start flex-row gap-x-1 mt-0.5">
                    <Text className="text-base font-quicksand-semibold text-dark-100">
                      Find your favourite food
                    </Text>
                  </View>
                </View>
                <CartButton />
              </View>
              <SearchBar />
              <Filter categories={categories} />
            </View>
          )
        }}
        ListEmptyComponent={() => !loading && <Text>No results</Text>}
      />

    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})