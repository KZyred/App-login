import { View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import { firebase } from '../config'

const Registration = () => {  // đăng kí tài khoản 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    // tạo các hàm để gọi phía dưới
    // hàm đăng kí người dùng
    registerUser = async (email, password, firstName, lastName) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password) // tạo người dùng mới từ email và password
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({  // gửi mail xác nhận tới email vừa đăng kí
                handleCodeInApp: true,
                url:'https://test-32860.firebaseapp.com',  //là authDomain trong config.js
            })
            .then(() => {
                alert('Vertification sent successfully')
                })
            .catch((error) => {
                alert(error.message)
            })

            .then(() => {
                firebase.firestore().collection('users')    
                .doc(firebase.auth().currentUser.uid)
                .set({  // nếu chưa có sẽ được tạo, nếu có rồi thì hợp nhất với dữ liệu đã có, nạp vào
                    firstName,
                    lastName,
                    email,
                    // createdAt: firebase.firestore().FieldValue.serverTimestamp(),
                })
            })
            .catch((error) => {
                alert(error.message)
            })

        })
        .catch((error) => {
            alert(error.message)
        })
    }
    return (
        <View style={styles.container}>
            <Text style={{fontWeight: "bold", fontSize: 23}}>
                Register Here!!
            </Text>
            <View style={{marginTop: 40}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none" //không tự động viết hoa bất cứ thứ gì.
                    autoCorrect={false} //tắt tính năng tự động sửa.
                    secureTextEntry={true} //kiểu nhập văn bản sẽ được che đi
                />
            </View>
            <TouchableOpacity
                onPress={() =>registerUser(email, password, firstName, lastName)}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:22}}>Register</Text>
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
export default Registration