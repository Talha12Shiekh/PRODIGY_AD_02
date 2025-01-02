import React, { useState } from 'react'
import ImageAndInputScreen from '../Components/ImageAndInputScreen';
import auth from '@react-native-firebase/auth';
import { useSetUserImage, useSetUserLoading } from '../App';
import { handleShowSnackbar } from './SignInScreen';

const SignUpScreen = () => {

  // first user clicks on forget password -> then it takes to a screen where the user enters her mail -> from the mail user clicks on reset password -> when clicks the reset password it takes user to a screen where user enters new password and confirms it also -> after that it takes user back to the sign in screen -> then user enters the email and new password and gets sign in

  const setusrlding = useSetUserLoading();

  const setuserimage = useSetUserImage();


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
        setusrlding(true)
        await auth()
          .createUserWithEmailAndPassword(email, password); 

        handleShowSnackbar('Account created successfully!', "green");

        setusrlding(false);
        setuserimage(null);
      } catch (error) {
        setusrlding(false);
        if (error.code === 'auth/email-already-in-use') {
          handleShowSnackbar('Email is already in use', "red");
        } else if (error.code === 'auth/invalid-email') {
          handleShowSnackbar('Invalid Email!', "red");
        } else {
          handleShowSnackbar('An unexpected error occurred. Please try again.', "red");
        }
      }
    } else {
      handleShowSnackbar('Email and password are required', "red");
      setusrlding(false);
    }

  }


  return <ImageAndInputScreen
    toptext={"Sign Up"}
    btntext={"Sign Up"}
    handleActionofButtonClick={handleActionofButtonClick}
    credentials={credentials}
    handleChangeCredentials={handleChangeCredentials}
    setcredentials={setcredentials}
  />
}

export default SignUpScreen;