import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import colors
import { COLORS } from "../constants/ColorCpc";
import { registerForPushNotificationsAsync } from '../src/pushToken';
import { registerStudent } from "./api/spring";


enum STUDENT_COURSE {
  BSIT = "BSIT",
  BSCE = "BSCE",
  BSEE = "BSEE",
}
enum STUDENT_DEPARMENT {
  CET = "CET",
  CHTM = "CHTM",
  CME = "CME",
}

const COURSES = Object.values(STUDENT_COURSE);
const DEPARMENTS = Object.values(STUDENT_DEPARMENT);

const register = () => {


  const [expoPushToken, setExpoPushToken] = useState<string>()


  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [fieldIsFocused, setIsFieldIsFocused] = useState<boolean>(false);
  const [buttonPress, setButtonPress] = useState<boolean>(false);

  // student data
  const [studentName, setStudentName] = useState<string>("");
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedDeparment, setSelectedDeparment] = useState<string>("");
  const [statusData, setStatusData] = useState<boolean>(false);
  const [notificationId, setnotificationId] = useState<string | undefined>("");

  //   modal
  const [modalVisible, setModalVisible] = useState(false);

  //loading status
  const [loading, setLoading] = useState(false);

  // router
  const router = useRouter();

  const styles = myCSS(fieldIsFocused, buttonPress);

  // event navigation
  const haddlePressRegister = () => {
    setLoginStatus(false);
    // router.push('/register')
  };
  const haddlePressLogin = () => {
    setLoginStatus(true);
    router.push("/");
  };

  const studentSelectedCourse = (course: string) => {
    setSelectedCourse(course); // only one can be selected
    console.log(course);
  };
  const studentSelectedDepartment = (department: string) => {
    setSelectedDeparment(department);
    console.log(department);
  };

  // haddle register and get all data send to data base and back to the login page


   

  async function uploadNow(
    name: string,
    studentNumber: string,
    course: string,
    department: string
  ) {
    if (!name || name.trim().length === 0) {
      Alert.alert("Validation Error", "No name has been entered.");
      return;
    }

    if (!studentNumber || studentNumber.trim().length === 0) {
      Alert.alert("Validation Error", "No student number has been entered.");
      return;
    }

    if (!course || course.trim().length === 0) {
      Alert.alert("Validation Error", "Please select a course.");
      return;
    }

    if (!department || department.trim().length === 0) {
      Alert.alert("Validation Error", "Please select a department.");
      return;
    }

    // ✅ All good, update status and upload
    await postToServer();
  }

  // inner class
  type StudentEventAttended = {
    eventId: string;
    eventTitle?: string;
    studentDateAttended?: string;
  };
  type StudentRecentEvaluations = {
    eventId?: string;
    eventTitle?: string;
    studentRatingsGive?: number;
    studentDateRated?: string;
  };

  // class
  type StudentData = {
    studentName: string;
    studentNumber: string;
    studentPassword: string;
    course: string;
    department: string;
    notificationId: string;
    studentAverageAttendance: number;
    studentAverageRatings: number;

    studentEventAttended: StudentEventAttended[];
    studentRecentEvaluations: StudentRecentEvaluations[];
  };



async function postToServer() {
  setLoading(true);

  try {
    const response = await registerStudent({
      studentName,
      studentNumber,
      selectedCourse,
      selectedDeparment,
      expoPushToken
    });

    console.log('Registration successful:', response);
    setModalVisible(true);
  } catch (error) {
    console.error('Registration failed:', error);
  } finally {
    setLoading(false);
  }
}


