import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/ColorCpc";
import PicturePath from "../../constants/PicturePath";
//api
import { eventsDataFunction } from "../api/spring";
// get data from index
import { useUser } from "../../src/userContext";

// /icon
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

// interface eventThisMonthData {
//   id: string;
//   eventTitle: string;
//   eventShortDescription: string;
//   eventBody: string;
//   allStudentRegister?: number;
//   allStudentInteresting?: number;
//   eventDate: string;
//   eventTime: string;
//   eventLocation: string;
//   eventCategory?: string;
// }

// const eventThisMonth: eventThisMonthData[] = [];

// eventThisMonth.push({
//   id: "1",
//   eventTitle: "Enrollment",
//   eventShortDescription: "Test Short discription",
//   eventBody: "this is body",
//   eventDate: "July 07 to 25, 2025",
//   eventTime: "1:00Pm",
//   eventLocation: "SLEC",
//   allStudentRegister: 20,
//   allStudentInteresting: 50,
//   eventCategory: "Technology",
// });
// eventThisMonth.push({
//   id: "2",
//   eventTitle: "Enrollment",
//   eventShortDescription: "Test Short discription",
//   eventBody: "this is body",
//   eventDate: "July 07 to 25, 2025",
//   eventTime: "1:00Pm",
//   eventLocation: "DABBA",
//   allStudentRegister: 20,
//   allStudentInteresting: 50,
//   eventCategory: "Technology",
// });
// eventThisMonth.push({
//   id: "3",
//   eventTitle: "Enrollment",
//   eventShortDescription: "Test Short discription",
//   eventBody: "this is body",
//   eventDate: "July 07 to 25, 2025",
//   eventTime: "1:00Pm",
//   eventLocation: "DABBA",
//   allStudentRegister: 20,
//   allStudentInteresting: 50,
//   eventCategory: "Technology",
// });
// eventThisMonth.push({
//   id: "4",
//   eventTitle: "Enrollment",
//   eventShortDescription: "Test Short discription",
//   eventBody: "this is body",
//   eventDate: "July 07 to 25, 2025",
//   eventTime: "1:00Pm",
//   eventLocation: "DABBA",
//   allStudentRegister: 20,
//   allStudentInteresting: 50,
//   eventCategory: "Technology",
// });

type Event = {
  id?: string;
};

