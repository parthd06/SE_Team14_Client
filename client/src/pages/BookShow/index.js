import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GetShowById } from "../../apicalls/theatres";
import { message } from "antd";
import { ShowLoading, HideLoading } from "../../redux/loadersSlice"; // Assuming correct imports
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Button from "../../components/Button";
import { BookShowTickets, MakePayment } from "../../apicalls/bookings";

function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = useState(null); // Initialize show as null
  const [selectedSeats, setSelectedSeats] = useState([]); // Initialize selectedSeats as an empty array

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({ showId: params.id }); // Payload adjusted to "showId"

      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  const getSeats = () => {
    if (!show) return null; // Guard clause if show is not yet loaded

    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);

    return (
      <div className="flex gap-1 flex-col p-2 card">
        {Array.from(Array(rows).keys()).map((row) => (
          <div className="flex gap-1 justify-center" key={row}>
            {Array.from(Array(columns).keys()).map((column) => {
              const seatNumber = row * columns + column + 1;
              let seatClass = "seat";

              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected-seat";
              }

              if (show.bookedSeats.includes(seatNumber)) {
                seatClass += " booked-seat";
              }

              return (
                seatNumber <= totalSeats && (
                  <div
                    key={column} // Unique key for each seat in a row
                    className={seatClass}
                    onClick={() => {
                      if (selectedSeats.includes(seatNumber)) {
                        setSelectedSeats(
                          selectedSeats.filter((item) => item !== seatNumber)
                        );
                      } else {
                        setSelectedSeats([...selectedSeats, seatNumber]);
                      }
                    }}
                  >
                    <h1 className="text-sm">{seatNumber}</h1>
                  </div>
                )
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await BookShowTickets({
        show: params.id,
        seats: selectedSeats,
        transactionId,
        user: user._id,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await MakePayment(
        token,
        selectedSeats.length * show.ticketPrice * 100
      );
      if (response.success) {
        message.success(response.message);
        book(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const getTotalTicketPrice = () => {
    if (!show || selectedSeats.length === 0) return 0;
    return show.ticketPrice * selectedSeats.length;
  };

  useEffect(() => {
    getData();
  }, []); // Dependency array is empty to run once on component mount

  return (
    <div>
      {show && (
        <div className="flex justify-between card p-2">
          <div>
            <h1 className="text-xl">{show.theatre.name}</h1>
            <h1 className="text-xl">{show.theatre.address}</h1>
          </div>
          <div>
            <h1 className="text-2xl">
              {show.movie.title}({show.movie.language})
            </h1>
          </div>
          <div>
            <h1 className="text-xl">
              {moment(show.date).format("MMM Do yyyy ")}
              {moment(show.time, "HH:mm").format("- hh:mm A")}
            </h1>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-2">{getSeats()}</div>
      <div className="flex justify-center mt-4">
        <h1 className="text-xl">
          Total Price: ${getTotalTicketPrice().toFixed(2)}
        </h1>
      </div>

      {selectedSeats.length > 0 && (
        <div className="mt-2 flex justify-center">
          <StripeCheckout
            // currency="usd"
            token={onToken}
            amount={getTotalTicketPrice().toFixed(2) * 100}
            stripeKey="pk_test_51Oz9erIkZaqTp1DToCH45Y8rUL7YXmf6cJJ583LHyy4HFRR8FA754XBuuenlulGfTO9XBdq1fJg60CZgJBACR5IV00QB2uOW5K"
          >
            <Button title="Book Now" />
          </StripeCheckout>
        </div>
      )}
    </div>
  );
}

export default BookShow;
