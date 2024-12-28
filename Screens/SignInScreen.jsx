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