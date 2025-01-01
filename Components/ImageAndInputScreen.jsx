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

const ImageAndInputScreen = ({ toptext, btntext, handleActionofButtonClick, credentials, handleChangeCredentials, setcredentials }) => {
  const [isKeyboardVisible, setisKeyboardVisible] = useState(false);
  const [showpswrd, setshowpswrd] = useState(true);
  const imagePickerTranslateY = useRef(new Animated.Value(0)).current;
  const imagePickerOpacity = useRef(new Animated.Value(1)).current;
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

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setisKeyboardVisible(true);
      Animated.parallel([
        Animated.timing(imagePickerTranslateY, {
          toValue: -wp(50), // Move the ImagePicker up off-screen
          duration: 300,
          useNativeDriver: true, // Smooth animations
        }),
        Animated.timing(imagePickerOpacity, {
          toValue: 0, // Fade out
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setisKeyboardVisible(false);
      Animated.parallel([
        Animated.timing(imagePickerTranslateY, {
          toValue: 0, // Bring the ImagePicker back to its original position
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(imagePickerOpacity, {
          toValue: 1, // Fade in
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [imagePickerTranslateY, imagePickerOpacity]);

  return (

    <View style={styles.container}>
      <View style={styles.screenameandbackbtncontainer}>
        <BackButton />
        <Text style={styles.topheading}>{toptext}</Text>
      </View>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>

          <View style={styles.imgandinputcontainer}>
            <Animated.View
              style={[
                styles.imagePickerContainer,
                {
                  transform: [{ translateY: imagePickerTranslateY }],
                  opacity: imagePickerOpacity,
                },
              ]}
            >
              {!isKeyboardVisible && <ImagePicker />}
            </Animated.View>
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
                  <TouchableOpacity>
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
    marginBottom: wp(5)
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
  },
  pswrdInptContainer: {
    position: "relative"
  },
  eyeiconContainer: {
    position: "absolute",
    right: wp(8),
    bottom: wp(13)
  },
})