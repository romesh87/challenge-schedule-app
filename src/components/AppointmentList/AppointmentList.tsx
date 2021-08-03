import { FunctionComponent, useState, useEffect } from "react";

import { API_ROOT } from "../../constants";

import AppointmentItem from "../AppointmentItem";
import Modal from "../UI/Modal";

import styles from "./AppointmentList.module.css";

interface Props {}

const AppointmentList: FunctionComponent<Props> = (props: Props) => {
  const [loading, setLoading] = useState(true);

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`${API_ROOT}/appointments`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setAppointments(data.appointments);

        return fetch(`${API_ROOT}/patients`);
      })
      .then((response) => response.json())
      .then((data) => {
        setPatients(data.patients);

        return fetch(`${API_ROOT}/doctors`);
      })
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data.doctors);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onCancelHandler = (id: string) => {
    console.log({ id });

    fetch(`${API_ROOT}/appointments/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ reason: "Cancelled" }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchData();
      })
      .catch((error) => console.log(error));
  };

  const onConfirmHandler = (id: string) => {
    setShowModal(true);
    setSelectedAppointmentId(id);
  };

  const onModalCloseHandler = () => {
    setShowModal(false);
    setSelectedDoctorId("");
    setSelectedAppointmentId("");
  };

  const onModalConfirmHandler = () => {
    if (selectedDoctorId && setSelectedAppointmentId) {
      fetch(`${API_ROOT}/appointments/${selectedAppointmentId}/confirm`, {
        method: "POST",
        body: JSON.stringify({ doctorID: selectedDoctorId }),
      })
        .then((response) => response.json())
        .then((data) => {
          fetchData();
          onModalCloseHandler();
        })
        .catch((error) => {
          console.log(error);
          onModalCloseHandler();
        });
    }
  };

  if (loading) {
    return <h4 style={{ margin: "auto" }}>Loading...</h4>;
  }

  const newAppointments = appointments
    .filter((appointment: any) => appointment.status === "new")
    .map((appointment: any) => (
      <AppointmentItem
        key={appointment.id}
        appointment={appointment}
        patient={
          patients &&
          patients.filter(
            (patient: any) => patient.id === appointment.patientID
          )[0]
        }
        doctor={
          doctors &&
          doctors.filter((doctor: any) => doctor.id === appointment.doctorID)[0]
        }
        onCancel={onCancelHandler}
        onConfirm={onConfirmHandler}
      />
    ));

  const confirmedAppointments = appointments
    .filter((appointment: any) => appointment.status === "confirmed")
    .map((appointment: any) => (
      <AppointmentItem
        key={appointment.id}
        appointment={appointment}
        patient={
          patients &&
          patients.filter(
            (patient: any) => patient.id === appointment.patientID
          )[0]
        }
        doctor={
          doctors &&
          doctors.filter((doctor: any) => doctor.id === appointment.doctorID)[0]
        }
        onCancel={onCancelHandler}
        onConfirm={onConfirmHandler}
      />
    ));

  const completedAppointments = appointments
    .filter((appointment: any) => appointment.status === "completed")
    .map((appointment: any) => (
      <AppointmentItem
        key={appointment.id}
        appointment={appointment}
        patient={
          patients &&
          patients.filter(
            (patient: any) => patient.id === appointment.patientID
          )[0]
        }
        doctor={
          doctors &&
          doctors.filter((doctor: any) => doctor.id === appointment.doctorID)[0]
        }
        onCancel={onCancelHandler}
        onConfirm={onConfirmHandler}
      />
    ));

  const canceledAppointments = appointments
    .filter((appointment: any) => appointment.status === "cancelled")
    .map((appointment: any) => (
      <AppointmentItem
        key={appointment.id}
        appointment={appointment}
        patient={
          patients &&
          patients.filter(
            (patient: any) => patient.id === appointment.patientID
          )[0]
        }
        doctor={
          doctors &&
          doctors.filter((doctor: any) => doctor.id === appointment.doctorID)[0]
        }
        onCancel={onCancelHandler}
        onConfirm={onConfirmHandler}
      />
    ));

  return (
    <>
      <div className={styles.container}>
        <h1>Appointments</h1>

        <h2 className={styles.status}>New</h2>
        <ul>{newAppointments}</ul>
      </div>

      <div className={styles.container}>
        <h2 className={styles.status}>Confirmed</h2>
        <ul>{confirmedAppointments}</ul>
      </div>

      <div className={styles.container}>
        <h2 className={styles.status}>Completed</h2>
        <ul>{completedAppointments}</ul>
      </div>

      <div className={styles.container}>
        <h2 className={styles.status}>Cancelled</h2>
        <ul>{canceledAppointments}</ul>
      </div>

      <Modal show={showModal}>
        <div className={styles.modalContainer}>
          <h2 className={styles.modalTitle}>Confirm appointment</h2>
          {/* <div className={styles.modalSelectContainer}> */}
          <select
            className={styles.modalSelect}
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
          >
            <option value="">Please select a doctor...</option>
            {doctors.map((doctor: any) => (
              <option value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
          {/* </div> */}
          <div className={styles.modalBtnContainer}>
            <button
              type="button"
              className={styles.modalBtnConfirm}
              onClick={onModalConfirmHandler}
            >
              Confirm
            </button>
            <button
              type="button"
              className={styles.modalBtnCancel}
              onClick={onModalCloseHandler}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AppointmentList;
