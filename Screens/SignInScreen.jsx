import React, {  useState } from 'react'
import ImageAndInputScreen from '../Components/ImageAndInputScreen'
import auth from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';

const SignInScreen = () => {


  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
    image:""
  });

  function handleChangeCredentials(name, value) {
    setcredentials(p => ({
      ...p,
      [name]: value
    }))
  }

  const {image,email,password} = credentials;


  async function handleActionofButtonClick() {
    if (email && password) {

      try {
        await auth().signInWithEmailAndPassword(email,password);

        ToastAndroid.show("User Signed in successfully !",ToastAndroid.LONG);
      } catch (error) {
       console.log(error);
      }
    } else {
      // SHOW SNACKBAR
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