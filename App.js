import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react'; //////////////////////////////////////////////////////////////////
import { firebase } from './config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native'


import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import Header from './components/Header';
import HeaderDashoard from './components/HeaderDashoard';

// import AlarmScreen from './screen/alarm';
// import LoginScreen from './screen/login';
// import SignupScreen from './screen/signup';
// import Aircon from './screen/aircon';
// import Door from './screen/door';
// import DoorPass from './screen/doorPass';
import TempScreen from './screen/temp';
import HumidScreen from './screen/humid';
import Profilescreen from './screen/profile';
// import Home from './screen/home';
// import SettingScreen from './screen/settings';
// import LightScreen from './screen/light';
// import NotificationsScreen from './screen/notification';
// import Windows from './screen/windows';
import BottomTab from './screen/bottomTab';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();


function App() {
    const [initializing, setInitializing] = useState(true);  // khởi tạo
    const [user, setUser] = useState();

    // Xử lý các thay đổi trạng thái người dùng
    function onAuthStateChanged(user) {
        setUser(user); //chuyển trạng thái đăng nhập người dùng
        // console.log(user)
        if (initializing) setInitializing(false); // nếu đã khởi tạo, chuyển trạng thái khởi tạo thành false
    }
    loginUser = async () => {
        try {
            const value = await Promise.all([AsyncStorage.getItem("email"), AsyncStorage.getItem("password")])
            const email = JSON.parse(value[0])
            const password = JSON.parse(value[1])
            if(email && password) {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            }
        } catch (error) {
            alert(error.message)
        }
    }
	// thực thi ngay lúc render ra giao diện 
    useEffect(() => {
        loginUser()
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged); //để lấy ra thông tin của user đăng nhập
        return subscriber
    }, []) // gọi 1 lần khi render thôi

    if (initializing) return null;

    // người dùng chưa đăng nhập
    if (!user){
        return(
            <Stack.Navigator>
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options ={{
                        headerTitle: () => <Header name="Dev Bug" />,
                        headerStyle: styles.headerStyle
                    }}
                />
                <Stack.Screen 
                    name="Registration" 
                    component={Registration} 
                    options ={{
                        headerTitle: () => <Header name="Dev Bug" />,
                        headerStyle: styles.headerStyle
                    }}
                />
            </Stack.Navigator>
        )
    }
    // người dùng đăng nhập
    return (
        init({
        size: 10000,
        storageBackend: AsyncStorage,
        defaultExpires: 1000 * 3600 * 24,
        enableCache: true,
        reconnect: true,
        sync : {
        }
        }),

        <Stack.Navigator>
            <Stack.Screen 
                name="Dashboard" 
                component={Dashboard} 
                options ={{
                    headerTitle: () => <HeaderDashoard />,
                    headerStyle: styles.headerStyle
                }}
            />         
            <Stack.Screen
                name={'ProfileScreen'}
                component={Profilescreen}
                options ={{
                    headerTitle: () => <Header name="Dev Bug" />,
                    headerStyle: styles.headerStyle
                }}
            >
            </Stack.Screen> 
            <Stack.Screen
                name={'HumidScreen'}
                component={HumidScreen}
                options ={{
                    headerTitle: () => <Header name="Dev Bug" />,
                    headerStyle: styles.headerStyle
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name={'TempScreen'}
                component={TempScreen}
                options={{ 
                    headerTitle: () => <Header name="Dev Bug" />,
                    headerStyle: styles.headerStyle 
                }}>
            </Stack.Screen>  
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerStyle:{
        backgroundColor: '#00e4d0',
        shadowColor: '#000',
        elevation: 25,
        height: 150,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
})

export default () => {
    return(
        <NavigationContainer>
            <App/>
        </NavigationContainer>
    )
}
