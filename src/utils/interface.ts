import { DailyDiary, DailyEntry } from "../api/apiInterface";






export interface PhotoFile {
  id: number;
  schedule_id: number;
  userId: number;
  file_url: string;
  folder_name: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EquipmentDetail {
  id: number;
  equipment_name: string;
  quantity: number;
  hours: number;
  total_hours: number;
}

export interface VisitorDetail {
  id: number;
  visitor_name: string;
  company: string;
  quantity: number;
  hours: number;
  total_hours: number;
}

export interface LabourDetail {
  id: number;
  contractor_name: string;
  roleDetail: RoleDetail[];
}

export interface RoleDetail {
  id: number;
  role_name: string;
  hours: number;
  quantity: number;
  total_hours: number;
}

export interface UserEntries {
  diary: DailyDiary[];
  entry: DailyEntry[];
  username :string
}

export interface DateWiseData {
  [userId: string]: UserEntries;
}

export interface WeeklyDataStructure {
  [date: string]: DateWiseData;
}




interface Description {
  date: string;
  descriptions: string[];
  reportNumber?: string;
  ownerProjectManager: string;
}

interface Equipment {
  equipment_name: string;
  total_hours: number;
  total_days: number;
  quantity: number;
  hours: number;
}

interface Visitor {
  name: string;
  company: string;
  total_hours: number;
  visits: number;
  total_days: number;
   quantity: number;
  hours: number;

}

interface Labour {
  contractor: string;
  role: string;
  total_hours: number;
  workers: number;
  total_days: number;
   quantity: number;
  hours: number;

}

export interface ProcessDataForPdf {
  descriptions: Description[];
  equipments: Equipment[];
  visitors: Visitor[];
  labours: Labour[];
}