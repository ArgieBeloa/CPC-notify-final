// import React, { useState } from 'react';
// import { Button, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

// import { addEventToFirebase } from './firebaseEventService';

// const AnnounceEvent = () => {
//     const [eventTitle, setEventTitle] = useState('');
//     const [eventShortDescription, setEventShortDescription] = useState('');
//     const [eventDescription, setEventDescription] = useState('');
//     const [eventLocation, setEventLocation] = useState('');
//     const [allStudents, setAllStudents] = useState(false);
//     const [deparmentName, setDeparmentName] = useState('');
//     const [organizationName, setOrganizationName] = useState('');

//     const handleAnnounce = () => {

//       haddleAddEventDataToDatabese()

//         console.log('added success');
//         // Add your Firebase or FCM logic here
//     };

//     const haddleAddEventDataToDatabese = async () => {

//         const date = new Date(Date.now());
//         const formattedDate = date.toISOString().split('T')[0];
//         const eventDate: string = formattedDate
//         const eventTime: string = formattedDate
//         const eventNumberOfAttenting: number = 0
//         const eventNumberOfStudentRated: number = 0
//         const eventRating: number = 0

//         // addEventToFirebase
//         try {
//             await addEventToFirebase(

//                 eventTitle,
//                 eventShortDescription,
//                 eventDescription,
//                 eventLocation,
//                 eventDate,
//                 eventTime,
//                 allStudents,
//                 deparmentName,
//                 organizationName,
//                 eventNumberOfAttenting,
//                 eventNumberOfStudentRated,
//                 eventRating
//             )

//             console.log('event Successfully added')

//             //  remove all setArea
//        setEventTitle('')
//        setEventShortDescription('')
//        setEventDescription(''),
//        setEventLocation('')
//        setAllStudents(false),
//        setDeparmentName(''),
//        setOrganizationName('')
//         } catch (error) {
//             console.log(error)
//         }


//     }
//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.heading}>Announce Event</Text>

//             <TextInput
//                 style={styles.input}
//                 placeholder="Event Title"
//                 value={eventTitle}
//                 onChangeText={setEventTitle}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Short Description"
//                 value={eventShortDescription}
//                 onChangeText={setEventShortDescription}
//             />
//             <TextInput
//                 style={[styles.input, styles.multiline]}
//                 placeholder="Full Description"
//                 multiline
//                 numberOfLines={4}
//                 value={eventDescription}
//                 onChangeText={setEventDescription}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Location"
//                 value={eventLocation}
//                 onChangeText={setEventLocation}
//             />
//             <View style={styles.switchRow}>
//                 <Text style={styles.label}>Send to All Students</Text>
//                 <Switch value={allStudents} onValueChange={setAllStudents} />
//             </View>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Department Name"
//                 value={deparmentName}
//                 onChangeText={setDeparmentName}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Organization Name"
//                 value={organizationName}
//                 onChangeText={setOrganizationName}
//             />

//             <View style={styles.buttonContainer}>
//                 <Button title="Announce" onPress={handleAnnounce} />
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     heading: {
//         fontSize: 24,
//         marginBottom: 20,
//         fontWeight: 'bold',
//     },
//     input: {
//         width: '100%',
//         borderColor: '#ccc',
//         borderWidth: 1,
//         padding: 10,
//         borderRadius: 8,
//         marginBottom: 12,
//     },
//     multiline: {
//         textAlignVertical: 'top',
//     },
//     switchRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         width: '100%',
//         marginBottom: 12,
//     },
//     label: {
//         fontSize: 16,
//     },
//     buttonContainer: {
//         width: '100%',
//         marginTop: 20,
//     },
// });

// export default AnnounceEvent;
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const eventAnnouncer = () => {
  return (
    <View>
      <Text>eventAnnouncer</Text>
    </View>
  )
}

export default eventAnnouncer

const styles = StyleSheet.create({})