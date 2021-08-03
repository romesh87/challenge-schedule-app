import Moment from "react-moment";

import { IAppointment, IPatient, IDoctor } from "../../types";

import styles from "./AppointmentItem.module.css";

export interface Props {
  appointment: IAppointment;
  patient: IPatient;
  doctor: IDoctor;
  onCancel: (id: string) => void;
  onConfirm: (id: string) => void;
}

const AppointmentItem: React.FC<Props> = (props) => {
  const { 
    id, 
    requestReason, 
    requestedDate, 
    status, 
    statusReason 
  } = props.appointment;
  const { patient, doctor } = props;

  const renderActions = () => {
    if (status === "new") {
      return (
        <div>
          <span className={styles.subtitle}>Actions: </span>
          <button
            type="button"
            className={styles.btn}
            onClick={() => props.onConfirm(id)}
          >
            Confirm
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => props.onCancel(id)}
          >
            Cancel
          </button>
        </div>
      );
    } else if (status === "confirmed") {
      return (
        <div>
          <span className={styles.subtitle}>Actions: </span>
          <button
            type="button"
            className={styles.btn}
            onClick={() => props.onCancel(id)}
          >
            Cancel
          </button>
        </div>
      );
    }
  };

  return (
    <li className={styles.listItem}>
      <div
        className={
          status === "cancelled" || status === "completed"
            ? `${styles.container} ${styles.disabled}`
            : styles.container
        }
      >
        <div className={styles.section}>
          <div>
            <span className={styles.subtitle}>Patient: </span>{" "}
            {patient && patient.name}
          </div>

          {patient?.photoURL && (
            <img src={patient.photoURL} width={100} height={100} alt="" />
          )}
        </div>

        <div className={styles.section}>
          <div>
            <span className={styles.subtitle}>Date: </span>{" "}
            <Moment format="MMM D, YYYY">{requestedDate}</Moment>
          </div>
          <div>
            <span className={styles.subtitle}>Reason: </span>
            <div>{requestReason}</div>
          </div>
          {status === "cancelled" && (
            <div>
              <span className={styles.subtitle}>Reason for Cancellation: </span>
              <div>{statusReason}</div>
            </div>
          )}
          {renderActions()}
        </div>

        <div className={styles.section}>
          <div>
            <span className={styles.subtitle}>Doctor: </span>{" "}
            {doctor ? doctor.name : "Unassigned"}
          </div>
          {doctor?.photoURL && (
            <img src={doctor.photoURL} width={100} height={100} alt="" />
          )}
        </div>
      </div>
    </li>
  );
};

export default AppointmentItem;
