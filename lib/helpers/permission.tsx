import { PERMISSIONS, RESULTS, request } from "react-native-permissions";

export const Permission = {
  askPhotoIos: async () => {
    try {
      return await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    } catch (error) {
      return error;
    }
  },
  askPhotoAndroid: async () => {
    try {
      return await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    } catch (error) {
      return error;
    }
  },
};
