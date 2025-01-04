import { ActivityIndicator, KeyboardAvoidingView, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { SingleButton } from '../Screens/WelcomeScreen'
import BackButton from '../Components/BackButton'
import { styles } from '../styles'
import ImagePickerContainer from '../Components/ImagePickerContainer';
import topimage from "../assets/images/emailenterimage.png";
import { firebase } from '@react-native-firebase/auth'
import { handleShowSnackbar } from './SignInScreen'
import { DARK_GREEN_COLOR } from '../Constants'

const EmailEnterScreen = () => {

  const [isKeyboardVisible, setisKeyboardVisible] = useState(false);
  const [email, setemail] = useState("");

  const [loading, setloading] = useState(false);


  async function handleButtonClick() {
    setloading(true);
    if (email) {
      try {
        await firebase.auth().sendPasswordResetEmail(email);
        setloading(false)
        ToastAndroid.show("Email sent !", ToastAndroid.SHORT);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    } else {
      handleShowSnackbar("Please first enter a email");
      setloading(false);
    }

    setemail("");
  }



  return (

    <View style={styles.container}>
      <View style={styles.screenameandbackbtncontainer}>
        <BackButton />
        <Text style={styles.topheading}>Forgot Password ?</Text>
      </View>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>

          <View style={styles.imgandinputcontainer}>
            <ImagePickerContainer
              isKeyboardVisible={isKeyboardVisible}
              setisKeyboardVisible={setisKeyboardVisible}
              topimage={topimage}
            />
            <View style={[styles.inptcontainer, { justifyContent: isKeyboardVisible ? "center" : "" }]}>
              <View>
                <Text style={styles.inputplaceholder}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={t => setemail(t)}
                  value={email}
                  placeholder='xyz@gmail.com'
                />
                <Text style={styles.dontworrytext}>Don't worry, please enter your registered email, and we will send an email to help you reset your password.</Text>
              </View>
            </View>
          </View>

          <View style={styles.btncontainer}>
            {loading ? <ActivityIndicator
              size="large"
              color={DARK_GREEN_COLOR}
            /> : <SingleButton
              text={"Send Email"}
              onPress={handleButtonClick}
            />}
          </View>
        </View>

      </KeyboardAvoidingView>
    </View>
  )
}

export default EmailEnterScreen;



