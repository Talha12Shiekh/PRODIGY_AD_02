import { Animated, Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useAnimatedValue, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { BG_COLOR, BLACK_COLOR, GREEN_COLOR } from '../Constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SingleButton } from './WelcomeScreen'
import BackButton from '../Components/BackButton'

const SignInScreen = () => {
  const [isKeyboardVisible,setisKeyboardVisible] = useState(false);

  const keyboardShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      setisKeyboardVisible(true)
    }
);
const keyboardHideListener = Keyboard.addListener(
    'keyboardDidHide',
    () => {
      setisKeyboardVisible(false)
    }
);

  return (
   
      <View style={styles.container}>
        <View style={styles.screenameandbackbtncontainer}>
        <BackButton/>
          <Text style={styles.topheading}>Sign in</Text>
        </View>
        <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
          <View style={{flex:1}}>

        <View style={styles.imgandinputcontainer}>

          {!isKeyboardVisible && <Image
            resizeMode='contain'
            source={require("../assets/images/login.png")}
            style={styles.image}
          />}
          <View style={[styles.inptcontainer,{justifyContent:isKeyboardVisible?"center":""}]}>
            <View>

              <Text style={styles.inputplaceholder}>Email</Text>
              <TextInput
                style={styles.input}
              />
            </View>
            <View>

              <Text style={styles.inputplaceholder}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
              />
              <View style={{ alignSelf: "flex-end", marginRight: wp(5),marginTop:wp(5) }}>
                <TouchableOpacity>
                  <Text >Forget Password ?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.btncontainer}>
          <SingleButton
            text={"Sign in"}
            onPress={() => { }}
            />
        </View>
        </View>

        </KeyboardAvoidingView>
      </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR
  },
  imgandinputcontainer: {
    flex: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  btncontainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom:wp(5)
  },
  image: {
    width: wp(80),
    height: wp(100),
  },
  inptcontainer: {
    flex: 1,
    width: "100%",
    gap: wp(8),
  },
  input: {
    width: "95%",
    backgroundColor: BLACK_COLOR,
    alignSelf: "center",
    borderRadius: 50,
    color: "white",
    fontSize: wp(3),
    paddingHorizontal: wp(4),
    fontFamily: "Poppins-Regular",
    paddingBottom: 5
  },
  inputplaceholder: {
    fontSize: wp(3.5),
    fontFamily: "Poppins-Regular",
    marginLeft: wp(6),
    marginBottom: wp(1)
  },
  topheading: {
    textAlign: "center",
    paddingTop: wp(5),
    fontSize: wp(5),
    fontFamily: "Poppins-Regular",
    color: "white"
  }
})