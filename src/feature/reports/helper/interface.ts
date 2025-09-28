export interface DailyDiaryReport {
  id: number;
  IsChargable: number; // 1 = true, 0 = false (can make boolean if API supports)
  contractNumber: string;
  contractor: string;
  created_at: string; // "YYYY-MM-DD HH:mm:ss"
  created_by: string;
  description: string;
  logo: string[]; // e.g. ['24', '27']
  ownerContact: string;
  ownerProjectManager: string;
  pdfName: string;
  reportNumber: string;
  schedule_id: number;
  selectedDate: string; // ISO date string
  signature: string; // base64 image string
  siteInspector: string;
  timeIn: string; // formatted time
  timeOut: string; // formatted time
  totalHours: string; // could also be number if parsed
  updated_at: string;
  updated_by: string | null;
  userId: number;
  username: string;
}

export interface DailyReport {
  id: number;
  userId: number;
  schedule_id: number;
  owner_project_manager: string;
  owner_contact: string;
  selected_date: string; // e.g. "2025-08-18"
  location: string;
  on_shore: string;
  temp_high: string; // "4°C"
  temp_low: string;  // "-2°C"
  weather: string;
  working_day: string;
  report_number: string;
  contract_number: string;
  contractor: string;
  site_inspector: string;
  time_in: string;  // "03:16 PM"
  time_out: string; // "04:16 PM"
  component: string;
  description: string;
  created_at: string; // "2025-08-21 15:18:28"
  updated_at: string;
  created_by: string; // looks numeric, but it's a string in your data
  photoFiles: FileItem[];
  totalHours: string;
  logo: FileItem[];
  signature: string | null;
  pdfName: string | null;
  equipments: Equipment[];
  visitors: Visitor[];
  labours: Labour[];
  project_name: string;
  project_number: string;
  owner: string;
  username: string;
}

export interface FileItem {
  path: string;
  filename: string;
  companyName: string;
  comment: string;

}

export interface Equipment {
  id: number;
  hours: number;
  quantity: number;
  totalHours: number;
  equipment_name: string;
}

export interface Visitor {
  id: number;
  hours: number;
  company: string;
  quantity: number;
  totalHours: number;
  visitorName: string;
}

export interface Labour {
  id: number;
  contractorName: string;
  roles: LabourRole[];
}

export interface LabourRole {
  id: number;
  hours: number;
  quantity: number;
  roleName: string;
  totalHours: number;
}




