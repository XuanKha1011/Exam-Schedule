import apiInstance from "./config";

const getAllMajors = async(data) => {
  const url = "?" + new URLSearchParams(data).toString()
 try {
    const data  = await apiInstance.get(`api/Major${url}`)
      return data
 } catch (error) {
    throw new Error("Error geting major")
 }
}
const updateMajor = async (data) => {
   try {
     const response = await apiInstance.put(
       `api/Major/${data.majorId}`,
       {
         majorId: data.majorId,
         majorName: data.majorName,
         status: "Active",
       }
     )
     return response
   } catch (error) {
     throw new Error("Error update Major")
   }
 }
 
 const deleteMajor = async (data) => {
   try {
     const response = await apiInstance.put(
       `api/Major/${data.majorId}`,
       {
        ...data,
        majorId: data.majorId,
        status: data.status,
       }
     )
     return response
   } catch (error) {
     throw new Error("Error delete Major")
   }
 }
 
 const createMajor = async (data) => {
   try {
     const response = await apiInstance.post(`api/Major`, {
       majorId: data.majorId,
       majorName: data.majorName,
      status: "Active",
     })
     return response
   } catch (error) {
     throw new Error("Error create Major")
   }
 }

const majorApi = {
    getAllMajors,
    updateMajor,
    deleteMajor,
    createMajor
    
  }
  
  export default majorApi