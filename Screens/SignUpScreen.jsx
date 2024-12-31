import React, { useState } from 'react'
import ImageAndInputScreen from '../Components/ImageAndInputScreen';
import auth from '@react-native-firebase/auth';
import { useSetUserLoading } from '../App';
import Snackbar from 'react-native-snackbar';

const SignUpScreen = ({ setuserimage }) => {

  const setusrlding = useSetUserLoading();

  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
    image: ""
  });

  function handleChangeCredentials(name, value) {
    setcredentials(p => ({
      ...p,
      [name]: value
    }))
  }

  const { image, email, password } = credentials;



  async function handleActionofButtonClick() {
    if (email && password) {
      setuserimage({image,goggleSignIn:false});
      try {
        setusrlding(true)
        await auth()
          .createUserWithEmailAndPassword(email, password);
        setusrlding(false);
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
      console.log("NO")
      setusrlding(false);
    }

  }


  return <ImageAndInputScreen
    toptext={"Sign Up"}
    btntext={"Sign Up"}
    handleActionofButtonClick={handleActionofButtonClick}
    credentials={credentials}
    handleChangeCredentials={handleChangeCredentials}
    image={image}
    setcredentials={setcredentials}
  />
}

export default SignUpScreen;