import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// para sa pag pass sang data fom index
import { useUser } from "../../src/userContext";

// import color
import { COLORS } from "../../constants/ColorCpc";
// notification
import * as Notifications from "expo-notifications";

import * as Device from "expo-device";

import { studentDataFunction } from "../api/spring";

//icon
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// static notification

const Home = () => {
  const {
    studentData,
    studentToken,
    eventData,
    studentNumber,
    setStudentData,
  } = useUser();

  interface EventsHomePage {
    eventId: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    numberOfStudentAttending: number;
    studentWant: string;

    //  Attending = register
  }

  interface EventAgenda {
    agendaTime?: string;
    agendaTitle?: string;
    agendaHost?: string;
  }

  interface EventStats {
    attending?: number;
    interested?: number;
  }

  interface EventOrganizer {
    organizerName?: string;
    organizerEmail?: string;
  }

  interface EventAgendas {
    agendaTime: string;
    agendaTitle: string;
    agendaHost: string;
  }

  interface EventEvaluationDetails {
    evaluationQuestion: string;
    studentRate: number;
    studentSuggestion: string;
  }
  interface EventPerformanceDetails {
    numberOfStudent: number;
    numberOfStudentGive: number;
  }

  type EventData = {
    id?: string;
    eventTitle?: string;
    eventShortDescription?: string;
    eventBody?: string;
    eventDate?: string;
    eventTime?: string;
    eventLocation?: string;
    eventCategory?: string;
    eventTimeLength?: string;
    eventAgendas?: EventAgendas[];
    eventStats?: EventStats;
    eventOrganizer?: EventOrganizer;
    eventEvaluationDetails?: EventEvaluationDetails[];
    eventPerformanceDetails?: EventPerformanceDetails[];
    allStudentAttending?: number;
  };

  // flatlist data

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.studentInterestEventContainer}>
        {/* event container */}
        <View style={{}}>
          {/* <Text>{item.body}</Text> */}
          {/* event student conatiner */}
          <View
            style={{
              // borderWidth: 2,
              // borderColor: 'black',
              marginVertical: 5,
              backgroundColor: COLORS.Third,
              borderRadius: 8,
              padding: 9,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: 500, marginBottom: 10 }}>
                {item.eventTitle}
              </Text>
              <TouchableHighlight
                style={{
                  // marginLeft: "auto",

                  backgroundColor: COLORS.semiBlack,
                  paddingHorizontal: 20,
                  paddingVertical: 1,
                  borderRadius: 10,
                  // alignSelf: "flex-end"
                }}
              >
                {/* registered or interested  */}
                <Text
                  style={{
                    color: COLORS.textColorWhite,
                    fontSize: 12,
                    margin: "auto",
                  }}
                >
                  {item.studentWant}
                </Text>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {/* title */}

              {/* Date and time*/}

              <View style={{ flexDirection: "row", gap: 5 }}>
                <FontAwesome5 name="calendar-day" size={18} color="black" />
                <Text>{item.eventDate} </Text>
              </View>
              <View>
                <Text>At {item.eventTime}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 5 }}>
                <Entypo name="location" size={18} color="black" />
                <Text>{item.eventLocation}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 5 }}>
                <MaterialIcons name="groups" size={22} color="black" />
                <Text>{item.numberOfStudentAttending} attending</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // end of render item for student interest

  interface StudentRecentEvaluations {
    eventTitle: string;
    studentRatingsGive: number;
    studentDateRated: string;
  }

  const renderItemstudentRatings = ({
    item,
  }: {
    item: StudentRecentEvaluations;
  }) => (
    <View style={styles.studentEvaluationContainer}>
      <View>
        <Text style={styles.studentEvaluationTitle}>{item.eventTitle}</Text>
        <Text style={styles.studentEvaluationDate}>
          {item.studentDateRated}
        </Text>
      </View>
      <View style={styles.studentEvaluationRatingsContainer}>
        <View>
          {/* item.studentRatingsGive
          <FontAwesome name="star" size={20} color="black" />
          <FontAwesome5 name="star-half-alt" size={20} color="black" /> */}
        </View>
      </View>
    </View>
  );

  // static notificaton

  /*
  async function createSchedule(title: string, body: string, date: number) {
  const content: Notifications.NotificationContentInput = {
    title,
    body,
    sound: true,
    priority: "max",
  };

  const trigger: Notifications.DateTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.DATE, // more robust than "DATE"
    date: date,
  };

  await Notifications.scheduleNotificationAsync({
    content,
    trigger
  });


}

const scheduleNotification = ()=>{

    const now = new Date()
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0, 0)
    const phTime = new Date(targetTime.getTime()- (8 * 60 *60 * 1000)).getTime()

    createSchedule("Test notification", "test body", phTime)

}
  */

  useEffect(() => {
    // const targetTime = Date.now() + 60 * 2
    //  const targetDay: Date = new Date(2025,6,18,19,5,10,0)

    // createSchedule("test Title", "test Body",  targetDay)

    // generateToken()
    //    const getStudentData = async (token: string, studentNumber: string) =>{

    //   try {
    //     const api = `http://localhost:8080/api/students/${studentNumber}`

    //      const studentData = await axios.get(api, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //      })

    //   } catch (error) {
    //     console.log(error)
    //   }

    // }
    //    getStudentData(studentData.studentNumber, studentToken)

    // get studentData
  console.log("use effect")
    const getStudentData = async () => {
       if (!studentNumber || !studentToken) return; // wait for both to be available

      try {
        const studentData = await studentDataFunction(
          studentNumber,
          studentToken
        );
     
        setStudentData(studentData);
      } catch (error) {
        console.log(error);
      }
    };

    getStudentData()
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.Secondary, COLORS.Third]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollViewStyle}>
        <SafeAreaView>
          <View style={styles.headerArea}>
            <Text style={[styles.welcomeText, { fontWeight: 700 }]}>
              Welcome, {studentData?.studentName}!
            </Text>

            <Text style={styles.welcomeTextShort}>
              Stay updated with campus events and activities
            </Text>
          </View>

          <View style={styles.studentStatusContainer}>
            {/* <View
              style={[
                styles.studentEventStatus,
                styles.studentStatus,
                { flexDirection: "row", gap: 7, width: '30%'},
              ]}
            >
             <View style={{ justifyContent: "center" ,}}>
                <AntDesign
                  name="calendar"
                  size={24}
                  color={COLORS.Primary}
                  style={styles.iconStyle}
                />
              </View>
              <View style={{ justifyContent: "center", }}>
                <Text style={styles.textStatus}>{numberEventThisMonth}</Text>
                <Text>Events This Month</Text>
              </View>  */}
            {/* </View>  */}

            <View
              style={[
                styles.studentAttendentStatus,
                styles.studentStatus,
                {
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 7,
                },
              ]}
            >
              <Ionicons
                name="people-outline"
                size={24}
                color={COLORS.Primary}
                style={styles.iconStyle}
              />

              <View>
                <Text style={styles.textStatus}>
                  {studentData?.studentAverageAttendance}
                </Text>
                <Text>Events Attended</Text>
              </View>
            </View>

            <View
              style={[
                styles.studentAttendentStatus,
                styles.studentStatus,
                {
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 7,
                },
              ]}
            >
              <AntDesign
                name="staro"
                size={24}
                color={COLORS.Primary}
                style={[styles.iconStyle, { alignSelf: "center" }]}
              />
              <View>
                <Text style={styles.textStatus}>
                  {studentData?.studentAverageRatings}
                </Text>
                <Text>Avg. Rating Given</Text>
              </View>
            </View>
          </View>
          {/* end of student event status */}

          <View style={styles.upcomingEventContainer}>
            <Text
              style={{ fontWeight: 700, color: COLORS.TextColor, fontSize: 20 }}
            >
              Your Upcoming Events
            </Text>
            <Text style={{ marginBottom: 10 }}>
              Events you're for or interested in
            </Text>

            {/* render all student interested */}
            <FlatList
              data={studentData?.studentUpcomingEvents}
              // keyExtractor={(item) => item.eventId}
              renderItem={renderItem}
              keyboardDismissMode="on-drag"
            />
          </View>

          {/* ratings area */}
          <View style={styles.studentEvaluationArea}>
            <Text style={styles.studentEvaluationAreaTitle}>
              Recent Evaluation
            </Text>
            <Text style={styles.studentEvaluationAreaShortDisc}>
              Your feedback on attended events
            </Text>

            {/*  flat list */}
            <FlatList
              // data={studentRatingsData}
              data={studentData?.studentRecantEvaluations}
              // keyExtractor={(item) => item..toString()}
              renderItem={renderItemstudentRatings}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollViewStyle: {
    // paddingVertical: 10,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  headerArea: {
    width: "100%",
    backgroundColor: COLORS.Forth,
    padding: 10,
    shadowColor: COLORS.Primary,
    // shadowColor: "black",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.56,
    shadowRadius: 3.5,

    // shadow sa android
    elevation: 5,
  },
  welcomeText: {
    fontWeight: 400,
    fontSize: 25,
    // marginTop: 20,
    marginLeft: 7,
  },
  welcomeTextShort: {
    fontWeight: 400,
    fontSize: 15,
    marginLeft: 7,

    // margin: 10,
  },
  studentStatusContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    width: "100%",

    marginTop: 10,
  },
  studentStatus: {
    backgroundColor: COLORS.Forth,
    // width: "30%",
    justifyContent: "space-evenly",

    // padding: 20,
    borderRadius: 4,
    // shadow for ios
    shadowColor: COLORS.Primary,
    // shadowColor: "black",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.56,
    shadowRadius: 3.5,

    // shadow sa android
    elevation: 5,
  },
  textStatus: {
    fontWeight: 600,
    fontSize: 18,
  },
  studentEventStatus: {
    flexDirection: "row",
    flexWrap: "nowrap",
    // gap: 10,
    alignContent: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 10,
    paddingVertical: 15,
  },
  studentAttendentStatus: {
    // flexDirection: "row",
    // gap: 10,
    width: "45%",
    alignContent: "center",
    justifyContent: "center",

    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  studentRatingStatus: {
    // flexDirection: "row",
    // gap: 10,
    width: "45%",
    // width: "30%",

    alignContent: "center",
    justifyContent: "center",

    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  // upcoming events
  upcomingEventContainer: {
    marginTop: 20,
    marginHorizontal: "auto",
    width: "95%",
    backgroundColor: COLORS.Forth,
    borderRadius: 8,
    padding: 10,
    shadowColor: COLORS.Primary,
    // shadowColor: "black",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.56,
    shadowRadius: 3.5,

    // shadow sa android
    elevation: 5,
  },
  studentInterestEventContainer: {
    //  marginTop: 20,
  },

  // student evaluation
  studentEvaluationArea: {
    marginVertical: 20,
    marginHorizontal: "auto",
    width: "95%",
    backgroundColor: COLORS.Forth,
    borderRadius: 8,
    padding: 10,
    shadowColor: COLORS.Primary,
    // shadowColor: "black",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.56,
    shadowRadius: 3.5,

    // shadow sa android
    elevation: 5,
  },
  studentEvaluationAreaTitle: {
    fontWeight: 700,
    fontSize: 16,
  },
  studentEvaluationAreaShortDisc: {},
  studentEvaluationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.Third,
    padding: 10,
    borderRadius: 9,
    marginTop: 5,
  },
  studentEvaluationTitle: {
    fontWeight: 500,
  },
  studentEvaluationDate: {},
  studentEvaluationRatingsContainer: {
    justifyContent: "center",
  },
  studentAverageRateText: {
    fontWeight: 500,
  },
  iconStyle: {
    backgroundColor: COLORS.Third,
    padding: 6,
    borderRadius: 40,
  },
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
