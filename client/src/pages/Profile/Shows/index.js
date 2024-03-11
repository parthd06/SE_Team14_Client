import { Col, Form, Modal, Row, Table, message } from "antd";
import React, { useEffect } from "react";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import moment from "moment";

function Shows({ openShowsModal, setOpenShowsModal, theatre }) {
  const [view, setView] = React.useState("table");
  const [shows, setShows] = React.useState([]);

  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Movie",
      dataIndex: "movie",
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
    },
    {
      title: "Available Seats",
      dataIndex: "availableSeats",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];


  return (
    <Modal
      title=""
      open={openShowsModal}
      onCancel={() => setOpenShowsModal(false)}
      width={1400}
      footer={null}
    >
      <h1 className="text-primary text-md uppercase mb-1">
        Theatre : {theatre.name}
      </h1>
      <hr />

      <div className="flex justify-between mt-1 mb-1 items-center">
        <h1 className="text-md uppercase">
          {view === "table" ? "Shows" : "Add Show"}
        </h1>
        {view === "table" && (
          <Button
            variant="outlined"
            title="Add Show"
            onClick={() => {
              setView("form");
            }}
          />
        )}
      </div>

      {view === "table" && <Table columns={columns} dataSource={shows} />}
    </Modal>
  );
}

export default Shows;
