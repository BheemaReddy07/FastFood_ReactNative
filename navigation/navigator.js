import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { ApplicationScreens, images } from "../utils/constants";
import HomeTab from "../screens/HomeTab";
import Search from "../screens/Search";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import { Image, Text, View } from "react-native";
import MIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import cn from 'clsx'
import React from "react";
// flex items-center justify-center gap-1 w-16 h-full mt-2

const TabBarIcon = ({ focused, icon, title }) => (
    <View className="flex items-center justify-center gap-1 min-w-[88px]  h-full mt-2">
        {typeof icon === 'number' ? (
            <Image
                source={icon}
                className="w-6 h-6"
                resizeMode="contain"
                tintColor={focused ? '#FE8C00' : '#5D5F6D'}
            />
        ) : (
            React.cloneElement(icon, {
                size: 24,
                color: focused ? '#FE8C00' : '#5D5F6D',
            })
        )}
        <Text
            style={{
                fontSize: 9,
                fontWeight: '600',
                color: focused ? '#FE8C00' : '#A0A0A0',
            }}
            numberOfLines={1}
        >
            {title}
        </Text>
    </View>
);

const Tab = createBottomTabNavigator();
export const NavigationController = () => {
    return <NavigationContainer>
        <TabNavigators />
    </NavigationContainer>
}

const TabNavigators = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                marginHorizontal: 20,
                height: 60,
                position: 'absolute',
                bottom: 40,
                backgroundColor: 'white',
                elevation: 5,
                paddingBottom: 10,
                paddingTop: 10,
            }


        }}>
            <Tab.Screen name={ApplicationScreens.Home_Tab} options={{
                title: 'Home',
                tabBarIcon: ({ focused }) => <TabBarIcon title="Home" icon={<MIcon name="home" />} focused={focused} />
            }} component={HomeTab} />
            <Tab.Screen name={ApplicationScreens.Search} options={{
                title: 'Search',
                tabBarIcon: ({ focused }) => <TabBarIcon title="Search" icon={<MIcon name="search" />} focused={focused} />
            }} component={Search} />
            <Tab.Screen name={ApplicationScreens.Cart} options={{
                title: 'Cart',
                tabBarIcon: ({ focused }) => <TabBarIcon title="Cart" icon={<FontAwesome name="shopping-bag" color="#000" size={24} />} focused={focused} />
            }} component={Cart} />
            <Tab.Screen name={ApplicationScreens.Profile} options={{
                title: 'Profile',
                tabBarIcon: ({ focused }) => <TabBarIcon title="Profile" icon={<MIcon name="person" />} focused={focused} />
            }} component={Profile} />
        </Tab.Navigator>
    )
}

