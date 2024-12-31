import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BG_COLOR, DARK_GREEN_COLOR, GREEN_COLOR } from '../Constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import GoggleIcon from "../assets/images/googleIcon.png";
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
  
} from '@react-native-google-signin/google-signin';


export const SingleButton = ({ text, onPress }) => <TouchableOpacity onPress={onPress}>
  <View style={styles.singlebtn}>
    <Text style={styles.btntext}>{text}</Text>
  </View>
</TouchableOpacity>;

const WelcomeScreen = ({ navigation,setuserimage }) => {

  GoogleSignin.configure({
    webClientId: '750472851543-e968ds7phcn9i8lhak0kglq1tnafmmjh.apps.googleusercontent.com',
  });

  // PENDING GOGGLE SIGN IN

  const handleGoggleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      const { idToken } = await GoogleSignin.signIn();
      
      const getToken = await GoogleSignin.getTokens()
  
      const googleCredential = auth.GoogleAuthProvider.credential(getToken.idToken);

      const user = await auth().signInWithCredential(googleCredential);
      
      setuserimage({image:user.additionalUserInfo.profile.picture,goggleSignIn:true});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the sign-in.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign-in is in progress.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services not available.");
      } else {
        console.log("Unknown error:", error);
      }
    }
  };
  



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
        <TouchableOpacity onPress={handleGoggleSignIn}>
          <View style={[styles.singlebtn,{backgroundColor:"white",borderWidth:1,gap:10,padding:0}]}>
            <Image
            source={GoggleIcon}
            style={styles.ggleicn}
            resizeMode='contain'
            />
            <Text style={[styles.btntext,{color:"black"}]}>Sign In with google</Text>
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