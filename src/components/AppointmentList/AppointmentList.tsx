import { useEffect } from 'react';
import { FunctionComponent, useState } from 'react';

import { API_ROOT } from '../../constants';

import AppointmentItem from '../AppointmentItem';
import styles from './AppointmentList.module.css';

interface Props {
  
}
 
const AppointmentList: FunctionComponent<Props> = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = () => {
    fetch(`${API_ROOT}/appointments`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);

        // const sortedAppointments = (data.appointments.sort((a: any, b: any) => {
        //   const statusA = a.status;
        //   const statusB = b.status;

        //   if (statusA < statusB) {
        //     return 1
        //   } else {
        //     return -1
        //   }
        // }));
       
        setAppointments(data.appointments);

        return fetch(`${API_ROOT}/patients`)
      })
      .then(response => response.json())
      .then(data => {
        setPatients(data.patients);

        return fetch(`${API_ROOT}/doctors`)
      })
      .then(response => response.json())
      .then(data => {
        setDoctors(data.doctors)
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      })
    }
  
  const onCancelHandler = (id: string) => {
    console.log({id})
    
    fetch(`${API_ROOT}/appointments/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ reason: 'Cancelled' }),
    })
    .then(response => response.json())
    .then(data => {
      fetchData();
    })
    .catch(error => console.log(error))

  }
    
  if (loading) {
    return <h4 style={{ margin: 'auto' }}>Loading...</h4>
  }

  const newAppointments = appointments.filter((appointment: any) => appointment.status === 'new')
    .map((appointment: any) => (
      <AppointmentItem
        key={appointment.id} 
        appointment={appointment} 
        patient={patients && patients.filter((patient: any) => patient.id === appointment.patientID)[0]}
        doctor={doctors && doctors.filter((doctor: any) => doctor.id === appointment.doctorID)[0]}
        onCancel={onCancelHandler}
      />
    ))
  
  const confirmedAppointments = appointments.filter((appointment: any) => appointment.status === 'confirmed')
    .map((appointment: any) => (
      <AppointmentItem
        key={appointment.id} 
        appointment={appointment} 
        patient={patients && patients.filter((patient: any) => patient.id === appointment.patientID)[0]}
        doctor={doctors && doctors.filter((doctor: any) => doctor.id === appointment.doctorID)[0]}
        onCancel={onCancelHandler}
      />
  ))
  
  const completedAppointments = appointments.filter((appointment: any) => appointment.status === 'completed')
    .map((appointment: any) => (
      <AppointmentItem
        key={appointment.id} 
        appointment={appointment} 
        patient={patients && patients.filter((patient: any) => patient.id === appointment.patientID)[0]}
        doctor={doctors && doctors.filter((doctor: any) => doctor.id === appointment.doctorID)[0]}
        onCancel={onCancelHandler}
      />
  ))
  
  const canceledAppointments = appointments.filter((appointment: any) => appointment.status === 'cancelled')
    .map((appointment: any) => (
      <AppointmentItem
        key={appointment.id} 
        appointment={appointment} 
        patient={patients && patients.filter((patient: any) => patient.id === appointment.patientID)[0]}
        doctor={doctors && doctors.filter((doctor: any) => doctor.id === appointment.doctorID)[0]}
        onCancel={onCancelHandler}
      />
  )) 

  return ( 
    <>
      <div className={styles.container}>
        <h1>Appointments</h1>
        
        <h2 className={styles.status}>New</h2>
        <ul>
          {newAppointments}
        </ul>
      </div>

      <div className={styles.container}>
        <h2 className={styles.status}>Confirmed</h2>
        <ul>
          {confirmedAppointments}
        </ul>
      </div>
      
      <div className={styles.container}>
        <h2 className={styles.status}>Completed</h2>
        <ul>
          {completedAppointments}
        </ul>
      </div>
      
      <div className={styles.container}>
        <h2 className={styles.status}>Cancelled</h2>
        <ul>
          {canceledAppointments}
        </ul>
      </div>
    </>
  );
}
 
export default AppointmentList;