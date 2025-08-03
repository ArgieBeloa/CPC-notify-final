import { COLORS } from "@/constants/ColorCpc";
import PicturePath from "@/constants/PicturePath";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// icon
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useUser } from "@/src/userContext";
import axios from "axios";
import { useEffect, useState } from "react";

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


type StudentUpcomingEvents = {
  eventId?: string;
  eventTitle?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  numberOfStudentAttending?: number;
  studentWant: string;
}[];

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

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { studentToken, studentData } = useUser();

  const [eventFullDetails, setEventFullDetails] = useState<EventData>();


  const [updatedAttending, setUpdatedAttending] = useState(0);

  const studentId = studentData.id;

  //  loading
  const [loading, setLoading] = useState(false);

  //  console.log(eventFullDetails?.eventAgenda[0]?.agendaTitle?)
  useEffect(() => {
    const fetchEvent = async (token: string, id: any) => {
      try {
        const api = `http://localhost:8080/api/events/id/${id}`;

        const event = await axios.get(api, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEventFullDetails(event.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvent(studentToken, id);
  }, []);

  const handleStudentWant = async (
    studentId: string,
    token: string,
    studentWant: string

  ) => {
    console.log(studentToken);

    const api = `http://localhost:8080/api/students/${studentId}/upcomingEvents`;

    
  const upcomingEventData: StudentUpcomingEvents = [
    {
      eventId: eventFullDetails?.id,
      eventTitle: eventFullDetails?.eventTitle,
      eventDate: eventFullDetails?.eventDate,
      eventTime: eventFullDetails?.eventTime,
      eventLocation: eventFullDetails?.eventLocation,
      numberOfStudentAttending: updateStudentAttending(),
      studentWant:  studentWant
    },
  ];
    try {
      const upcomingEvent = await axios.post(api, upcomingEventData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // console.log(upcomingEvent);

      await updateEventData(id, studentToken);
    } catch (error) {
      console.log(error);
    }
  };
  // get the current number of attending

  function updateStudentAttending(): number {
    let currentNumberOfAttending = eventFullDetails?.allStudentAttending

    // add one
    if (
      currentNumberOfAttending !== undefined ||
      currentNumberOfAttending === 0
    ) {
      currentNumberOfAttending++
    } else {
      currentNumberOfAttending = 0;
    }

    return currentNumberOfAttending;
  }

  // update the number of attending or intersting
  const updateEventData = async (id: any, token: string) => {
    try {
      const api = `http://localhost:8080/api/events/update/${id}`;

      const eventUpdate = await axios.put(api, updateDocument, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(eventUpdate.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDocument: EventData = {
    id: eventFullDetails?.id,
    eventTitle: eventFullDetails?.eventTitle,
    eventShortDescription: eventFullDetails?.eventShortDescription,
    eventBody: eventFullDetails?.eventBody,
    eventDate: eventFullDetails?.eventDate,
    eventTime: eventFullDetails?.eventTime,
    eventLocation: eventFullDetails?.eventLocation,
    eventCategory: eventFullDetails?.eventCategory,
    eventTimeLength: eventFullDetails?.eventTimeLength,
    eventAgendas: eventFullDetails?.eventAgendas,
    eventStats: eventFullDetails?.eventStats,
    eventOrganizer: eventFullDetails?.eventOrganizer,
    eventEvaluationDetails: eventFullDetails?.eventEvaluationDetails,
    eventPerformanceDetails: eventFullDetails?.eventPerformanceDetails,
    allStudentAttending: updateStudentAttending(),
  };
  // data upcoming events


  const router = useRouter();

  // console.log(eventFullDetails?.eventAgendas)
  // flatlist Agenda

  const renderItemAgenda = ({ item }: { item: EventAgenda }) => {
    return (
      <View style={styles.flatlistContainer}>
        <View style={styles.flatlistAgendaTimeContainer}>
          <Text style={styles.flatlistAgendaTime}>{item?.agendaTime}</Text>
        </View>

        <View>
          <Text style={styles.flatlistAgendaTitle}>{item?.agendaTitle}</Text>
          <Text style={styles.flatlistAgendaHost}>{item?.agendaHost}</Text>
        </View>
      </View>
    );
  };
  return (
    <LinearGradient
      colors={[COLORS.Secondary, COLORS.Third]}
      style={styles.container}
    >
      <ScrollView>
        <SafeAreaView style={styles.safeAreaView}>
          {/* header */}
          <View style={[styles.headerAreaContainer, styles.viewContainer]}>
            <Text style={[styles.textBold, { fontSize: 25 }]}>
              Campus Events
            </Text>
            <Text style={[styles.textSemiBold, { fontSize: 15 }]}>
              Discover and join exciting events happening on campus
            </Text>
          </View>
          <View>
            {/* back Button */}
            <Pressable
              onPress={() => {
                router.push("/(tabs)/home");
              }}
              style={{ width: 100 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 20,
                  marginLeft: 14,
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
                <Text style={{ fontSize: 20 }}>Back</Text>
              </View>
            </Pressable>
          </View>

          {/* eventDetails area */}
          <View
            style={[
              styles.viewContainer,
              styles.viewRadius,
              {
                overflow: "hidden",
                width: "98%",
                marginHorizontal: "auto",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.Forth,
              },
            ]}
          >
            {/* image bg */}
            <ImageBackground source={PicturePath.ruth} style={styles.imageBG}>
              <View style={[styles.containerEventInfo]}>
                <Text style={styles.containerEventInfoTitle}>
                  {eventFullDetails?.eventTitle}
                </Text>
                {/* small area */}
                <View style={styles.containerSmallInfo}>
                  {/* date  */}
                  <View style={styles.containerSmall}>
                    {/* icon here */}
                    <AntDesign name="calendar" size={19} color={COLORS.Forth} />
                    <Text
                      style={styles.containerSmallText}
                    >{`${eventFullDetails?.eventDate}`}</Text>
                  </View>

                  {/* time length*/}
                  <View style={styles.containerSmall}>
                    {/* icon here */}
                    <AntDesign name="clockcircleo" size={19} color="white" />
                    <Text style={styles.containerSmallText}>
                      {eventFullDetails?.eventTimeLength}
                    </Text>
                  </View>

                  {/* location */}
                  <View style={styles.containerSmall}>
                    {/* icon here */}
                    <Ionicons name="location-outline" size={19} color="white" />
                    <Text style={styles.containerSmallText}>
                      {eventFullDetails?.eventLocation}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>

            {/* about area */}
            <View style={styles.aboutContainer}>
              <Text style={styles.aboutTitle}>About This Event</Text>

              <Text style={styles.aboutDiscription}>
                {eventFullDetails?.eventBody}
              </Text>
            </View>
          </View>

          {/* Agenda Area */}
          <View
            style={[
              styles.eventAgendaContainer,
              styles.viewContainer,
              styles.viewRadius,
            ]}
          >
            <Text style={styles.eventAgendaText}>Event Agenda</Text>

            <FlatList
              data={eventFullDetails?.eventAgendas}
              // data={[]}
              renderItem={renderItemAgenda}
            />
          </View>

          {/* join this event area */}
          <View
            style={[
              styles.joinEventContainer,
              styles.viewContainer,
              styles.viewRadius,
            ]}
          >
            <Text style={styles.joinEventContainerTitle}>Join This Event</Text>

            {/* attending Button */}
            <TouchableHighlight
              style={styles.joinEventBtnAttending}
              onPress={() => {
                
                handleStudentWant(studentId, studentToken, "Register");
             
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                }}
              >
                <FontAwesome name="group" size={19} color="white" />
                <Text style={[styles.joinEventBtnText, { color: "white" }]}>
                  I'm Attending
                </Text>
                {loading && (
                  <ActivityIndicator
                    size="large"
                    color="#007AFF"
                    style={
                      {
                        // position: "absolute",
                        // top: "50%",
                      }
                    }
                  />
                )}
              </View>
            </TouchableHighlight>

            {/* Interested Button */}
            <TouchableHighlight
              style={styles.joinEventBtnInterested}
              onPress={() => {
             
                handleStudentWant(studentId, studentToken, "Interested");
               
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                }}
              >
                <AntDesign name="heart" size={19} color="red" />
                <Text style={styles.joinEventBtnText}> Interested</Text>
              </View>
            </TouchableHighlight>
          </View>

          {/* event stats area */}
          <View
            style={[
              styles.statsContainer,
              styles.viewContainer,
              styles.viewRadius,
            ]}
          >
            <Text style={styles.statsContainerText}>Event Stats</Text>

            {/* attending data */}
            <View style={styles.statsSmallContainer}>
              <Text>Attending</Text>

              <Text style={{ fontWeight: 500 }}>
                {eventFullDetails?.eventStats?.attending}
              </Text>
            </View>
            {/* Intereted data */}
            <View style={styles.statsSmallContainer}>
              <Text>Interested</Text>
              <Text>{eventFullDetails?.eventStats?.interested}</Text>
            </View>
          </View>

          {/* Organazer Area */}
          <View
            style={[
              styles.organizerContainer,
              styles.viewContainer,
              styles.viewRadius,
            ]}
          >
            <Text style={styles.organizerContainerText}>Organizer</Text>

            <View style={styles.organizerInfo}>
              {/* organizer logo */}
              <View style={styles.organizerLogoContainer}>
                {/* logo here */}
                <Text>IT</Text>
              </View>

              {/* organizer info */}
              <View style={styles.organizerSmallInfo}>
                <Text style={styles.organizerSmallInfoTitle}>
                  {eventFullDetails?.eventOrganizer?.organizerName}
                </Text>
                <Text>{eventFullDetails?.eventOrganizer?.organizerEmail}</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  safeAreaView: {
    width: "100%",
    height: "100%",
  },

  // glocbal css
  viewContainer: {
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

    marginHorizontal: "auto",
  },
  textBold: {
    fontWeight: 700,
  },

  textSemiBold: {
    fontWeight: 400,
  },
  viewRadius: {
    borderRadius: 8,
  },

  // header Area
  headerAreaContainer: {
    backgroundColor: COLORS.Forth,
    width: "100%",
    padding: 10,
  },

  // event info section
  imageBG: {
    height: 250,
    width: "100%",
  },
  containerEventInfo: {
    // backgroundColor: ,
    width: "98%",
    marginTop: "auto",
    paddingLeft: 10,
    marginBottom: 5,
  },
  containerEventInfoTitle: {
    color: "white",
    fontWeight: 700,
    fontSize: 19,
  },
  containerSmallInfo: {
    // backgroundColor:

    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  containerSmall: {
    //  color: 'white',
    flexDirection: "row",
    gap: 5,
  },
  containerSmallText: {
    color: "white",
  },
  aboutContainer: {
    marginRight: 'auto',
    paddingLeft: 10,
  },
  aboutTitle: {
    marginVertical: 10,
    fontWeight: 600,
    fontSize: 18,
  },
  aboutDiscription: {
    marginBottom: 10,
  },
  eventAgendaContainer: {
    width: "98%",
    backgroundColor: COLORS.Forth,
    marginVertical: 10,
    paddingBottom: 10,
  },
  eventAgendaText: {
    paddingLeft: 10,
    fontWeight: 600,
    marginVertical: 10,
    fontSize: 16,
  },
  //flatlist data
  flatlistContainer: {
    flexDirection: "row",
    // justifyContent: 'center'
    marginLeft: 20,
    marginVertical: 5,
    gap: 10,
  },
  flatlistAgendaTimeContainer: {
    backgroundColor: COLORS.Primary,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  flatlistAgendaTime: {
    color: "white",
  },
  flatlistAgendaTitle: {
    fontWeight: 600,
  },
  flatlistAgendaHost: {},

  //join this event
  joinEventContainer: {
    width: "98%",
    backgroundColor: COLORS.Forth,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  joinEventContainerTitle: {
    fontSize: 16,
    fontWeight: 600,
    // marginLeft: 10,
    marginBottom: 10,
  },
  // joinEventBtn: {},
  joinEventBtnAttending: {
    backgroundColor: COLORS.Primary,
    borderRadius: 9,
    marginVertical: 10,
  },
  joinEventBtnInterested: {
    backgroundColor: COLORS.Third,
    borderRadius: 9,
  },
  joinEventBtnText: {},

  // stats area
  statsContainer: {
    backgroundColor: COLORS.Forth,
    width: "98%",
    marginVertical: 10,
    paddingBottom: 10,
  },

  statsContainerText: {
    fontWeight: 600,
    fontSize: 19,
    marginVertical: 10,
    marginLeft: 10,
  },
  statsSmallContainer: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },

  //  organizer data
  organizerContainer: {
    backgroundColor: COLORS.Forth,
    width: "98%",
    paddingVertical: 10,
    marginBottom: 10,
  },
  organizerContainerText: {
    fontWeight: 600,
    fontSize: 19,
    marginLeft: 10,
    marginBottom: 10,
  },
  organizerInfo: {
    flexDirection: "row",
    marginLeft: 15,
    // gap: 10,
  },
  organizerLogoContainer: {
    backgroundColor: COLORS.Primary,
    padding: 10,
    borderRadius: "50%",
  },
  organizerSmallInfo: {
    flex: 1,
    marginLeft: 10,
  },

  organizerSmallInfoTitle: {
    fontWeight: 500,
    fontSize: 16,
  },
});
