const { axiosInstance } = require(".");

export const AddMovie = async(payload)=>{
    try{
        const response=await axiosInstance.post("/api/movies/add-movie",payload);
        return response.data;
        
    }catch(error){
        return error.response;
    }
}

//get all movies
export const GetAllMovies=async() =>{
    try{
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        return response.data;
    }catch(error){
        return error.response;
    }
}

//update a movie
export const UpdateMovie = async(payload) =>{
    try{
        const response=await axiosInstance.post('/api/movies/update-movie',payload);
        return response.data;
    }catch(error){
        return error.response;
    }
}

// Correcting the DeleteMovie function to send the payload correctly
export const DeleteMovie = async (movieId) => {
    try {
        const response = await axiosInstance.post('/api/movies/delete-movie', { movieId }); // Correctly formatted payload
        return response.data;
    } catch (error) {
        return error.response;
    }
}
