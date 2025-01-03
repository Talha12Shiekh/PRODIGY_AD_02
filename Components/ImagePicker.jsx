import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CameraIcon from "react-native-vector-icons/Entypo";
import { GREEN_COLOR } from '../Constants';
import ImagePickerPackage from 'react-native-image-crop-picker';
import ProfileImage from "../assets/images/profile.png";
import { useRoute } from '@react-navigation/native';
import { useGetUserImage, useSetUserImage } from '../App';
import loginimage from "../assets/images/login.png";

const ImagePicker = ({ topimage }) => {
    const setuserimage = useSetUserImage();

    const userimage = useGetUserImage();

    function handleImagePicking() {
        ImagePickerPackage.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            cropperCircleOverlay: true
        }).then(({ path }) => {
            setuserimage({ uri: path });
        });
    }

    const route = useRoute();

    let imagetoshow = "";

    if (route.name !== "SignUp") imagetoshow = topimage;
    else if (userimage == null) imagetoshow = ProfileImage;
    else imagetoshow = userimage;

    return (
        <View style={[styles.pickercontainer, { backgroundColor: route.name == "SignIn" ? "transparent" : "grey" }]}>
            <Image
                source={imagetoshow}
                resizeMode='cover'
                style={{ width: "100%", height: "100%", borderRadius: 100, transform: [{ scale: route.name == "SignUp" ? 1 : 1.3 }] }}
            />
            {route.name == "SignUp" && <TouchableOpacity style={styles.camerabtn} onPress={handleImagePicking}>

                <View style={styles.cameraContainer}>
                    <CameraIcon
                        name="camera"
                        size={30}
                        color="black"
                    />
                </View>
            </TouchableOpacity>}
        </View>
    )
}

export default ImagePicker

const styles = StyleSheet.create({
    pickercontainer: {
        width: wp(50),
        aspectRatio: 1,
        borderRadius: 100,
        marginVertical: wp(10),
        position: "relative"
    },
    cameraContainer: {
        width: wp(12),
        aspectRatio: 1,
        backgroundColor: GREEN_COLOR,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    camerabtn: {
        position: "absolute",
        right: 0,
        bottom: wp(5)
    }
})