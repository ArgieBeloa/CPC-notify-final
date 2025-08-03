import { COLORS } from '../../constants/ColorCpc'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const profile = () => {
    return (

        <LinearGradient
            colors={[COLORS.Secondary, COLORS.Third, COLORS.Forth]}
            style={styles.LinearGradient}

        >
            <ScrollView>
                < SafeAreaView style={styles.SafeAreaView}>

                    <Text style={styles.myProfileTitle}>My Profile</Text>
                    <Text style={styles.shortDisc}>Manage your account information and view your event history</Text>

                    <View style={styles.studentProfileArea}>
                        <View style={styles.studentImageProfileContainer}>
                            <Image
                                style={styles.studentImageProfile}

                            />
                            <Text style={styles.studentImageProfileName}>student name</Text>
                            <Text style={styles.studentImageProfileCourse}>Student Course</Text>
                            <Text style={styles.studentImageProfileYearLavel}>Junior</Text>
                        </View>

                        <View style={styles.studentSmallInfoContainer}>
                            <Text style={styles.studentSmallInfoStudentNumber}>student number</Text>
                            <Text style={styles.studentSmallInfoStudentEmail}>student email</Text>
                            <Text style={styles.studentSmallInfoStudentCourse}>student course</Text>
                        </View>

                        {/* student Profile area */}
                    </View>
                </SafeAreaView >
            </ScrollView>
        </LinearGradient>

    )
}

export default profile

const styles = StyleSheet.create({

    LinearGradient: {
        width: '100%',
        height: '100%'


    },
    SafeAreaView: {
        width: '100%',
        height: '100%'
    },
    myProfileTitle: {
        fontWeight: 700,
        marginLeft: 20,
        marginTop: 35,
        fontSize: 25
    },
    shortDisc: {
        fontWeight: 400,
        marginLeft: 20,
    },
    studentProfileArea: {
        backgroundColor: COLORS.Forth,
        borderRadius: 10,
        width: '95%',
        marginTop: 20,
        marginHorizontal: 'auto',

    },
    studentImageProfileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        gap: 5,
    },
    studentImageProfile: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        borderRadius: '50%'

    },

    studentImageProfileName: {
        fontWeight: 600,

    },

    studentImageProfileCourse: {

    },
    studentImageProfileYearLavel: {
        fontWeight: 600,

    },
    studentSmallInfoContainer: {
        width: '100%',
        marginLeft: 10,
        gap: 3

    },
    studentSmallInfoStudentNumber: {
        fontWeight: 'medium'


    },
    studentSmallInfoStudentEmail: {
        fontWeight: 'medium'



    },
    studentSmallInfoStudentCourse: {
        fontWeight: 'medium'

    },
    eventStatsContainer: {
        marginLeft: 10,


    },
    eventStatsTitle: {
        fontWeight: 700,
    },
    eventStatsStudentAttended: {
        fontWeight: 'medium'

    },
    eventStatsStudentAttendedNumber: {

    },
    eventStatsStudentAverageRatings: {

    },
    eventStatsStudentAverageRatingsNumber: {

    },





})