import React, { useRef, useLayoutEffect, useState } from "react";
import "./RegisterRow.css";
import MorningIcon from "@mui/icons-material/WbSunny";
import AfternoonIcon from "@mui/icons-material/Nightlight";
import TotalIcon from "@mui/icons-material/AllInclusive";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Database from "../../Database";
import { Modal, Box, Typography, Button } from "@mui/material";

export default ({
  description,
  startInterval,
  endInterval,
  totalHours,
  totalMorningHours,
  totalAfternoonHours,
  date,
  returnData,
}) => {
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const specific = useRef();
  const openSpecific = () => {
    specific.current.classList.toggle("active");
  };

  const newDescription = useRef();
  const newStartHour = useRef();
  const newEndHour = useRef();
  const error = useRef();
  const newDate = useRef();

  const editRegister = async () => {
    const registerId = await Database.returnId(
      description,
      startInterval,
      endInterval,
      date
    );
    const dateObject = new Date(newDate.current.value + " " + newStartHour.current.value);
    const dateToUpdate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
    const response = await Database.updateRegister(
      registerId,
      newDescription.current.value,
      newStartHour.current.value,
      newEndHour.current.value,
      dateToUpdate
    );
    returnData(response.employeeHours.data);
    handleCloseEdit();
  };

  const deleteRegister = async () => {
    const registerId = await Database.returnId(
      description,
      startInterval,
      endInterval,
      date
    );
    const response = await Database.removeRegister(registerId);
    returnData(response.employeeHours.data);
  };

  const verifyDateTime = async () => {
    const startHourDOM = newStartHour.current;
    const endHourDOM = newEndHour.current;

    if (
      newDescription.current.value.trim() === "" ||
      newDate.current.value === "" ||
      startHourDOM.value === "" ||
      endHourDOM.value === ""
    ) {
      error.current.innerText = "Erro! Não podem haver campos vazios!";
    } else {
      const startDate = new Date(
        newDate.current.value + " " + startHourDOM.value
      );
      const endDate = new Date(newDate.current.value + " " + endHourDOM.value);

      const now = new Date();

      if (startDate.getTime() >= endDate.getTime()) {
        error.current.innerText =
          "Erro! O horário de início deve ser menor que o final!";
      } else if (endDate.getTime() > now.getTime()) {
        error.current.innerText = "Erro! A data não pode ser a partir de hoje!";
      } else {
        editRegister();
      }
    }
  };

  const verifyHourAllTheTime = (input) => {
    const value = input.value;

    const justNumbers = value.replace(/[^0-9]+/, "");
    input.value = justNumbers;

    if (justNumbers) {
      input.value = justNumbers.replace(/(\d)(\d{2})$/, "$1:$2");
      if (justNumbers.length === 5) {
        input.value = `${justNumbers[0]}${justNumbers[1]}:${justNumbers[2]}${justNumbers[3]}`;
      }
    }
  };

  const verifyHour = (input) => {
    const value = input.value;

    const justNumbers = value.replace(/[^0-9]+/, "");

    const hours = +`${justNumbers[0]}${justNumbers[1]}`;
    const minutes = +`${justNumbers[2]}${justNumbers[3]}`;

    if (value[1] === ":") {
      input.value = 0 + value;
    }

    if (hours > 23 || hours < 0 || minutes < 0 || minutes > 59) {
      if (hours == 24 || (hours === 23 && minutes === 60)) {
        input.value = `00:00`;
      } else if (minutes == 60 && hours < 24) {
        input.value = `${hours + 1}:00`;
      } else {
        input.value = `08:00`;
      }
    }
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const handleOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const styleModal = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2929291a",
  };

  const styleBox = {
    backgroundColor: "#FBFBFB",
    position: "absolute",
    padding: "20px",
    borderRadius: "5px",
  };

  const buttonListStyle = {
    display: "flex",
    alignItems: "space-around",
    justifyContent: "center",
    paddingTop: "10px",
  };

  return (
    <li className="register">
      <p className="description">{description}</p>
      <span className="interval">
        {startInterval} - {endInterval}
      </span>
      <div className="hours">
        <TotalIcon style={{ marginRight: "10px" }} />
        <span className="register--totalHours">{totalHours}</span>
        <button onClick={openSpecific}>
          <ExpandMoreIcon />
        </button>
        <ul className="specificHours" ref={specific}>
          <li>
            <MorningIcon style={{ color: "#f7d82a", marginRight: "10px" }} />
            <span>{totalMorningHours}</span>
          </li>
          <li>
            <AfternoonIcon style={{ marginRight: "10px" }} />
            <span>{totalAfternoonHours}</span>
          </li>
        </ul>
      </div>

      <Modal
        open={openRemove}
        onClose={handleCloseRemove}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={styleModal}
      >
        <Box sx={styleBox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tem certeza que deseja remover esse registro?
          </Typography>
          <div style={buttonListStyle}>
            <Button
              style={{ backgroundColor: "#1bfa44", color: "#FBFBFB" }}
              onClick={deleteRegister}
            >
              Sim
            </Button>
            <Button
              style={{ backgroundColor: "#ff4542", color: "#FBFBFB" }}
              onClick={handleCloseRemove}
            >
              Não
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={styleModal}
      >
        <Box sx={styleBox} style={{ position: "relative" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar Registro
          </Typography>

          <div
            className="hoursRegistration"
            style={{ backgroundColor: "transparent", margin: "0px" }}
          >
            <input
              type="text"
              id="description"
              placeholder="O que foi feito?"
              ref={newDescription}
              maxLength="60"
              style={{ border: "3px solid #00C0D3" }}
              value={description}
            />
            <div className="inputs">
              <input
                type="text"
                id="startHour"
                placeholder="08:00"
                ref={newStartHour}
                style={{ border: "3px solid #00C0D3" }}
                value={startInterval}
                onKeyUp={(event) => {
                  verifyHourAllTheTime(event.target);
                }}
                onBlur={(event) => {
                  verifyHour(event.target);
                }}
              />

              <input
                type="text"
                id="endHour"
                placeholder="12:00"
                ref={newEndHour}
                value={endInterval}
                onKeyUp={(event) => {
                  verifyHourAllTheTime(event.target);
                }}
                onBlur={(event) => {
                  verifyHour(event.target);
                }}
                style={{ border: "3px solid #00C0D3" }}
              />
              <input
                type="date"
                id="date"
                value={date}
                ref={newDate}
                style={{ border: "3px solid #00C0D3" }}
              />
            </div>
          </div>
          <span
            className="error"
            ref={error}
            style={{ top: "auto", position: "sticky" }}
          ></span>

          <div style={buttonListStyle}>
            <Button
              style={{
                backgroundColor: "#1bfa44",
                color: "#FBFBFB",
                padding: "10px",
                margin: "10px",
              }}
              onClick={verifyDateTime}
            >
              Confirmar
            </Button>
            <Button
              style={{
                backgroundColor: "#ff4542",
                color: "#FBFBFB",
                padding: "10px",
                margin: "10px",
              }}
              onClick={handleCloseEdit}
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>

      <div className="buttonList">
        <button onClick={handleOpenEdit}>
          <EditIcon />
        </button>
        <button onClick={handleOpenRemove}>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};
