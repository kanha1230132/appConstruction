import apiClient from "./apiClient";
import {
  AuthResponse,
  CompanyLogoResponse,
  SchedulesResponse,
} from "./apiInterface";
import { endPoints } from "./endPoints";

class RestClient {
  async signup(param: any) {
    try {
      console.log("param : ", param);
      const response = await apiClient.post(endPoints.URL_REGISTER, param);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { ...output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      return null;
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<AuthResponse | string | null> {
    try {
      const response = await apiClient.post(endPoints.URL_LOGIN, {
        email,
        password,
      });
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { ...output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      return null;
    }
  }

  async sendPasswordOtp(
    email: string
  ): Promise<string | null | { message: string }> {
    try {
      const response = await apiClient.post(endPoints.URL_FORGET_PASSWORD, {
        email,
      });
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        console.log("output : ", output);
        if (output.status == "success") {
          return { message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      return null;
    }
  }

  async resetPassword(
    param: any
  ): Promise<string | null | { message: string }> {
    try {
      const response = await apiClient.post(
        endPoints.URL_RESET_PASSWORD,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { message: output?.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      return null;
    }
  }
  async changePassword(
    param: any
  ): Promise<string | null | { message: string }> {
    try {
      const response = await apiClient.post(
        endPoints.URL_CHANGE_PASSWORD,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { message: output?.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      return null;
    }
  }

  async verifyOtp(param: any): Promise<string | null | { message: string }> {
    try {
      const response = await apiClient.post(
        endPoints.URL_FORGOT_VERIFY_CODE,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { message: output?.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      return null;
    }
  }

  async getLogo(): Promise<CompanyLogoResponse[] | string | null> {
    try {
      const response = await apiClient.post(endPoints.URL_LOGOS);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return output.data;
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async addLogo(param: any): Promise<{ message: string } | string | null> {
    try {
      const response = await apiClient.post(endPoints.URL_ADD_LOGO, param);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async deleteLogo(id: number): Promise<{ message: string } | string | null> {
    try {
      const response = await apiClient.post(endPoints.URL_DELETE_LOGO, { id });
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getSchedules(): Promise<SchedulesResponse[] | string | null> {
    try {
      const response = await apiClient.post(endPoints.URL_GET_ALL_PROJECTS);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return output.data;
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async createSchedule(
    body: any
  ): Promise<{ message: string } | string | null> {
    try {
      const response = await apiClient.post(endPoints.URL_ADD_SCHEDULE, body);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async updateSchedule(
    body: any
  ): Promise<{ message: string } | string | null> {
    try {
      const response = await apiClient.post(
        endPoints.URL_UPDATE_SCHEDULE,
        body
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async deleteSchedule(
    body: any
  ): Promise<{ message: string } | string | null> {
    try {
      const response = await apiClient.post(
        endPoints.URL_DELETE_SCHEDULE,
        body
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async addUser(body: any): Promise<{ message: string } | string | null> {
    try {
      const response = await apiClient.post(
        endPoints.URL_ADD_COMPANY_EMAIL,
        body
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getAddress(url: string): Promise<{ message: string } | string | null> {
    try {
      const response = await apiClient.get(url);
      console.log("response getAddress : ", response);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async uploadAttachments(
    body: any
  ): Promise<{ message: string; data: any } | string | null> {
    try {
      const response = await apiClient.post(
        endPoints.URL_UPLOAD_ATTACHMENTS,
        body
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async updateBossPermission(permission: boolean) {
    try {
      const response = await apiClient.post(
        endPoints.URL_UPDATE_BOSS_PERMISSION,
        { is_boss: permission }
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      return null;
    }
  }

  async uploadPhotoFiles(
    body: any
  ): Promise<{ message: string; data: any } | string | null> {
    try {
      const response = await apiClient.post(
        endPoints.URL_CREATE_PHOTO_FILES,
        body
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getCurrentWeather(
    body: any
  ): Promise<{ message: string; data: any } | string | null> {
    try {
      const response = await apiClient.post(
        endPoints.URL_GET_WEATHER_DATA,
        body
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getPhotoFiles(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_GET_PHOTO_FILE,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async deletePhotoFiles(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_DELETE_PHOTO_FILE,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async addJobHazard(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_SAVE_JOB_HAZARD,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getMileageHistory(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_GET_MILEAGE_HISTORY,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getSugesstions(url: any) {
    try {
      const response = await apiClient.get(url);
      console.log("response: ", response);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "OK") {
          return output.predictions;
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getDirections(url: any) {
    try {
      const response = await apiClient.get(url);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "REQUEST_DENIED" || output?.error_message) {
          return output?.error_message || "Something went wrong";
        } else {
          return output;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async createMileage(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_CREATE_MILEAGE,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async createExpense(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_CREATE_EXPENSE,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getExpenses() {
    try {
      const response = await apiClient.post(endPoints.URL_GET_EXPENSES);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }
  async updateExpenseStatus(param: any) {
    try {
      const response = await apiClient.post(endPoints.URL_UPDATE_STATUS, param);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async createDailyDairyReport(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_CREATE_DAILY_DAIRY_REPORT,
        param
      );
      console.log("response: ", JSON.stringify(response));
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else if (response.status == 401) {
        return 401;
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }
  async createDailyReport(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_CREATE_DAILY_ENTRY_REPORT,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else if (response.status == 401) {
        return 401;
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getNotifications() {
    try {
      const response = await apiClient.post(endPoints.URL_GET_NOTIFICATION);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async updateNotificationStatus(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_UPDATE_NOTIFICATION_STATUS,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getWeeklyReport(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_GET_WEEKLY_REPORT,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async createWeeklyReport(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_CREATE_WEEKLY_REPORT,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getWeeklyInvoiceReport(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_GET_INVOICE_WEEKLY_REPORT,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async createInvoice(param: any) {
    try {
      const response = await apiClient.post(endPoints.URL_CREATE_INOICE, param);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async createExcel(param: any) {
    try {
      const response = await apiClient.post(
        endPoints.URL_GENERATE_INOVOICE_EXCEL,
        param
      );
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

  async getPdfDailyReport(param: any) {
    try {
      const response = await apiClient.post(endPoints.URL_GET_DAILY_PDF_ENTRY,param);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  
  }

  async getPdfWeeklyReport(param:any){
    try {
      const response = await apiClient.post(endPoints.URL_GET_WEEKLY_PDF_REPORT,param);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  
  }

  async getPdfDiaryReport(param: any) {
    try {
      const response = await apiClient.post(endPoints.URL_GET_DAILY_DIARY_ENTRY, param);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return { data: output.data, message: output.message };
        } else {
          return output.message;
        }
      } else {
        return (
          response?.data?.message || "Something went wrong please try again"
        );
      }
    } catch (error) {
      console.log("Error getLogo : ", error);
      return null;
    }
  }

}

export default RestClient;
