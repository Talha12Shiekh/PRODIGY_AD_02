import { StyleSheet, View } from 'react-native'
import React from 'react';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BLACK_COLOR } from '../Constants';

const SkeletonLoader = () => {
    const NUM_OF_SKELETONS = 3;
    const ARRAY = Array(NUM_OF_SKELETONS).fill("");
    return (
        <>
            {
                ARRAY.map((e, i) => <View key={`skeleton-${i}`} style={styles.skeletonContainer}>
                    <SkeletonPlaceholder backgroundColor={BLACK_COLOR} highlightColor={"#ffffff"}>
                        <View style={styles.skeletonitem} />
                    </SkeletonPlaceholder>
                </View>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    skeletonContainer: {
        marginBottom: 10
    },
    skeletonitem: {
        height: hp(7),
        borderRadius: 10,
    }
})

export default SkeletonLoader;