import React, { useState } from 'react'
import ImageAndInputScreen from '../Components/ImageAndInputScreen';
import auth from '@react-native-firebase/auth';

const SignUpScreen = () => {

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

  // implement IMAGE Into user also 


  async function handleActionofButtonClick() {
    // PENDING SHOW LOADER 
    if (email && password) {

      try {
        await auth()
          .createUserWithEmailAndPassword(email, password)
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!'); // PENDING 
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!'); // PENDING
        }

        console.error(error);
      }
    } else {
      // SHOW SNACKBAR
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