import apiClient from "@/libs/apiClient";


const NOTIFICATION_SERVICE_BASE_URL = process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL || "http://localhost:4001/api";


export const notificationService = {
  getUserNotifications: async (userId: string) => {
    return apiClient.get(`${NOTIFICATION_SERVICE_BASE_URL}/notifications/${userId}`).then(res => res.data);
  }
};
