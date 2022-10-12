import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const Login = () => {
    const navigation = useNavigation(); //dùng điều hướng trang
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password) // đăng nhập firebase bằng email và password đã tạo
        } catch (error) {
            alert(error.message)
        }
    }

    // forget password
    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email) //gửi thư xác nhận reset email
        .then(() => {
            alert('Đã gửi tới email thay đổi mật khẩu. Vui lòng kiểm tra email')
        })
        .catch((error) => {
             if (error.code === "auth/missing-email") {
                alert("Cần điền email phía trên để gửi thông báo reset");
            }
            else {
                alert(error.message);
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 36, paddingVertical: 19, marginTop: 36}}>
                Login
            </Text> 
            <View style={{marginxTop: 40}}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) =>setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput 
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={(Password) =>setPassword(Password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => loginUser(email,password)}    // button login với email và password vừa nhập
                style={styles.button}
            >
                <Text style={{fontWeight: 'bold', fontSize: 22}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}   //////////// chuyển hướng sang trang Registration
                style={{marginTop: 20}}
            >
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    Don't have an account? Register Now
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {forgetPassword()}}  // button reset password với email vừa nhập
                style={{marginTop: 20}}
            >
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    Forget Password
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    textInput: {
        paddingTop: 28,
        paddingBottom: 6,
        width: 300,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 8,
        textAlign: 'center',
    },
    button: {
        marginTop: 50,
        height: 70,
        width:250,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
})

export default Login