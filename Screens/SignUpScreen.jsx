import React, { useState } from 'react'
import ImageAndInputScreen from '../Components/ImageAndInputScreen';
import auth, { firebase } from '@react-native-firebase/auth';
import { useGetUserImage, useSetUserImage, useSetUserLoading } from '../App';
import Snackbar from 'react-native-snackbar';

const SignUpScreen = () => {

  const setusrlding = useSetUserLoading();

  const setuserimage = useSetUserImage();

  const userimage = useGetUserImage();

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

        Snackbar.show({
          text: 'Account created successfully!',
          backgroundColor: 'green',
        });

        setusrlding(false);
        setuserimage(null);
      } catch (error) {
        setusrlding(false);
        if (error.code === 'auth/email-already-in-use') {
          Snackbar.show({
            text: 'Email is already in use',
            backgroundColor: "red"
          });
        }

        if (error.code === 'auth/invalid-email') {
          Snackbar.show({
            text: 'Invalid Email !',
            backgroundColor: "red"
          });
        }

      }
    } else {
      Snackbar.show({
        text: 'Email and password are required',
        backgroundColor: "red"
      });
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