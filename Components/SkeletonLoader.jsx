import { View } from 'react-native'
import React from 'react';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BLACK_COLOR } from '../Constants';

const NUM_OF_SKELETONS = 4;

const SkeletonLoader = () => {
    return (
        <>
            {
                Array(NUM_OF_SKELETONS).fill("").map((e, i) => <View style={{ marginBottom: 10 }}><SkeletonPlaceholder key={`index-${i}`} backgroundColor={BLACK_COLOR} highlightColor={"#ffffff"}>
                    <View style={{
                        height: hp(7),
                        borderRadius: 10,
                    }}>
                    </View>
                </SkeletonPlaceholder>
                </View>
                )
            }
        </>
    )
}

export default SkeletonLoader;