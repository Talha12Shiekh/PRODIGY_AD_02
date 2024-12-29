import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BG_COLOR, DARK_GREEN_COLOR, GREEN_COLOR } from '../Constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import GoggleIcon from "../assets/images/googleIcon.png";
import auth from '@react-native-firebase/auth';


export const SingleButton = ({ text, onPress }) => <TouchableOpacity onPress={onPress}>
  <View style={styles.singlebtn}>
    <Text style={styles.btntext}>{text}</Text>
  </View>
</TouchableOpacity>;

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require("../assets/images/welcome.gif")}
        />
      </View>
      <View style={styles.btnsContainer}>
        <View style={styles.headingcontainer}>
          <Text style={styles.heading}>Tk Todos</Text>
        </View>
        <SingleButton
          text="Sign In"
          onPress={() => {
            navigation.navigate("SignIn")
          }}
        />
        <SingleButton
          text="Sign Up"
          onPress={() => {
            navigation.navigate("SignUp")
          }}
        />
        <TouchableOpacity onPress={() => {}}>
          <View style={[styles.singlebtn,{backgroundColor:"white",borderWidth:1,gap:10,padding:0}]}>
            <Image
            source={GoggleIcon}
            style={styles.ggleicn}
            resizeMode='contain'
            />
            <Text style={[styles.btntext,{color:"black"}]}>Sign In with goggle</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  imgContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  btnsContainer: {
    flex: 1,
    gap: 10,
    paddingBottom: wp(10),
  },
  singlebtn: {
    width: "90%",
    backgroundColor: DARK_GREEN_COLOR,
    padding: wp(2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    flexDirection: "row"
  },
  btntext: {
    fontFamily: "Poppins-Regular",
    color: "white",
    fontSize: wp(4)
  },
  heading: {
    color: "black",
    textAlign: "center",
    fontSize: wp(6),
    fontFamily: "Poppins-Regular",
  },
  headingcontainer: {
    flex: 0.5, alignItems: "center",

  },
  ggleicn: {
    width: wp(5),
    height: hp(5),
    margin:0
  }
})


export default WelcomeScreen