import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CameraIcon from "react-native-vector-icons/Entypo";
import { GREEN_COLOR } from '../Constants';

import ImagePickerPackage from 'react-native-image-crop-picker';
import ProfileImage from "../assets/images/profile.png";
import { useRoute } from '@react-navigation/native';

const ImagePicker = ({ image, handleChangeCredentials }) => {


    function handleImagePicking() {
        ImagePickerPackage.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            cropperCircleOverlay: true
        }).then(({ path }) => {
            handleChangeCredentials("image", { uri: path })
        });
    }

    const route = useRoute();



    return (
        <View style={styles.pickercontainer}>
            <Image
                source={image == "" ? ProfileImage : image}
                resizeMode='cover'
                style={{ width: "100%", height: "100%", borderRadius: 100,transform:[{scale:image == "" ? 1.5 : 1}] }}
            />
            {route.name == "SignIn" && <TouchableOpacity style={styles.camerabtn} onPress={handleImagePicking}>

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
        backgroundColor: "grey",
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