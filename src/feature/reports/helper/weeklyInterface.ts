interface PhotoFile {
  path: string;
  filename: string;
  companyName?: string;
}

interface Logo {
  path: string;
  filename: string;
  companyName: string;
}

interface DiaryEntry {
  id: number;
  userId: number;
  schedule_id: number;
  selectedDate: string;
  ownerProjectManager: string | null;
  reportNumber: string;
  contractNumber: string;
  contractor: string;
  ownerContact: string;
  description: string;
  siteInspector: string;
  timeIn: string;
  timeOut: string;
  IsChargable: number;
  created_by: string;
  created_at: string;
  updated_at: string | null;
  updated_by: string | null;
  totalHours: string;
  logo: Logo[];
  signature: string | null;
  pdfName: string | null;
  declerationFrom: null;
  username: string;
}

interface Equipment {
  id: number;
  hours: number;
  quantity: number;
  totalHours: number;
  equipment_name: string;
}

interface Visitor {
  id: number;
  hours: number;
  company: string;
  quantity: number;
  totalHours: number;
  visitorName: string;
}

interface Role {
  id: number;
  hours: number;
  quantity: number;
  roleName: string;
  totalHours: number;
}

interface Labour {
  id: number;
  roles: Role[];
  contractorName: string;
}

interface Entry {
  id: number;
  userId: number;
  schedule_id: number;
  owner_project_manager: string;
  owner_contact: string;
  selected_date: string;
  location: string;
  on_shore: string;
  temp_high: string;
  temp_low: string;
  weather: string;
  working_day: string;
  report_number: string;
  contract_number: string;
  contractor: string;
  site_inspector: string;
  time_in: string;
  time_out: string;
  component: string;
  description: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  photoFiles: PhotoFile[];
  totalHours: string;
  logo: Logo[];
  signature: string | null;
  pdfName: string | null;
  declerationFrom: null;
  equipments: Equipment[];
  visitors: Visitor[];
  labours: Labour[];
  project_name: string;
  project_number: string;
  owner: string;
  username: string;
}

interface UserDailyData {
  diary: DiaryEntry[];
  entry: Entry[];
  username: string;
}

interface WeeklyAllList {
  [date: string]: {
    [userKey: string]: UserDailyData;
  };
}

export interface WeeklyReport {
  id: number;
  userId: number;
  schedule_id: number;
  weekStartDate: string;
  weekEndDate: string;
  contractNumber: string;
  projectManager: null;
  consultantProjectManager: string;
  contractProjectManager: string;
  contractorSiteSupervisorOnshore: string;
  contractorSiteSupervisorOffshore: string;
  siteInspector: string[];
  cityProjectManager: string;
  inspectorTimeIn: string;
  inspectorTimeOut: string;
  contractAdministrator: string;
  supportCA: string;
  component: null;
  updated_by: null;
  created_at: string;
  updated_at: string;
  created_by: string;
  photoFiles: PhotoFile[];
  weeklyAllList: WeeklyAllList;
  reportDate: string;
  signature: string;
  logo: Logo[];
  pdfName: string;
  declerationFrom: null;
  username: string;
  email: string;
}

// The main data structure is an array of WeeklyReport objects
type WeeklyReports = WeeklyReport[];