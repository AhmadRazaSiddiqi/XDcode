import axios from "axios"
const baseurl = import.meta.env.VITE_API_URI

export const getFiles = async () => {
  try {
    const response = await axios.get(`${baseurl}file/get`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.log("Error")
  }
}

export const getFile = async (_id) => {
  try {
    const response = await axios.get(`${baseurl}file/get/${_id}`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.log("Error")
  }
}

// create
export const createFiles = async (fileDetails) => {
  try {
    const response = await axios.post(`${baseurl}file/create`, fileDetails, {
      withCredentials: true,
    })
    alert(response.data.msg)
    return response.data  // Return success message
  } catch (error) {
    if (error.response) {
      alert(error.response.data.err)
      return { error: error.response.data.err } // Return backend error
    }
    return { error: "Something Went Wrong" } // Generic error message
  }
}
export const updateFiles = async (_id, fileDetails) => {
  try {
    const response = await axios.patch(
      `${baseurl}file/update/${_id}`,
      fileDetails,
      { withCredentials: true }
    )
    return response.data
  } catch (error) {
    console.log("Error")
  }
}
export const deleteFiles = async (_id) => {
  try {
    const response = await axios.delete(`${baseurl}file/delete/${_id}`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.log("Error")
  }
}
