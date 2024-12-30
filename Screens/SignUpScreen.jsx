import React, { useState } from 'react'
import ImageAndInputScreen from '../Components/ImageAndInputScreen';
import auth from '@react-native-firebase/auth';
import { setuserloading, useSetUserLoading } from '../App';

const SignUpScreen = ({setuserimage}) => {

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
    // PENDING SHOW LOADER 
    if (email && password) {
      setuserimage(image);
      try {
        setusrlding(true)
        await auth()
          .createUserWithEmailAndPassword(email, password);
          setusrlding(false);
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