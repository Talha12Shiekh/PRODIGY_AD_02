import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TodoLogo from "../assets/images/todo-icon.png";
import auth from '@react-native-firebase/auth';
import ProfileImage from "../assets/images/profile.png";
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const LogoAndProfile = ({userimage}) => {

    async function handleSignOut() {

        try {
            // if(userimage.goggleSignIn){
            //     await GoogleSignin.signOut();
            // }else {
                await auth().signOut();
            // }
        } catch (error) {
            console.log(error);
        }

        ToastAndroid.show("User Signed Out !", ToastAndroid.LONG);
    }

    console.log(userimage);
    let profileimage = ProfileImage;
    if(userimage.goggleSignIn) {
        profileimage = {uri:userimage.image}
    }else if(!userimage.goggleSignIn) {
        profileimage = {uri:userimage.image?.uri};
    }

    return (
        <View style={styles.container}>
            <Image
                resizeMode='cover'
                source={TodoLogo}
                style={{ width: wp(15), height: hp(6) }}
            />
            <TouchableOpacity onPress={handleSignOut}>
                <View style={styles.userprofile}>
                    <Image
                        resizeMode='cover'
                        source={profileimage}
                        style={{ width: "100%", height: "100%" , transform:[{scale:userimage ? 1 : 1.5}] }}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default LogoAndProfile

const styles = StyleSheet.create({
    heading: {
        color: "white",
        fontSize: wp(5),
        fontFamily: "Poppins-Regular",
        marginLeft: wp(2)
    },
    container: {
        width: "98%",
        alignSelf: "center",
        marginVertical: wp(3),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    userprofile: {
        width: wp(10),
        aspectRatio: 1,
        backgroundColor: "white",
        borderRadius: 50,
        overflow: "hidden"
    }
})