import "expo-router/entry";

import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

// safe aerea view
import { SafeAreaView } from "react-native-safe-area-context";
// router for navigation
import { useRouter } from "expo-router";
// my color
import { COLORS } from "../constants/ColorCpc";
// path images
import PicturePath from "../constants/PicturePath";

//import para ka pasa value sa Home tsx file
import { useUser } from "../src/userContext";

// import gradient color for bg
// import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { LinearGradient } from "expo-linear-gradient";

import axios from "axios";

// api
import { authStudent } from "./api/spring";

const index = () => {
  // usestate
  //      const [pushToken, setPushToken] = useState<string | null>(null);

  //  useEffect(() => {
  //   const getToken = async () => {
  //     try {
  //       const token = await registerForPushNotificationsAsync();
  //       console.log("📱 Expo Push Token:", token);
  //       if (token) {
  //         setPushToken(token);
  //       } else {
  //         console.warn("⚠️ Token is null - check FCM setup or device/emulator");
  //       }
  //     } catch (err) {
  //       console.error("❌ Error getting push token:", err);
  //     }
  //   };

  //   getToken();
  // }, []);

  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // variale
  const styles = mycss(loginStatus, userName, password);

  const [modalVisible, setModalVisible] = useState(false);

  // secutity
  // const[tokenId, setTokenId] = useState()

  // const [fontsLoaded] = useFonts({
  //   Inter_400Regular,
  //   Inter_700Bold,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  // router
  const router = useRouter();

  //variable para ka pasa value sa Home tsx file and more
  const { setStudentData, setEventData, setStudentToken, setStudentNumber, studentToken } =
    useUser();

  // navigation status

  const handleNavigationRegister = () => {
    router.push("/register");
    setLoginStatus(false);
  };
  // isOfficer 

  // authenticate Student
  const haddleAuthStudent = async () => {
    setLoading(true);
    try {
      const token = await authStudent(userName, password);
      setStudentToken(token);
      setStudentNumber(userName);
      setLoading(false);

   
       const studentData = await getStudentData(token, userName)
    
      if(studentData.category === "sspc"){
         router.push("/eventAnnouncer")
      }else{
         router.push("/(tabs)/home")
      }
    
     
     
    } catch (error) {
      console.log("Login failed");
      console.log(error)
      setModalVisible(true);
    }
  };

  
  async function authenticateStudent(
    studentNumber: string,
    studentPassword: string
  ) {
    setLoading(true);

    try {
      const api = "http://192.168.254.103:8080/api/students/login";

      const student = await axios.post(api, {
        studentNumber,
        studentPassword,
      });

      const tokenId = student.data;

      //  console.log(tokenId)
      await getStudentData(tokenId, userName);

      await getAllEvents(tokenId);
    } catch (e) {
      console.log(e);

      setModalVisible(true);
    }
  }

  // set student data
  async function getStudentData(token: string, studentNumber: string) {
    // console.log(typeof token)
    // setStudentToken(token);

    try {
      const api = `http://192.168.254.103:8080/api/students/${studentNumber}`;

      const studentData = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return studentData.data
    
    } catch (error) {
      console.log(error);
    }
  }

  // get all event
  async function getAllEvents(token: string) {
    try {
      const api = "http://192.168.254.103:8080/api/events/getAll";

      const eventAllEvents = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //  go to home page
      setEventData(eventAllEvents.data);
      router.push("/(tabs)/home");
    } catch (error) {
      console.log(error);
    }
  }

  // const response = await axios.get(apiEndpoint, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },

  return (
    //
    <LinearGradient
      colors={[COLORS.Primary, COLORS.Secondary, COLORS.Third]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            {/* Log in Button and Register Button */}
            <View style={styles.buttonContainer}>
              <Pressable
              // onPress={haddlePressLogin}
              >
                <Text
                  style={[
                    styles.loginNavigationText,
                    { fontFamily: "Inter_700Bold" },
                  ]}
                >
                  Log in
                </Text>
              </Pressable>
              <Pressable onPress={handleNavigationRegister}>
                <Text
                  style={[
                    styles.registerNavigationText,
                    { fontFamily: "Inter_700Bold" },
                  ]}
                >
                  Register
                </Text>
              </Pressable>
            </View>
            {/* Image */}
            <Image source={PicturePath.cpcLogo} style={styles.imageLogo} />
            {/* Log in Field */}
            <Text
              style={[
                styles.textField,
                { marginTop: 15, fontFamily: "Inter_400Regular" },
              ]}
            >
              {" "}
              Username{" "}
            </Text>
            <TextInput
              placeholder="202200044"
              maxLength={9}
              style={[styles.field]}
              value={userName}
              onChangeText={setUsername}
              placeholderTextColor="grey"
            />

            <Text
              style={[
                styles.textField,
                { marginTop: 9, fontFamily: "Inter_400Regular" },
              ]}
            >
              {" "}
              Password{" "}
            </Text>
            <TextInput
              placeholder="student#cpc"
              style={styles.field}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="grey"
            />

            {/* Button for log in */}
            <TouchableHighlight
              style={styles.buttonLogin}
              onPress={() => haddleAuthStudent()}
              // onPress={() => authenticateStudent(userName, password)}
              // onPress={() => router.push("/(tabs)/home")}
            >
              <Text
                style={[styles.buttonText, { fontFamily: "Inter_700Bold" }]}
              >
                Log in
              </Text>
            </TouchableHighlight>
          </View>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#007AFF"
              style={styles.loader}
            />
          )}
        </View>
        {/* modal */}
        <Modal
          animationType="fade" // or "slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} // Android back button
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {" "}
                Error: Student number not found or password not correct! Please
                try again
              </Text>

              <Pressable
                style={[styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false);
                  setLoginStatus(true);

                  router.push("/");
                }}
              >
                <Text style={styles.textStyle}>Try again</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default index;

