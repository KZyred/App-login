import {LineChart} from "react-native-chart-kit";
import React, {Component,useState} from 'react';
import { StyleSheet, View, ToastAndroid, Button, Text, ActivityIndicator, Modal, Alert,Dimensions,Pressable,Image } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BottomTab from './bottomTab';

const MAX_POINTS = 100; //max
export default class HumidScreen extends Component{
  constructor(props) {
    super(props);
    const client = new Paho.MQTT.Client('649854c970724a85bddfaa264c15813d.s1.eu.hivemq.cloud', 8884, 'APP_Android'); 
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
    client.connect({
      useSSL: true, 
      userName:'dungducghi', 
      password:'0982839224', 
      onSuccess: this.onConnect
    });
    this.state = {
      client,
      modal: true, //isloading.1
      data: [0,0,0,0,0],
      humid: [0,0,0,0,0],
      h: '',
      width: Dimensions.get("screen").width * 0.8,
    };
  }

  onConnectionLost = (responseObject) => {
    if(responseObject.errorCode !== 0){
      ToastAndroid.show('Mất kết nối:'+responseObject.errorMessage,ToastAndroid.LONG,ToastAndroid.CENTER);
    }
  }

  onConnect = () => {
    const { client } = this.state;
    client.subscribe('sensor1');
    // ToastAndroid.show("¡kết nối thành công!",ToastAndroid.LONG,ToastAndroid.CENTER);
    this.setState({modal: false}); //isloading.2
  }

  onMessageArrived = (message) => {
    const {humid} = this.state;
    // console.log("onMessageArrived:" + message.payloadString);
    if (message.topic == "sensor1")
    {
      let arrayStrig = message.payloadString.split(",");
      if (humid.length == 5)  // nếu mảng độ dài 5,  var humid = [50, 51, 49, 51, 51];
      {
        humid.shift(); // loại bỏ phần tử đầu tiên của mảng vd 50
      }
      humid.push(parseFloat(arrayStrig[1])); // thêm vào cuối mảng 1 phần tử mới
      this.setState({h:parseInt(arrayStrig[1])});
      this.setState({data:humid});
    }
  }

  render() {
    const { modal, data, humid,h,width } = this.state;
    const fill = (h / MAX_POINTS) * 100; // tỉ lệ %
    const { navigation } = this.props; //props nhảy sang màn hình khác ?????????????
    return (
    <View style={{flex:1}}>
      <View style={{justifyContent:"center",alignItems:"center", paddingTop:29}}>
        <AnimatedCircularProgress
            size={250}
            width={36}
            backgroundWidth={21}
            fill={fill}
            tintColor="#70ff33"
            tintColorSecondary="#ff6a0d"
            backgroundColor="#e6d5f0"
            arcSweepAngle={240}
            rotation={240}
            lineCap="round"
          >
              {
                (fill) => (
                  <Text style = {styles.textData}>
                    {h}%
                  </Text>
                )
              } 
        </AnimatedCircularProgress>
      </View>
      <View style={{marginHorizontal: '5%', alignItems:"center"}}>
        <Text> Humid Line Chart</Text>
        <LineChart
            data={{
              labels: ["1 min", "45 sec", "30 sec", "15 sec", "Now"],
              datasets: [{data: data}]
            }}
            width={width} 
            height={220}
            chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
            }}
            bezier
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />
      </View>
      <BottomTab navigation={navigation}/>
      {/* <Button title="Refresh" onPress={refresh_data} />  */}
        <Modal animationType="slide"  transparent={true} visible={modal} >  
        {/* //modal ?! (transparent mờ đi gần như hết model chỉ hiện nội dung) */}
          <View style={{flex:1, justifyContent:"center", backgroundColor:"black" ,opacity:0.1}}>
            <ActivityIndicator color="black" size = {100}/>
          </View>
        </Modal>
  </View>
    );
  }
}
const styles = StyleSheet.create({
  textData:{
    fontSize: 36,
    fontWeight: '300',
  }
});