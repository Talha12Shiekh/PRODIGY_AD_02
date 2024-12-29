import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MyImg from "../assets/images/Talha-img.jpeg";
import TodoLogo from "../assets/images/todo-icon.png";
import auth from '@react-native-firebase/auth';

const LogoAndProfile = () => {

    async function handleSignOut() {
        try {
            await auth().signOut();
        } catch (error) {
            console.log(error);
        }

        ToastAndroid.show("User Signed Out !", ToastAndroid.LONG);
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
                        source={MyImg}
                        style={{ width: "100%", height: "100%" }}
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