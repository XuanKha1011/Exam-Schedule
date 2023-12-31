import apiInstance from "./config"

const getAllExamschedules = async (data) => {
  const url = "?" + new URLSearchParams(data).toString()
  try {
     
    const data = await apiInstance.get(`api/ExamSchedule${url}`)
    return data
  } catch (error) {
    throw new Error("Error geting exam schedule")
  }
}

const createExamschedule = async (res) => {
  try {
    const data = await apiInstance.post("api/ExamSchedule", res)
    return data
  } catch (error) {
    throw new Error("Error geting exam schedule")
  }
}

const generateExamSchedule = async (res) => {
  try {
    const data = await apiInstance.post(
      `api/ExamSchedule/GenerateExamSchedule?courseId=${res.courseId}&examSlotId=${res.examSlotId}`
    )
  } catch (error) {
    throw new Error("Error generate exam schedule")
  }
}

const getExamScheduleByCourseIdAndExamSlotId = async (res) => {
  try {
    const url = "&" + new URLSearchParams(res).toString()
    const data = await apiInstance.get(
      `api/ExamSchedule/GetExamSchedulesByCourseIDAndExamSlotID?${url}`
    )
    return data;
  } catch (error) {
    throw new Error("Error getting exam schedule details")
  }
}

const sendMail = async (res) => {

  try {

    const data = await apiInstance.post(
      `api/ExamSchedule/SendEmailNotification?courseId=${res.courseId}&examSlotId=${res.examSlotId}`
    )
    return data;
  } catch (error) {
    throw new Error("Error sent mail")
  }
}

const getExamScheduleByUsername = async (res) => {
  try {
    const url = "?" + new URLSearchParams(res).toString()+"&"
    const data = await apiInstance.get(
      `api/ExamSchedule/GetExamSchedulesByStudentUsername${url}`
    )
    return data;
  } catch (error) {
    throw new Error("Error getting exam schedule details")
  }
}


const examscheduleApi = {
  getAllExamschedules,
  createExamschedule,
  generateExamSchedule,
  getExamScheduleByCourseIdAndExamSlotId,
  sendMail,
  getExamScheduleByUsername
}

export default examscheduleApi
