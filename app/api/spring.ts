import axios from "axios";

 const BASE_URL = "https://capstonestudentloginapi-1.onrender.com/api"; // Use your local IP and port
// const BASE_URL = "http://192.168.140.25:8080/api"; // Use your local IP and port

// auth student
export const authStudent = async (
  studentNumber: string,
  studentPassword: string
) => {
  try {
    const token = await axios.post(`${BASE_URL}/students/login`, {
      studentNumber,
      studentPassword,
    });

    return token.data;
  } catch (error) {
    console.error("Failed to authenticate student:", error);
    throw error;
  }
};

// register student

// const API_URL = 'https://capstonestudentloginapi.onrender.com/api/students/register';

export interface RegisterStudentParams {
  studentName: string;
  studentNumber: string;
  selectedCourse: string;
  selectedDeparment: string;
  expoPushToken: string | undefined;
}

export async function registerStudent({
  studentName,
  studentNumber,
  selectedCourse,
  selectedDeparment,
  expoPushToken,
}: RegisterStudentParams): Promise<any> {
  try {
    const response = await axios.post(`${BASE_URL}/students/register`, {
      studentName,
      studentNumber,
      studentPassword: studentNumber,
      course: selectedCourse,
      department: selectedDeparment,
      notificationId: expoPushToken,
      category: "student",
      studentAverageAttendance: 0.0,
      studentAverageRatings: 0.0,
      studentEventAttended: [],
      studentRecentEvaluations: [],
    });

    return response.data;
  } catch (error) {
    console.error("Register API Error:", error);
    throw error;
  }
}

// getStudentData using studentID
export const studentDataFunction = async (
  studentNumber: string,
  token: string
) => {
  try {
    const studentData = await axios.get(
      `${BASE_URL}/students/${studentNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return studentData.data;
  } catch (error) {
    console.error("Failed to get student Data: ", error);
    throw error;
  }
};

// get all events
export const eventsDataFunction = async (token: string) => {
  try {
    const events = await axios.get(`${BASE_URL}/events/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return events.data;
  } catch (error) {
    console.error("Failed to get event data: ", error);
    throw error;
  }
};
