export interface AuthResponse {
  token: string;
  userId: string;
  userName: string;
  isBoss: boolean;
  message?: string;
}

export interface CompanyLogoResponse {
  id: string;
  companyName: string;
  folder_name: string;
  logoUrl: string;
  __v: number;
  file_url: string;
}

interface ProjectInfo {
  _id: string;
  projectName: string;
  projectNumber: string;
  owner: string;
  startDate: string;
  endDate: string | null;
}

export interface UploadAttachmentResponse {
  type: string;
  fileName: string;
  fileUrl: string;
}

export interface SchedulesResponse {
  id: number;
  project_name: string;
  project_number: string;
  owner: string;
  pdfUrl: string;
  description: string;
  rate: number;
  invoice_to: string;
  folder_name: string;
  created_at: string;         // ISO 8601 date string
  updated_at: string | null; // can be null
  created_by: string;
  updated_by: string | null; // can be null
  invoiceDescription?:string
}


export interface AttachmentResponse{
  fileName: string;
  fileUrl: string;
  type: string; // You can replace this with a union of possible types if there are more
}

export interface GetPhotoFileResponse {
  id: number;
  created_at: string; // ISO 8601 format date string
  updated_at: string | null; // ISO 8601 format date string or null
  created_by: string; // Assuming this is a user ID stored as string
  userId: number; // Numeric user ID (note: inconsistent type with created_by)
  description: string;
  file_url: string;
  folder_name: string;
  schedule_id: number;
}

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface LocationDetails {
    coordinates: Coordinates;
    formattedAddress: string;
}

interface Weather {
    condition: string;
    feels_like: number;
    humidity: number;
    icon: string;
    location: string;
    temperature: number;
    wind_speed: number;
}

export interface BannerInfo {
  created_at: string;
  folder_name: string;
  image_path: string;
  is_active: number; // 0 or 1 for boolean
  name: string;
  updated_at: string;
}
export interface GetWeatherResponse {
    location: LocationDetails;
    weather: Weather;
    bannerInfo: BannerInfo[]
}

export interface UserLocation {
  city: string;
  description: string;
  temp: number;
  icon: string;
  humidity: number;
  windSpeed: number;
  bannerInfo: BannerInfo[]
}


interface Activity {
    activityName: string;
    activities: string[]; // Assuming activities is an array of strings
}

interface Task {
    task: string;
    severity: string; // Could be more specific like 'L' | 'M' | 'H' if severity levels are known
    hazard: string;
    controlPlan: string;
}

export interface JobHazardRequest {
    WorkerName: string;
    description: string;
    location: string;
    projectName: string;
    selectedActivities: Activity[];
    selectedDate: string; // Could use Date type if you'll parse it
    signature: string; // Base64 encoded image
    siteOrientationChecked: boolean;
    tasks: Task[];
    time: string; // Could be more specific if time format is consistent
    toolBoxMeetingChecked: boolean;
    OtherTextHazards?:{activityName: string, value: string}[]
}

interface MatchedSubstring {
  // Assuming the structure is similar to Google Places API
  length: number;
  offset: number;
}

interface Term {
  // Assuming each term has a value and offset
  value: string;
  offset: number;
}

interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
}

export interface SuggestionResponse {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
}


export interface MileageData {
  startLocation: string,
        endLocation: string,
        distance: number,
        duration: string,
        amount: number,
        coords: any,
        isAddress: {
            isHome: boolean,
            isSite: boolean
        },
        date:Date
}

export  interface MileageResponse {
  id: number;
  user_id: number;
  created_by: number;
  amount: number;
  totalDistance: number;
  duration: string;
  startLocation: string;
  endLocation: string;
  date: string; // ISO 8601 format
  created_at: string; // ISO timestamp
  updated_at: string | null;
  coordinates: Array<{
    latitude: number;
    longitude: number;
  }>;
}


interface ExpenseImage {
  path: string;
}

export interface ExpenseItemResponse {
  title: string;
  amount: number | string;
  category: string;
  images: ExpenseImage[];
  status: 'Pending' | 'Approved' | 'Rejected'; // Assuming these are the possible statuses
}

export let initalExpenseItem: ExpenseItemResponse = {
  title: '',
  amount: '',
  category: '',
  images: [],
  status: 'Pending',
}

export interface ExpenseReportRequest {
  employeeName: string | undefined;
  startDate: string |undefined ; // ISO date string
  endDate: string | undefined;   // ISO date string
  expenditure: string | undefined;
  schedule_id: number | undefined;
  category: string | undefined;
  task: string | undefined;
  expenseType: ExpenseItemResponse[] | undefined;
  receipt: string | undefined;
  mileageAmount: number | undefined;
  expenseAmount: number | undefined;
  mileageStatus: string | undefined;
  expenseStatus: string | undefined;
  mileageIds: number[];
  SelectedSchedule: SchedulesResponse


}


interface ImageItem {
  id: number;
  path: string;
  folder_name: string;
  created_by: string;
  created_at: string;
  file_url: string;
}

interface ExpenseTypeItem {
  id: number;
  title: string;
  amount: number;
  category: string;
  status: string;
  created_by: string;
  images: ImageItem[];
}

