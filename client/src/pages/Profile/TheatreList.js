import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import TheatreForm from "./TheatreForm";


function TheatresList() {
  const [showTheatreFormModal = false, setShowTheatreFormModal] =
    useState(false);
  const [selectedTheatre = null, setSelectedTheatre] = useState(null);
  const [formType = "add", setFormType] = useState("add");
  const [theatres = [], setTheatres] = useState([]);

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end mb-1">
        <Button
          title="Add Theatre"
          onClick={() => {
            setFormType("add");
            setShowTheatreFormModal(true);
          }}
        />
      </div>

      {showTheatreFormModal && <TheatreForm
          showTheatreFormModal={showTheatreFormModal}
          setShowTheatreFormModal={setShowTheatreFormModal}
          formType={formType}
          setFormType={setFormType}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
      />}
    </div>
  );
}

export default TheatresList;