useEffect(()=>{
const getToken = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setExpoPushToken(token);
      }
    };

    getToken()

},[])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.registerContainer}>
          <View style={styles.buttonContainer}>
            <Pressable onPress={haddlePressLogin}>
              <Text style={[styles.loginNavigationText]}>Log in</Text>
            </Pressable>
            <Pressable onPress={haddlePressRegister}>
              <Text style={styles.registerNavigationText}>Register</Text>
            </Pressable>
          </View>

          <Text style={styles.fieldText}>FULL NAME: </Text>
          <TextInput
            placeholder="Juan dela cruz"
            placeholderTextColor="grey"
            value={studentName}
            onChangeText={setStudentName}
            style={styles.field}
          ></TextInput>

          <Text style={styles.fieldText}>STUDENT NUMBER:</Text>
          <TextInput
            placeholder="2022000411"
            placeholderTextColor="grey"
            value={studentNumber}
            onChangeText={setStudentNumber}
            style={styles.field}
          ></TextInput>

          <Text style={styles.courseText}>COURSE</Text>
          <View style={styles.courseContainer}>
            {COURSES.map((course) => (
              <TouchableHighlight
                key={course}
                style={[
                  styles.courseButton,
                  selectedCourse === course && styles.courseButtonSelected,
                ]}
                onPress={() => studentSelectedCourse(course)}
                underlayColor="#ccc"
              >
                <Text
                  style={[
                    styles.courseButtonText,
                    selectedCourse === course && styles.courseTextSelected,
                  ]}
                >
                  {course}
                </Text>
              </TouchableHighlight>
            ))}
          </View>

          {/* end of course section */}

          <Text style={[styles.courseText]}>DEPARMENT</Text>
          <View style={styles.courseContainer}>
            {DEPARMENTS.map((department) => (
              <TouchableHighlight
                key={department}
                onPress={() => studentSelectedDepartment(department)}
                style={[
                  styles.courseButton,
                  selectedDeparment === department &&
                    styles.courseButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.courseButtonText,
                    selectedDeparment === department &&
                      styles.courseTextSelected,
                  ]}
                >
                  {" "}
                  {department}{" "}
                </Text>
              </TouchableHighlight>
            ))}
          </View>
          {/* end of deparment section */}

          <TouchableHighlight
            style={styles.registerButton}
            onPress={() =>
              uploadNow(
                studentName,
                studentNumber,
                selectedCourse,
                selectedDeparment
              )
            }
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableHighlight>
        </View>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={styles.loader}
          />
        )}

        {/* modal */}
        <Modal
          animationType="fade" // or "slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} // Android back button
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>✅ Successfully added! 🎉</Text>

              <Pressable
                style={[styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false);
                  setLoginStatus(true);
                  router.push("/");
                }}
              >
                <Text style={styles.textStyle}>Login Now</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default register;

function myCSS(fieldIsFocused: boolean, buttonPress: boolean) {
  return StyleSheet.create({
    safeAreaView: {
      width: "100%",
      height: "100%",
    },
    container: {
      backgroundColor: COLORS.Primary,
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
      marginHorizontal: "auto",
      marginBottom: 35,
    },

    loginNavigationText: {
      color: "grey",
    },

    registerNavigationText: {
      color: COLORS.Forth,
      borderBottomColor: COLORS.Forth,
      borderBottomWidth: 2,
    },
    registerContainer: {
      flex: 1,
      margin: "auto",
      width: "80%",
      maxWidth: 500,
      height: "70%",
      maxHeight: 500,
      backgroundColor: COLORS.Forth,
      borderRadius: 15,
    },

    fieldText: {
      marginLeft: 44,
      marginTop: 10,
    },

    field: {
      borderColor: COLORS.Primary,
      borderWidth: 2,
      width: "80%",
      marginHorizontal: "auto",
      marginTop: 3,
      padding: 8,
      borderRadius: 10,
    },

    courseContainer: {
      borderWidth: 2,
      borderRadius: 12,
      padding: 5,
      marginHorizontal: "auto",
      borderColor: COLORS.Primary,
      flexDirection: "row",
      width: "80%",

      justifyContent: "space-evenly",
    },

    courseText: {
      marginLeft: 45,
      marginTop: 10,
      marginBottom: 2,
    },

    courseButton: {
      margin: 5,
      backgroundColor: buttonPress ? COLORS.Primary : COLORS.Forth,
      padding: 2,
      width: "25%",
      maxWidth: 100,
      borderColor: COLORS.Primary,
      borderWidth: 2,
      borderRadius: 12,

      alignItems: "center",
    },

    courseButtonText: {
      color: buttonPress ? "white" : "black",
    },

    courseTextSelected: {
      color: "#fff",
    },

    courseButtonSelected: {
      backgroundColor: COLORS.Primary,
    },

    registerButton: {
      marginHorizontal: "auto",
      width: "80%",
      marginVertical: 25,
      backgroundColor: COLORS.Primary,

      alignItems: "center",
      padding: 10,
      borderRadius: 17,
    },

    registerButtonText: {
      color: "white",
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
      backgroundColor: "#2196F3",
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
