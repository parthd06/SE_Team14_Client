import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetShowById } from '../../apicalls/theatres';
import { message } from 'antd';
import { ShowLoading, HideLoading } from '../../redux/loadersSlice'; // Make sure these are correctly imported
import moment from 'moment';

function BookShow() {
  const [show, setShow] = React.useState(null); // Initialize show as null

  const params = useParams();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      // Adjust the payload to match the backend expectations ("showId" instead of "showID")
      const response = await GetShowById({ showId: params.id });
      console.log('API Response:', response); // Debugging log to see the response data
      if (response.success) {
        console.log('Setting show:', response.data); // Debugging log for successful data retrieval
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
      console.error('Error fetching show:', error); // Debugging log for catching errors
    }
  };


  useEffect(() => {
    getData();
  }, []); // Dependency array is empty to run once on component mount

  return (
    <div>
      {/* Check if show is not null before trying to access its properties */}
      {show && (
        <div className="flex justify-between card p-2">
          <div>
            <h1 className='text-xl'>{show.theatre.name}</h1>
            <h1 className='text-xl'>{show.theatre.address.name}</h1>
          </div>
          <div>
            <h1 className='text-2xl'>{show.movie.title}({show.movie.language})</h1> {/* Corrected typo here (lanaguage -> language) */}
          </div>
          <div>
            <h1 className='text-xl'>
              {moment(show.date).format('MMM Do yyyy ')}
              {moment(show.time, "HH:mm").format('- hh:mm A')}
            </h1>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default BookShow;