const events = () => {
  // get all events in server
  const { eventData, setEventData, studentToken } = useUser();
  const [removeFlatList, setRemoveFlatlist] = useState(true);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const events = await eventsDataFunction(studentToken);
        setEventData(events);
      } catch (error) {
        console.log(error);
      }
    };

    getAllEvents();
  }, []);

  const [selectedEvent, setSelectedEvent] = useState<Event | any>();

  const router = useRouter(); // ✅ hook inside the component

  const handleSelectedEvent = (id: string) => {
    // console.log('selected event', event)
    router.push({
      pathname: `../EventDetails/${id}`,
      params: { id },
    });
  };

  const eventThisMonthRender = ({ item }: { item: any }) => {
    let dateAndTime = item.eventDate + " at " + item.eventTime;
    const iconSize = 16;
    let imageSource;

    if (item.eventLocation === "DABBA") {
      imageSource = PicturePath.city;
    } else if (item.eventLocation === "SLEC") {
      imageSource = PicturePath.kuweba;
    }

    return (
      <View
        style={[
          styles.eventDetailsContainer,
          {
            borderRadius: 6,
            overflow: "hidden",
            backgroundColor: COLORS.Third,
          },
        ]}
      >
        <ImageBackground
          source={imageSource}
          style={styles.eventDetailsImage}
        ></ImageBackground>
        <Text style={{ marginLeft: 20, marginTop: 12, fontWeight: 500 }}>
          {item.eventTitle}
        </Text>
        <Text style={{ marginLeft: 20, marginTop: 7, fontWeight: 400 }}>
          {item.eventShortDescription}
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
            flexWrap: "wrap",
            marginLeft: 30,
            marginTop: 7,
          }}
        >
          <Ionicons
            name="calendar-clear-outline"
            size={iconSize}
            color="black"
          />
          <Text style={{ fontWeight: 400 }}>{dateAndTime}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
            flexWrap: "wrap",
            marginLeft: 30,
            marginTop: 7,
          }}
        >
          <Text style={{ fontWeight: 400 }}>
            <EvilIcons name="location" size={iconSize} color="black" />
            {item.eventLocation}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 30,
            marginTop: 7,
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <Text>
            <SimpleLineIcons name="people" size={iconSize} color="black" />{" "}
            {item.allStudentRegister}
          </Text>
          <Text>
            <FontAwesome5 name="heart" size={iconSize} color="black" />{" "}
            {item.allStudentInteresting}
          </Text>
          <Text style={{ marginLeft: "auto", marginRight: 12 }}>
            {item.eventCategory}
          </Text>
        </View>
        <TouchableHighlight
          style={{
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 9,
            backgroundColor: COLORS.Primary,
            marginHorizontal: "auto",
            borderRadius: 4,
          }}
          // onPress={() => haddleEventFullDetails(item.id, item.eventLocation)}
          onPress={() => handleSelectedEvent(item.id)}
        >
          <Text style={{ color: "white", marginVertical: 5 }}>
            View Details
          </Text>
        </TouchableHighlight>
      </View>
    );
  };

  const buttonCategoryTitle: string[] = [
    "Event This Month",
    "Technology",
    "Academic",
  ];

  const [selectedCategory, setSelectedCategory] =
    useState<string>("Event This Month");

  return (
    <LinearGradient
      colors={[COLORS.Secondary, COLORS.Third]}
      style={styles.container}
    >
      <ScrollView>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={[styles.headerAreaContainer, styles.viewContainer]}>
            <Text style={[styles.textBold, { fontSize: 25 }]}>
              Campus Events
            </Text>
            <Text style={[styles.textSemiBold, { fontSize: 15 }]}>
              Discover and join exciting events happening on campus
            </Text>
          </View>

          <View
            style={[
              styles.searchContainer,
              styles.viewContainer,
              styles.viewRadius,
            ]}
          >
            <Pressable onPress={() => setRemoveFlatlist(false)}>
              <FontAwesome5 name="search" size={24} color="black" />
            </Pressable>

            <TextInput
              placeholder="Search Events..."
              style={styles.searchTextInput}
            />
          </View>

          {/* category Area */}
          <View
            style={[
              styles.categoryArea,
              styles.viewContainer,
              styles.viewRadius,
            ]}
          >
            {/* <TouchableHighlight style={[styles.categoryButton]} onPress={ haddleButtonCategoryClick}>
            <Text style={styles.categoryButtonText}>Event This month</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.categoryButton]} onPress={ haddleButtonCategoryClick}>
            <Text style={styles.categoryButtonText}>Technology</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.categoryButton]} onPress={ haddleButtonCategoryClick}>
            <Text style={styles.categoryButtonText}>Academic</Text>
          </TouchableHighlight> */}

            {buttonCategoryTitle.map((title) => (
              <TouchableHighlight
                key={title}
                style={[
                  styles.categoryButton,
                  selectedCategory === title && {
                    backgroundColor: COLORS.Primary,
                  },
                ]}
                onPress={() => {
                  // setCategoryButtonClick(true)
                  setSelectedCategory(title);
                }}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === title && { color: "white" },
                  ]}
                >
                  {title}
                </Text>
              </TouchableHighlight>
            ))}
          </View>

          {/* Events Area */}
          <View
            style={[styles.eventsArea, styles.viewContainer, styles.viewRadius]}
          >
           

              <FlatList
                style={[styles.flatlistEventContainer,{ display: removeFlatList ? 'flex' : 'none' }]}
                data={eventData}
                keyExtractor={(item) => item.id}
                renderItem={eventThisMonthRender}
                numColumns={2}
                columnWrapperStyle={styles.flatlistRow}
              
              />
            
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default events;

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
  flatListCSS: {
    width: "95%",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,

    width: "97%",
    backgroundColor: COLORS.Forth,
    marginVertical: 10,
    paddingLeft: 20,
    overflow: "hidden",
  },
  searchTextInput: {
    height: 40,
    padding: 5,
    width: "100%",
  },

  categoryArea: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "center",
    width: "97%",
    backgroundColor: COLORS.EGGWHITE,
    marginHorizontal: "auto",
    marginBottom: 10,
    gap: 5,
    padding: 4,
  },
  categoryButton: {
    backgroundColor: COLORS.ALICEBLUE,
    borderRadius: 6,
  },
  categoryButtonText: {
    paddingHorizontal: 14,
    paddingVertical: 7,
  },

  eventsArea: {
    width: "97%",
    // flexDirection: "row",

    // justifyContent: "space-evenly",
    backgroundColor: COLORS.Forth,
  },
  flatlistEventContainer: {
    width: "100%",

    flex: 1,
    // justifyContent: "space-around"

    // backgroundColor: COLORS.Primary
  },
  flatlistRow: {
    justifyContent: "space-around",
    marginVertical: 5,
  },
  eventDetailsContainer: {
    width: "48%",

    // width: "48%",
  },
  eventDetailsImage: {
    width: "100%",
    height: 120,
  },
});
