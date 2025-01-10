import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import BackIcon from 'react-native-vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BG_COLOR, BLACK_COLOR } from '../Constants';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={{ zIndex: 999999999999 }} onPress={() => navigation.goBack()}>

            <View style={styles.container}>

                <BackIcon
                    color="white"
                    size={20}
                    name="arrow-left"
                />
            </View>
        </TouchableOpacity>

    )
}

export default BackButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: BLACK_COLOR,
        width: wp(10),
        aspectRatio: 1,
        position: "absolute",
        top: wp(3),
        left: wp(5),
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    }
})