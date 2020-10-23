export const baseURL = "http://127.0.0.1:8000";
export const headers = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
