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