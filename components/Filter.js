import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import cn from 'clsx'
const Filter = ({ categories }) => {
   const route = useRoute();
   const navigation = useNavigation();
   const [active, setActive] = useState(route.params?.category || '');
   const handlePress = (id) => {
      setActive(id);
      if (id === 'all') {
         navigation.setParams({ category: undefined });
      } else {
         navigation.setParams({ category: id });
      }
   }
   const filterData = categories ? [{ $id: 'all', name: 'All' }, ...categories] : [{ $id: 'all', name: 'All' }]
   return (
      <FlatList 
      horizontal
         data={filterData}
         keyExtractor={(item) => item.$id}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{ gap: 8, paddingBottom: 12 }}
         renderItem={({ item }) => (
            <TouchableOpacity
               key={item.$id}
               className={cn('px-6 py-3 rounded-full mr-2 shadow-sm shadow-black/10', active === item.$id ? 'bg-amber-500' : 'bg-white')}
               style={Platform.OS === 'android' ? { elevation: 5, shadowColor: '#878787' } : {}}
               onPress={() => handlePress(item.$id)}
            >
               <Text className={cn('text-md  font-semibold', active === item.$id ? 'text-white' : 'text-gray-200')}>{item.name}</Text>

            </TouchableOpacity>
         )}
      />
   )
}

export default Filter

const styles = StyleSheet.create({})