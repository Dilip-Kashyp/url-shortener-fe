import { api } from "./apiClient";
import { API_ENDPOINTS } from "../constants";

interface UrlItem {
  id: string;
  original_url: string;
  short_code: string;
  short_url: string;
  clicks: number;
  created_at: string;
}

interface UrlHistoryResponse {
  data: {
    history: UrlItem[];
  };
}

export const shortenUrl = async (data: { original_url: string }) => {
  try {
    const response = await api.post(API_ENDPOINTS.SHORTEN, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUrlHistory = async (): Promise<UrlHistoryResponse> => {
  try {
    const response = await api.get(API_ENDPOINTS.HISTORY);
    return response as UrlHistoryResponse;
  } catch (error) {
    throw error;
  }
};

export const deleteUrl = async (shortCode: string) => {
  try {
    const response = await api.delete(`${API_ENDPOINTS.DELETE}/${shortCode}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const pingServer = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.PING);
      return response;
    } catch (error) {
      throw error;
    }
  };
