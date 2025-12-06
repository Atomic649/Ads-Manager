import { getAxios } from "@/utils/axiosInstance";
import { getAxiosWithAuth } from "@/utils/axiosInstance";
import { checkNetwork } from "@/utils/utility";
import axios from "axios";
import { t } from "i18next";

class CallAPIProduct {
  // Create Product API
  async CreateProductAPI(data: {
    title: string;
    description: string;
    image?: string;
    callToAction?: string;
    businessId: number;
    categoryId: number;
    authorId: string;
    details?: Array<{ key: string; value: string }>;
  }): Promise<any> {
    if (!(await checkNetwork())) {
      return { message: "No Network Connection" };
    }
    try {
      const axiosAuth = await getAxiosWithAuth();
      const response = await axiosAuth.post("/product/create", data);

      console.log("📝Product Create API:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "❌Product Create API Error:",
        error.response?.data || error.message
      );
      return {
        message: error.response?.data?.message || "Create Product API failed",
      };
    }
  }

  //   Get Product by ID API
  async GetProductByIdAPI(productId: number): Promise<any> {
    if (!(await checkNetwork())) {
      return { message: "No Network Connection" };
    }
    try {
      const axiosClient = getAxios();
      const response = await axiosClient.get(`/product/${productId}`);

      console.log("📝Get Product By ID API:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "❌Get Product By ID API Error:",
        error.response?.data || error.message
      );
      return {
        message:
          error.response?.data?.message ||
          "Get Product By ID API failed",
      };
    }
  }

  //   Get Product List by Business ID API
  async GetProductListByBusinessIDAPI(businessId: number): Promise<any> {
    if (!(await checkNetwork())) {
      return { message: "No Network Connection" };
    }
    try {
      const axiosClient = getAxios();
      const response = await axiosClient.get(`/product/lists/${businessId}`);

      console.log("📝Get Product List by Business ID API:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "❌Get Product List by Business ID API Error:",
        error.response?.data || error.message
      );
      return {
        message:
          error.response?.data?.message ||
          "Get Product List by Business ID API failed",
      };
    }
  }

  //   Search Product List by Business ID API
  async SearchProductListByBusinessIDAPI(businessId: number, q: string): Promise<any> {
    if (!(await checkNetwork())) {
      return { message: "No Network Connection" };
    }
    try {
      const axiosClient = getAxios();
      const response = await axiosClient.get(`/product/lists/${businessId}`, { params: { q } });

      console.log("📝Search Product List by Business ID API:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "❌Search Product List by Business ID API Error:",
        error.response?.data || error.message
      );
      return {
        message:
          error.response?.data?.message ||
          "Search Product List by Business ID API failed",
      };
    }
  }

  //   Delete Product API
  async DeleteProductAPI(productId: number): Promise<any> {
    if (!(await checkNetwork())) {
      return { message: "No Network Connection" };
    }
    try {
      const axiosAuth = await getAxiosWithAuth();
      const response = await axiosAuth.delete(`/product/${productId}`);

      console.log("📝Delete Product API:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "❌Delete Product API Error:",
        error.response?.data || error.message
      );
      return {
        message: error.response?.data?.message || "Delete Product API failed",
      };
    }
  }
}

export const callAPIProduct = new CallAPIProduct();
