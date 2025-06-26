import apiClient from "./apiClient";
import { AuthResponse, CompanyLogoResponse } from "./apiInterface";
import { endPoints } from "./endPoints";

class RestClient {

async signup(param: any){
  try {
     const response = await apiClient.post(endPoints.URL_REGISTER, param);
     if (response.status == 200 || response.status == 201) {
        const output = response.data;
          console.log("ouput : ", output);

        if (output.status == "success") {
          // return {...output.data, message: output.message};
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

  async getLogo(): Promise<CompanyLogoResponse[] | string | null>{
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


}

export default RestClient;
