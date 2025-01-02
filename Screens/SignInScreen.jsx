import React, { useState } from 'react'
import ImageAndInputScreen from '../Components/ImageAndInputScreen'
import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';
import image from "../assets/images/login.png";
import { useSetUserLoading } from '../App';
import Snackbar from 'react-native-snackbar';

export function handleShowSnackbar(msg, color) {
  Snackbar.show({
    text: msg,
    backgroundColor: color,
  });
}

const SignInScreen = () => {

  const setusrlding = useSetUserLoading()

  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  function handleChangeCredentials(name, value) {
    setcredentials(p => ({
      ...p,
      [name]: value
    }))
  }

  const { email, password } = credentials;


  async function handleActionofButtonClick() {
    if (email && password) {

      try {
        setusrlding(true);
        await auth().signInWithEmailAndPassword(email, password);

        setusrlding(false);
        ToastAndroid.show("User Signed in successfully !", ToastAndroid.LONG);
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            handleShowSnackbar("The email address is not valid.", "red");
            break;
          case 'auth/user-disabled':
            handleShowSnackbar("This user account has been disabled by the administrator.", "red");
            break;
          case 'auth/user-not-found':
            handleShowSnackbar("No user found with this email address.", "red");
            break;
          case 'auth/wrong-password':
            handleShowSnackbar("The password is incorrect.", "red");
            break;
          case 'auth/too-many-requests':
            handleShowSnackbar(
              "Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.",
              "red"
            );
            break;
          case 'auth/network-request-failed':
            handleShowSnackbar("A network error occurred. Please check your internet connection.", "red");
            break;
          case 'auth/operation-not-allowed':
            handleShowSnackbar(
              "Signing in with email and password is not enabled. Please contact support.",
              "red"
            );
            break;
          default:
            handleShowSnackbar("An unexpected error occurred. Please try again.", "red");
            break;
        }
      }
    } else {
      handleShowSnackbar("Email and password are required", "red");
      setusrlding(false);
    }
  }


  return <ImageAndInputScreen
    toptext={"Sign In"}
    btntext={"Sign In"}
    handleActionofButtonClick={handleActionofButtonClick}
    credentials={credentials}
    handleChangeCredentials={handleChangeCredentials}
    image={image}
    setcredentials={setcredentials}
  />
}

export default SignInScreen;