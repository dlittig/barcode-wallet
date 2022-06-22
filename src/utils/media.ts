import * as ImagePicker from "expo-image-picker";

import { showToast } from "./ui";
import i18n from "../translations/i18n";

export const requestImagePickerCameraPermission =
  async (): Promise<boolean> => {
    let imagePickerStatus: ImagePicker.PermissionStatus;

    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      imagePickerStatus = status;
    } catch (e) {
      showToast(i18n.t("toasts.permissions.camera.failedToAskForPermission"));

      return false;
    }

    if (imagePickerStatus !== ImagePicker.PermissionStatus.GRANTED) {
      showToast(i18n.t("toasts.permissions.camera.notGranted"));
      return false;
    }

    return true;
  };

export const requestImagePickerMediaPermission = async (): Promise<boolean> => {
  let imagePickerStatus: ImagePicker.PermissionStatus;

  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    imagePickerStatus = status;
  } catch (e) {
    showToast(i18n.t("toasts.permissions.media.failedToAskForPermission"));

    return false;
  }

  if (imagePickerStatus !== ImagePicker.PermissionStatus.GRANTED) {
    showToast(i18n.t("toasts.permissions.media.notGranted"));
    return false;
  }

  return true;
};

export const launchCamera =
  async (): Promise<ImagePicker.ImagePickerResult> => {
    return await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
  };
