import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from "react-native-responsive-screen";
import { BG_COLOR, BLACK_COLOR } from "./Constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BG_COLOR
    },
    imgandinputcontainer: {
      flex: 5,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    btncontainer: {
      flex: 1,
      justifyContent: "flex-end",
      marginBottom: wp(5)
    },
    image: {
      width: wp(80),
      height: wp(100),
    },
    inptcontainer: {
      flex: 1,
      width: "100%",
    },
    input: {
      width: "95%",
      backgroundColor: BLACK_COLOR,
      alignSelf: "center",
      borderRadius: 50,
      color: "white",
      fontSize: wp(3),
      paddingHorizontal: wp(4),
      fontFamily: "Poppins-Regular",
      paddingBottom: 5,
    },
    inputplaceholder: {
      fontSize: wp(3.5),
      fontFamily: "Poppins-Regular",
      marginLeft: wp(6),
      marginBottom: wp(1)
    },
    topheading: {
      textAlign: "center",
      paddingTop: wp(5),
      fontSize: wp(5),
      fontFamily: "Poppins-Regular",
      color: "white"
    },
    pswrdInptContainer: {
      position: "relative",
    },
    eyeiconContainer: {
      position: "absolute",
      right: wp(8),
      bottom: 12,
    },
    dontworrytext:{
      fontFamily: "Poppins-Regular",
      fontSize:wp(3),
      marginHorizontal:wp(3),
      alignSelf:"center",
      textAlign:"center",
      marginVertical:wp(4)
    },
    singleTodo: {
      backgroundColor: BLACK_COLOR,
      padding: wp(5),
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: hp(0.6),
    },
    todoTxt: {
      fontSize: wp(4),
      fontFamily: "Poppins-Regular",
    },
    frgtpswrdcontainer:{
      flex:1,
    }
  })