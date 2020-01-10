import React from "react";
import { Platform } from "react-native";
import { createSwitchNavigator } from 'react-navigation';

import {createStackNavigator} from "react-navigation-stack";
import UserScreen from "./screens/UserScreen";
import TabBarIcon from "./components/TabBarIcon";
import MapScreen from "./screens/MapScreen";
import AlarmScreen from "./screens/AlarmScreen";
import MoreScreen from "./screens/MoreScreen";
import {createBottomTabNavigator} from "react-navigation-tabs";
import Colors from "./constants/Colors";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Colors.tabBar
    }
};

const UserStack = createStackNavigator({
    Profile: UserScreen
}, { defaultNavigationOptions });

UserStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-person`
                    : 'md-person'
            }
        />
    ),
};

UserStack.path = '';

const MapStack = createStackNavigator({
    Map: MapScreen
}, { defaultNavigationOptions });

MapStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-map`
                    : 'md-map'
            }
        />
    ),
};

MapStack.path = '';

const AlarmStack = createStackNavigator({
    Alarm: AlarmScreen
}, { defaultNavigationOptions });

AlarmStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-alert`
                    : 'md-alert'
            }
        />
    ),
};

AlarmStack.path = '';

const MoreStack = createStackNavigator({
    More: MoreScreen
}, { defaultNavigationOptions });

MoreStack.navigationOptions = {
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information`
                    : 'md-information'
            }
        />
    ),
};

MoreStack.path = '';

export const MainNav = createBottomTabNavigator(
    {
        User: UserStack,
        Alarm: AlarmStack,
        Map: MapStack,
        More: MoreStack,
    },
    {
        tabBarOptions: {
            showLabel: false, // hide labels
            style: {
                backgroundColor: Colors.tabBar,
            },
            tabStyle: {
                backgroundColor: Colors.tabBar,
            },
        },
        initialRouteName: "User"
    }
);

export const DefaultNav = createStackNavigator({
    Login: {
        screen: LoginScreen,
    },
    Register: {
        screen: RegisterScreen,
    }
});

export const createRootNavigator = (isLogin = false) => {
    return createSwitchNavigator(
        {
            Main: {
                screen: MainNav
            },
            Default: {
                screen: DefaultNav
            }
        },
        {
            initialRouteName: isLogin ? "Main" : "Default"
        }
    );
};