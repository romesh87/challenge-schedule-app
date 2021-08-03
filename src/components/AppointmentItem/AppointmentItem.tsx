import { FunctionComponent } from 'react';
import Moment from 'react-moment';

import styles from './AppointmentItem.module.css';

export interface Props {
  appointment: {
    id: string;
    requestReason: string;
    requestedDate: string;
    status: string;
    statusReason?: string;
    patientID?: string;
    doctorID?: string;
  },
  patient: any,
  doctor: any
  onCancel: (id: string) => void
}
 
const AppointmentItem: FunctionComponent<Props> = (props: Props) => {
  const { id, requestReason, requestedDate, status, statusReason } = props.appointment;
  const { patient, doctor } = props;
  
  return ( 
    <div>
      <div className={status === 'cancelled' ? `${styles.container} ${styles.disabled}` : styles.container}>
        <div className={styles.section}>
          <div>
            <span className={styles.subtitle}>Patient: </span> {patient && patient.name}
          </div>
         
          {patient?.photoURL && <img src={patient.photoURL} width={100} height={100} alt="" />}
        </div>

        <div className={styles.section}>
          <div>
            <span className={styles.subtitle}>Date: </span> <Moment format='MMM D, YYYY'>{requestedDate}</Moment>
          </div>
          <div>
            <span className={styles.subtitle}>Reason: </span> 
            <div>
              {requestReason}
            </div>
          </div>
          {status === 'cancelled' ?
            <div>
              <span className={styles.subtitle}>Reason for Cancellation: </span>
              <div>
                {statusReason}
              </div>
            </div>
            : 
            <div>
              <span className={styles.subtitle}>Actions: </span>
              <button type="button" className={styles.btn} onClick={() => props.onCancel(id)}>Cancel</button>
            </div>
          }
         </div>

        <div className={styles.section}>
          <div>
            <span className={styles.subtitle}>Doctor: </span> {doctor ? doctor.name : 'Unassigned'}
          </div>
          {doctor?.photoURL && <img src={doctor.photoURL} width={100} height={100} alt="" />}
        </div>
      </div>
    </div>
  );
}
 
export default AppointmentItem;