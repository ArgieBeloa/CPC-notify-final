import axios from "axios";

const BASE_URL = "http://192.168.254.103:8080/api"; // Use your local IP and port

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

// getStudentData using studentID
export const studentDataFunction = async (studentNumber: string, token: string) => {
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
    const events = await axios.get(`${BASE_URL}/events/getAll`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
      return events.data

  } catch (error) {
        console.error("Failed to get event data: ", error);
    throw error;
  }
}
