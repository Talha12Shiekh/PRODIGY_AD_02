import { Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TodoLogo from "../assets/images/todo-icon.png";
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useGetUserImage } from '../App';
import ProfileImage from "../assets/images/profile.png";

const LogoAndProfile = () => {
    let currentUser = auth().currentUser;

    const [isImageUpdated, setIsImageUpdated] = useState(false);

    let userimage = useGetUserImage();

    async function handleChangeProfileImage() {
        // Ensure the userimage.uri is a valid URL before updating the profile
        if (userimage?.uri && !isImageUpdated) {
            try {
                await firebase.auth().currentUser.updateProfile({
                    photoURL: userimage.uri, // Set custom profile image URL
                });

                setIsImageUpdated(true); // Prevent unnecessary updates after successful update
                console.log("Profile photo updated successfully!");
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if (userimage?.uri) {
            handleChangeProfileImage();
        }
    }, [userimage]); // Runs only when userimage changes

    async function handleSignOut() {
        try {
            await GoogleSignin.signOut();
            await auth().signOut();
        } catch (error) {
            console.log(error);
        }

        ToastAndroid.show("User Signed Out!", ToastAndroid.LONG);
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
                        source={{ uri: currentUser?.photoURL || userimage?.uri || ProfileImage}} // Default fallback if no photoURL
                        style={{ width: "100%", height: "100%" }}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default LogoAndProfile;

const styles = StyleSheet.create({
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
});
