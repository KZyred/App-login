import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react'; //////////////////////////////////////////////////////////////////
import { firebase } from './config';

import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import Header from './components/Header';

const Stack = createStackNavigator();

function App() {
    const [initializing, setInitializing] = useState(true);  // khởi tạo
    const [user, setUser] = useState();

    // Xử lý các thay đổi trạng thái người dùng
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false); // nếu đã khởi tạo, chuyển trạng thái khởi tạo thành false
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged); //để lấy ra thông tin của user đăng nhập
        return subscriber
    }, []) // gọi 1 lần khi render thôi

    if (initializing) return null;

    // nếu người dùng đã đăng nhập trước đó
    if (!user){
        return(
            <Stack.Navigator>
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options ={{
                        headerTitle: () => <Header name="Dev Bug" />,
                        headerStyle: {
                            backgroundColor: '#00e4d0',
                            shadowColor: '#000',
                            elevation: 25, // đổ bóng
                            height: 150,
                            borderBottomLeftRadius: 50,
                            borderBottomRightRadius: 50,
                        }
                    }}
                />
                <Stack.Screen 
                    name="Registration" 
                    component={Registration} 
                    options ={{
                        headerTitle: () => <Header name="Dev Bug" />,
                        headerStyle: {
                            backgroundColor: '#00e4d0',
                            shadowColor: '#000',
                            elevation: 25,
                            height: 150,
                            borderBottomLeftRadius: 50,
                            borderBottomRightRadius: 50,

                        }
                    }}
                />
            </Stack.Navigator>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Dashboard" 
                component={Dashboard} 
                options ={{
                    headerTitle: () => <Header name="Dashboard" />,
                    headerStyle: {
                        backgroundColor: '#00e4d0',
                        shadowColor: '#000',
                        elevation: 25,
                        height: 150,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,

                    }
                }}
            />            
        </Stack.Navigator>
    );
}
export default () => {
    return(
        <NavigationContainer>
            <App/>
        </NavigationContainer>
    )
}


