import apiClient from "./apiClient";
import { AuthResponse, CompanyLogoResponse, SchedulesResponse } from "./apiInterface";
import { endPoints } from "./endPoints";

class RestClient {
  async signup(param: any) {
    try {
      console.log("param : ", param);
      const response = await apiClient.post(endPoints.URL_REGISTER, param);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return {...output.data, message: output.message};
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

  async sendPasswordOtp(email: string): Promise<string | null | {message: string}> {
    try {
      const response = await apiClient.post(endPoints.URL_FORGET_PASSWORD, {
        email,
      });
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        console.log("output : ", output)
        if (output.status == "success") {
          return {message:output.message};
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

  async resetPassword(param: any): Promise<string | null | {message: string}> {
    try {
      const response = await apiClient.post(endPoints.URL_RESET_PASSWORD, param);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return {message:output?.message};
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

  async verifyOtp(param: any): Promise<string | null | {message: string}> {
    try {
      const response = await apiClient.post(endPoints.URL_FORGOT_VERIFY_CODE, param);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return {message:output?.message};
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
      const response = await apiClient.get(endPoints.URL_LOGOS);
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

  async addLogo(param: any): Promise<{message: string} | string | null> {
    try {
      const response = await apiClient.post(endPoints.URL_ADD_LOGO,param);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return {message: output.message};
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

  async createSchedule(body: any): Promise<{message: string} | string | null> {
    try {
      const response = await apiClient.post(endPoints.URL_UPLOAD_SCHEDULE,body);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return {message: output.message};
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

  async addUser(body: any): Promise<{message: string} | string | null> {
    try {
      const response = await apiClient.post(endPoints.URL_ADD_COMPANY_EMAIL,body);
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return {message: output.message};
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

  async getAddress(url: string): Promise<{message: string} | string | null> {
    try {
      const response = await apiClient.get(url);
      console.log("response getAddress : ", response)
      if (response.status == 200 || response.status == 201) {
        const output = response.data;
        if (output.status == "success") {
          return {message: output.message};
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
