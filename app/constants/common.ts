export const LOCAL_STORAGE_KEY = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    USER: "user",
}

export const API_ENDPOINTS = {
    SHORTEN: "/url/shorten",
    REGISTER: "/user/register",
    LOGIN: "/user/login",
    GET_USER: "/user/get-user",
    HISTORY: "/url/history",
    PING: "/test/ping",
    REDIRECT: "/url/redirect",
    DELETE: "/url",
}

export const LOGIN_URL = "/login";
export const REGISTER_URL = "/register";
export const DASHBOARD_URL = "/dashboard";
















export const DASHBOARD_TABLE_COLUMNS  = [
    {
      title: "Original URL",
      dataIndex: "original_url",
      key: "original_url",
    },
    {
      title: "Short URL",
      dataIndex: "short_url",
      key: "short_url",
    },
    {
      title: "QR Code",
      dataIndex: "short_url",
      key: "short_url",
    },
    {
      title: "Status",
      dataIndex: "short_url",
      key: "short_url",
    },
    {
      title: "Clicks",
      dataIndex: "clicks",
      key: "clicks",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];