export interface ExpenseReportResponse {
  id: number;
  userId: number;
  employeeName: string;
  startDate: string;        // ISO 8601 date string
  endDate: string;          // ISO 8601 date string
  expenditure: string;
  schedule_id: number;
  category: string;
  task: string;
  totalAmount: number | null;
  receipt: string;
  folder_name: string;
  mileageAmount: number;
  expenseAmount: number;
  mileageStatus: string;
  expenseStatus: string;
  createdAt: string | null; // ISO 8601 date string
  updatedAt: string | null; // ISO 8601 date string
  created_by: string;
  updated_by: string | null;
  created_at: string;       // Non-ISO format (e.g. "YYYY-MM-DD HH:mm:ss")
  updated_at: string;
  username: string;
  email: string;
  expenseType: ExpenseTypeItem[];
}



export const initialExpenseReport: ExpenseReportResponse =  {
            "id": 1,
            "userId": 6,
            "employeeName": "Mohit",
            "startDate": "2025-07-10T04:21:14.000Z",
            "endDate": "2025-07-21T04:21:14.000Z",
            "expenditure": "Client Meeting Travel & Meals",
            "schedule_id": 1,
            "category": "Business Travel",
            "task": "Onsite visit to client office",
            "totalAmount": null,
            "receipt": "https://d1d9a9emgjh7u0.cloudfront.net/receipts/wsb_1745160240135.jpg",
            "folder_name": "receipts",
            "mileageAmount": 300,
            "expenseAmount": 1650,
            "mileageStatus": "Pending",
            "expenseStatus": "Pending",
            "createdAt": "2025-07-19T16:53:37.000Z",
            "updatedAt": null,
            "created_by": "6",
            "updated_by": null,
            "created_at": "2025-07-11 11:43:15",
            "updated_at": "2025-07-18 00:45:38",
            "username": "nikita",
            "email": "nikita@kps.ca",
            "expenseType": [
                {
                    "id": 1,
                    "title": "Cab to airport",
                    "amount": 450,
                    "category": "Transport",
                    "status": "Approved",
                    "created_by": "6",
                    "images": [
                        {
                            "id": 1,
                            "path": "wsb_1745160240135.jpg",
                            "folder_name": "sample",
                            "created_by": "6",
                            "created_at": "2025-07-19 16:53:37",
                            "file_url": "https://d1d9a9emgjh7u0.cloudfront.net/sample/wsb_1745160240135.jpg"
                        }
                    ]
                }
            ]
        }



        export interface Coordinate {
  latitude: string;
  longitude: string;
}

export interface Mileage {
  id: number;
  user_id: number;
  date: string;
  startLocation: string;
  endLocation: string;
  duration: string;
  totalDistance: number;
  append_to_expense: number;
  amount: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
  status: string;
  coordinates: Coordinate[];
  username: string;
}

export interface ExpenseImageResponse {
  id: number;
  path: string;
  folder_name: string;
  created_by: string;
  created_at: string;
  file_url: string;
}

export interface ExpenseType {
  id: number;
  title: string;
  amount: number;
  category: string;
  status: string;
  created_by: string;
  images: ExpenseImageResponse[];
}

export interface ExpenseListResponse {
  id: number;
  userId: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  expenditure: string;
  schedule_id: number;
  category: string;
  task: string;
  totalAmount: number | null;
  receipt: string;
  folder_name: string;
  mileageIds: string[];
  mileageAmount: number;
  expenseAmount: number;
  expenseStatus: string;
  createdAt: string;
  updatedAt: string;
  created_by: string;
  updated_by: string;
  mileageStatus: string;
  created_at: string;
  updated_at: string;
  username: string;
  email: string;
  expenseType: ExpenseType[];
  mileage: Mileage[];
  project_number: string;
}



export interface NotificationRespionse {
  id: number;
  subject: string;
  message: string;
  created_at: string; // use `Date` if you're converting it into a Date object elsewhere
  is_read: number;
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




interface PhotoFile {
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

interface EquipmentDetail {
  id: number;
  equipment_name: string;
  quantity: number;
  hours: number;
  total_hours: number;
}

interface VisitorDetail {
  id: number;
  visitor_name: string;
  company: string;
  quantity: number;
  hours: number;
  total_hours: number;
}

interface RoleDetail {
  id: number;
  role_name: string;
  hours: number;
  quantity: number;
  total_hours: number;
}

interface LabourDetail {
  id: number;
  contractor_name: string;
  roleDetail: RoleDetail[];
}


// ---------- Daily Diary ----------
export interface DailyDiary {
  id: number;
  userId: number;
  schedule_id: number;
  selectedDate: string; // "2025-08-18"
  ownerProjectManager: string;
  reportNumber: string;
  contractNumber: string;
  contractor: string;
  ownerContact: string;
  description: string;
  siteInspector: string;
  timeIn: string;  // "02:14 PM"
  timeOut: string; // "03:14 PM"
  IsChargable: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
  totalHours: string;
  logo: LogoItem[];
  signature: string | null;
  pdfName: string | null;
  declerationFrom: string | null;
  username: string;
}

// ---------- Daily Entry ----------
export interface DailyEntry {
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
  photoFiles: FileItem[];
  totalHours: string;
  logo: LogoItem[];
  signature: string | null;
  pdfName: string | null;
  declerationFrom: string | null;
  equipments: Equipment[];
  visitors: Visitor[];
  labours: Labour2[];
  project_name: string;
  project_number: string;
  owner: string;
  username: string;
}

// ---------- Shared ----------
export interface FileItem {
  path: string;
  filename: string;
}

export interface LogoItem {
  path: string;
  filename: string;
  companyName: string;
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

export interface Labour2 {
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

export interface WeeklyReportResponse {
  dailyDiary: DailyDiary[];
  dailyEntry: DailyEntry[];
}










