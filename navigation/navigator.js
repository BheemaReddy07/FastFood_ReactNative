// NavigationController.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Image } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeTab from '../screens/HomeTab';
import Search from '../screens/Search';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import { getCurrentUser } from '../lib/appwrite';
import useAuthStore from '../store/auth.store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, icon, title }) => (
    <View className="items-center justify-center gap-1 min-w-[88px] h-full mt-2">
        {React.cloneElement(icon, {
            size: 24,
            color: focused ? '#FE8C00' : '#5D5F6D',
        })}
        <Text style={{ fontSize: 9, fontWeight: '600', color: focused ? '#FE8C00' : '#A0A0A0' }}>
            {title}
        </Text>
    </View>
);

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderRadius: 50,
                    marginHorizontal: 20,
                    height: 60,
                    position: 'absolute',
                    bottom: 40,
                    backgroundColor: 'white',
                    elevation: 5,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeTab}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Home" icon={<MIcon name="home" />} focused={focused} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Search" icon={<MIcon name="search" />} focused={focused} />,
                }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Cart" icon={<FontAwesome name="shopping-bag" />} focused={focused} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Profile" icon={<MIcon name="person" />} focused={focused} />,
                }}
            />
        </Tab.Navigator>
    );
};

export const NavigationController = () => {
    const { user, isLoading } = useAuthStore();
    useEffect(() => {
        useAuthStore.getState().fetchAuthenticatedUser();
    }, []);


    if (isLoading) return <Text>Loading data</Text>
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <Stack.Screen name="MainTab" component={MainTab} />
                ) : (
                    <>
                        <Stack.Screen name="SignIn" component={SignIn} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
