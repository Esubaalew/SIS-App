import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursesScreen from '../Tabs/CoursesScreen';
import StaffsScreen from '../Tabs/StaffScreen';
import AboutScreen from '../Tabs/AboutScreen';
import CourseDetails from '../Stacks/CourseDetails';
import { WebView } from 'react-native-webview';
import WebviewScreen from '../Tabs/WebViewScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CoursesStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Courses" component={CoursesScreen} options={{ title: 'Courses' }} />
            <Stack.Screen
                name="CourseDetails"
                component={CourseDetails}
                options={({ route }) => ({
                    title: route.params.course.name,
                })}
            />
        </Stack.Navigator>
    );
};


const MainContentScreen = () => {
    const theme = useTheme();

    return (
        <PaperProvider theme={theme}>
            <Tab.Navigator
                initialRouteName="Courses"
                activeColor={theme.colors.primary}
                inactiveColor={theme.colors.text}
                barStyle={{ backgroundColor: theme.colors.background }}
                shifting={true}
            >
                <Tab.Screen
                    name="CoursesTab"
                    component={CoursesStack}
                    options={{
                        tabBarIcon: ({ color }) => <Icon name="book" color={color} size={22} />,
                        tabBarLabel: 'Courses',
                    }}
                />
                <Tab.Screen
                    name="Staffs"
                    component={StaffsScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Icon name="account-group" color={color} size={22} />,
                        tabBarLabel: 'Staffs',
                    }}
                />
                <Tab.Screen
                    name="Webview"
                    component={WebviewScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Icon name="web" color={color} size={22} />,
                        tabBarLabel: 'Website',
                    }}
                />
                <Tab.Screen
                    name="About"
                    component={AboutScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Icon name="information" color={color} size={22} />,
                        tabBarLabel: 'About',
                    }}
                />
            </Tab.Navigator>
        </PaperProvider>
    );
};

export default MainContentScreen;
