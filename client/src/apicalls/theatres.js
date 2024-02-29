import { axiosInstance } from ".";

// Add a new theatre
export const AddTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// get all theatres
export const GetAllTheatres = async () => {
  try {
    const response = await axiosInstance.get("/api/theatres/get-all-theatres");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

