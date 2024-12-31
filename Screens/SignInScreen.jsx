import React, { useState } from 'react'
import ImageAndInputScreen from '../Components/ImageAndInputScreen'
import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';
import image from "../assets/images/login.png";
import { useSetUserLoading } from '../App';

const SignInScreen = ({setuserimage}) => {

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
        console.log("user signed in")
        const user = await auth().signInWithEmailAndPassword(email, password);
        // console.log(user);
        
        // setuserimage({image:user.additionalUserInfo.profile.picture,goggleSignIn:false});
        // console.log("user signed in 2")
        setusrlding(false);
        ToastAndroid.show("User Signed in successfully !", ToastAndroid.LONG);
      } catch (error) {
        console.log(error);
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