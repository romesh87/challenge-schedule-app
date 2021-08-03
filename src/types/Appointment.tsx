export interface IAppointment {
  id: string;
  patientID: string;
  requestReason: string;
  requestedDate: string;
  status: string;
  doctorID?: string;
  statusReason?: string;
}