import { createSlice } from '@reduxjs/toolkit';
import { Equipment } from '../../feature/reports/components/EquipmentDetails';
import { Visitor } from '../../feature/reports/components/VisitorDetails';
import { CompanyLogoResponse, SchedulesResponse } from '../../api/apiInterface';
import { ImageItem } from '../../feature/photoFiles/PhotoFilesScreen';
import { WeeklyDataStructure } from '../../utils/interface';

export interface DailyDairyReports {
  ContractNumber: string;
  Contractor: string;
  Description: string;
  IsChargable: boolean;
  Owner: string;
  OwnerContact: string;
  OwnerProjectManager: string;
  ProjectName: string;
  ProjectNumber: string;
  ReportNumber: string;
  selectedDate: string; // Format: "YYYY-MM-DD"
  signature: string;    // Base64 or URI string
  schedule : SchedulesResponse,
  selectedLogo?: CompanyLogoResponse[],
  siteInspector: string[] | string,
  timeIn: string,
  timeOut: string,
}





interface DeclarationItem {
  key: string;
  type: any;
  value: string | boolean;
}

export interface DeclarationGroup {
  title: string;
  list: DeclarationItem[];
}

export interface DeclerationFrom {
  declrationForm: DeclarationGroup[];
}
export interface Labour {
  contractorName: string;
  roles: Role[];
}
interface Role {
  roleName: string;
  quantity: string;
  hours: string;
  totalHours: string;
}


export interface DailyEntry {
  ContractNumber: string;
  Contractor: string;
  DeclerationFrom: DeclerationFrom;
  Description: string;
  Equipments: Equipment[];
  HighTemp: string;
  Labour: Labour[]; // Replace `any` with a proper Labour interface if structure is known
  Location: string;
  LowTemp: string;
  Owner: string;
  OwnerContact: string;
  OwnerProjectManager: string;
  ProjectName: string;
  ProjectNumber: string;
  ReportNumber: string;
  SelectedTempType: string;
  Visitors: Visitor[];
  Weather: string;
  WorkingDay: string;
  onShore: string;
  selectedDate: string;
  signature: string;
  timeIn: string;
  timeOut: string;
  component:string;
  siteInspector:string,
  schedule?: SchedulesResponse,
  Images?: ImageItem[],
  selectedLogo?: CompanyLogoResponse[]
}

export interface WeeklyEntry {
  reportDate: string; // e.g., "2025-08-05"
  projectName: string;
  owner: string;
  consultantProjectManager: string;
  projectNumber: string;
  contractNumber: string;
  cityProjectManager: string;
  contractProjectManager: string;
  contractorSiteSupervisorOnshore: string;
  contractorSiteSupervisorOffshore: string;
  contractAdministrator: string;
  supportCA: string;
  siteInspector: string[]; // array of inspector names
  inspectorTimeIn: string; // e.g., "03:36 AM"
  inspectorTimeOut: string; // e.g., "10:36 AM"
  schedule?: SchedulesResponse,
  selectedLogo?: CompanyLogoResponse[] | undefined,
  WeeklyAllList: WeeklyDataStructure,
  Images?: ImageItem[],
  startDate: string;
  endDate: string;
  signature: string;
}

export interface IWorkFromEntry {
  id: number;
  userId: number;
  schedule_id: number;
  selectedDate: string; // ISO date string
  ownerProjectManager: string;
  reportNumber: string;
  contractNumber: string;
  contractor: string;
  ownerContact: string;
  description: string;
  siteInspector: string;
  timeIn: string; // formatted time string (e.g., "03:00 AM")
  timeOut: string; // formatted time string (e.g., "06:00 AM")
  IsChargable: number; // 0 or 1
  created_by: string;
  created_at: string; // timestamp string
  updated_at: string; // timestamp string (can be empty)
  updated_by: string | null;
  totalHours: string;
  username: string;
  projectNumber: string;
  projectName: string;
}


export interface InvoiceDetails {
  consultantProjectManager: string;
  description: string;
  endDate: string; // ISO format e.g. "2025-08-06"
  owner: string;
  projectName: string;
  projectNumber: string;
  schedule: SchedulesResponse;
  startDate: string; // ISO format
  siteInspectors?: any;
  workFromEntry: IWorkFromEntry[];

    terms:string,
      invoiceNo:string,
      SelectedDate:string,
      DueDate: string
}


interface UserState {
  DailyDairyReports : DailyDairyReports | undefined ;
  DailyReports: DailyEntry | undefined;
  WeeklyReports:WeeklyEntry | undefined;
  Invoice:InvoiceDetails | undefined;
}

const initialState: UserState = {
    DailyDairyReports : undefined,
    DailyReports : undefined,
    WeeklyReports : undefined,
    Invoice: undefined
};

export const ReportSlice = createSlice({
  name: "Reports",
  initialState,
  reducers: {
    updateDailyDairyReports: (state, action) => {
      state.DailyDairyReports = action.payload;
    },
    updateDailyReports : (state, action) => {
      state.DailyReports = action.payload;
    },
     updateDailyImages: (state, action) => {
      state.DailyReports = {
        ...state.DailyReports,
        Images: action.payload,
      };
    },
    updateWeeklyReports: (state, action) => {
      state.WeeklyReports = action.payload;
    },
      updateWeeklyImages: (state, action) => {
      state.WeeklyReports = {
        ...state.WeeklyReports,
        Images: action.payload,
      };
    },
    updateInvoiceDetails: (state, action) => {
      state.Invoice = action.payload;
    },
     rehydrate: (state, action) => {
      return { ...state, ...action.payload };
    },
   
  },
});

export const { updateInvoiceDetails,updateWeeklyImages,updateDailyDairyReports,rehydrate,updateDailyReports ,updateDailyImages,updateWeeklyReports} = ReportSlice.actions;

export default ReportSlice.reducer;