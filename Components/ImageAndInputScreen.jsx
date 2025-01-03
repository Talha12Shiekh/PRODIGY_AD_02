import { ActivityIndicator, Animated, Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BG_COLOR, BLACK_COLOR, DARK_GREEN_COLOR, GREEN_COLOR } from '../Constants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SingleButton } from '../Screens/WelcomeScreen'
import BackButton from '../Components/BackButton'
import ImagePicker from '../Components/ImagePicker';
import EyeIcon from "react-native-vector-icons/Entypo";
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetUserLoading } from '../App'
import { styles } from '../styles'
import ImagePickerContainer from './ImagePickerContainer'

const ImageAndInputScreen = ({ toptext, btntext, handleActionofButtonClick, credentials, handleChangeCredentials, setcredentials,topimage }) => {
  
  const [showpswrd, setshowpswrd] = useState(true);

  const [isKeyboardVisible, setisKeyboardVisible] = useState(false);
  
  const navigation = useNavigation();
 
  const route = useRoute();

  const userloading = useGetUserLoading();

  const { email, password } = credentials;


  function handleButtonClick() {
      handleActionofButtonClick()
      setcredentials({
        email: "",
        password: "",
        image: ""
      });
  }



  return (

    <View style={styles.container}>
      <View style={styles.screenameandbackbtncontainer}>
        <BackButton />
        <Text style={styles.topheading}>{toptext}</Text>
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
                  onChangeText={t => handleChangeCredentials("email", t)}
                  value={email}
                />
              </View>
              <View style={styles.pswrdInptContainer}>

                <Text style={styles.inputplaceholder}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry={showpswrd}
                  value={password}
                  onChangeText={p => handleChangeCredentials("password", p)}
                />
                <TouchableOpacity onPress={() => setshowpswrd(p => !p)} style={styles.eyeiconContainer}>

                  <View >
                    <EyeIcon
                      name={showpswrd ? "eye" : "eye-with-line"}
                      color="white"
                      size={15}
                    />
                  </View>
                </TouchableOpacity>

                {route.name === "SignIn" && <View style={{ alignSelf: "flex-end", marginRight: wp(5), marginTop: wp(5) }}>
                  <TouchableOpacity onPress={() => navigation.navigate("EmailEnter")}>
                    <Text >Forget Password ?</Text>
                  </TouchableOpacity>
                </View>}
              </View>
            </View>
          </View>

          <View style={styles.btncontainer}>
            {userloading ? <ActivityIndicator
              size="large"
              color={DARK_GREEN_COLOR}
            /> : <SingleButton
              text={btntext}
              onPress={handleButtonClick}
            />}
          </View>
        </View>

      </KeyboardAvoidingView>
    </View>
  )
}

export default ImageAndInputScreen

