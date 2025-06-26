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