function mycss(status: boolean, userName: string, password: string) {
  return StyleSheet.create({
    safeAreaView: {
      width: "100%",
      height: "100%",
    },
    container: {
      // backgroundColor: COLORS.Primary,
      width: "100%",
      //  height: '100%',
      //  flex property
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    // log in and register Container
    buttonContainer: {
      backgroundColor: COLORS.Primary,
      borderRadius: 12,
      width: "65%",
      marginTop: 10,
      flexDirection: "row",
      gap: 40,
      padding: 10,
      justifyContent: "space-evenly",
    },
    imageLogo: {
      maxWidth: 120,
      height: 120,
      marginTop: 15,
    },
    //   login Form
    formContainer: {
      backgroundColor: COLORS.Forth,
      width: "90%",
      maxWidth: 500,

      padding: 10,
      gap: 2,
      borderRadius: 15,
      overflow: "hidden",

      alignItems: "center",

      borderWidth: 1,
      // borderColor: 'black'
    },

    textField: {
      // gone for a moment
      // display: userName.length > 0 ||
      //   password.length > 0 ? "flex" : 'none',

      alignSelf: "center",
    },
    field: {
      // borderBottomWidth: 2,
      // // borderBottomColor: COLORS.Secondary,

      // marginTop: 15,

      borderBottomWidth: 2,
      borderBottomColor: COLORS.Secondary,
      height: 40,
      width: "65%",
      paddingVertical: 4,
      marginVertical: 3,
      fontFamily: "Inter_400Regular",
      paddingLeft: 10,
    },
    buttonLogin: {
      marginVertical: 45,
      backgroundColor: COLORS.Primary,
      padding: 12,
      width: "65%",
      borderRadius: 10,

      alignItems: "center",
    },

    loginNavigationText: {
      borderBottomColor: status ? COLORS.Forth : "transparent",
      color: status ? COLORS.Forth : "grey",
      borderBottomWidth: 2,
    },

    registerNavigationText: {
      color: "grey",
    },
    buttonText: {
      color: COLORS.Forth,
    },

    // text color
    text: {
      color: COLORS.TextColor,
    },

    loader: {
      position: "absolute",
      top: "50%",
    },

    //modal
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)", // transparent background
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    buttonOpen: {
      backgroundColor: "#e22b2bff",
      borderRadius: 10,
      padding: 10,
    },
    buttonClose: {
      marginTop: 15,
      backgroundColor: COLORS.Primary,
      borderRadius: 10,
      padding: 10,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
    },
    modalText: {
      fontSize: 18,
      textAlign: "center",
    },
  });
}
