import React, {  useState } from 'react'
import ImageAndInputScreen from '../Components/ImageAndInputScreen'

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

  const {image} = credentials;


  function handleActionofButtonClick() {
    
  }


  return <ImageAndInputScreen
    toptext={"Sign Up"}
    btntext={"Sign Up"}
    handleActionofButtonClick={handleActionofButtonClick}
    credentials={credentials}
    handleChangeCredentials={handleChangeCredentials}
    image={image}
  />
}

export default SignInScreen;