export interface AuthResponse {
  token: string;
  userId: string;
  userName: string;
  isBoss: boolean;
  message?: string;
}

export interface CompanyLogoResponse {
  _id: string;
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

export interface SchedulesResponse {
  _id: string;
  projectId: ProjectInfo;
  projectName: string;
  projectNumber: string;
  folder_name: string;
  pdfUrl: string;
  owner: string;
  month: string;
  createdAt: string;
  __v: number;
}

