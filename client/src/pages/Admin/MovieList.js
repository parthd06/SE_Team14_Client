import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import MovieForm from "./MovieForm";
import moment from "moment";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { DeleteMovie, GetAllMovies } from "../../apicalls/movies";

function MovieList() {
  const [showMovieFormModal, setShowMovieFormModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [movies, setMovies] = useState([]); // Declare movies state
  const dispatch = useDispatch();
  // Correcting the handleDelete function
  const handleDelete = async (movieId) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteMovie(movieId); // Corrected this line
      if (response.success) {
        message.success(response.message);
        getData(); // Refresh data to reflect the deletion
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Correcting the getData function
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies(); // Corrected this line to call the correct function
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, record) => {
        return <img src={record.poster} alt="poster" height="60" width="100" />;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            <i
              className="ri-delete-bin-fill"
              onClick={() => {
                handleDelete(record._id);
              }}
            ></i>
            <i
              className="ri-pencil-fill"
              onClick={() => {
                setSelectedMovie(record);
                setFormType("edit");
                setShowMovieFormModal(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-5">
        <Button
          title="Add Movie"
          onClick={() => {
            setShowMovieFormModal(true);
            setFormType("add");
            setSelectedMovie(null); // Ensure no movie is selected when adding a new one
          }}
        />
      </div>

      <Table columns={columns} dataSource={movies} />
      {showMovieFormModal && (
        <MovieForm
          showMovieFormModal={showMovieFormModal}
          setShowMovieFormModal={setShowMovieFormModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}
        />
      )}
    </div>
  );
}

export default MovieList;
