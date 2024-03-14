import React, { useEffect, useState } from 'react';
import { Row, message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';
import { GetAllMovies } from '../../apicalls/movie';
import { Col } from 'antd';
import {useNavigate} from "react-router-dom";


function Home() {
    const [movies, setMovies] = useState([]);
    const Navigate = useNavigate()
    const dispatch = useDispatch()
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
    }



    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <input type="text"
                className="search-input"
                placeholder="Search for Movies"
            />

            <Row gutter={[20]} className="mt-2">
                {movies.map((movie) => (
                    <Col span={6}>
                        <div className="card flex flex-col gap-1 cursor-pointer"
                            onClick={() => Navigate(`/movies/${movie._id}`)}>
                            <img src={movie.poster} alt="" height={250}></img>

                            <div className="flex justify-center p-1">
                                <h1 className="text-md uppercase">{movie.title}</h1>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Home;
