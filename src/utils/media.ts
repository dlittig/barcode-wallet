import * as ImagePicker from "expo-image-picker";

export const requestImagePickerPermission = async (): Promise<boolean> => {
  let imagePickerStatus: ImagePicker.PermissionStatus;

  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    imagePickerStatus = status;
  } catch (e) {
    console.error(
      `An error occured when asking for Image Picker permission: ${e}`
    );

    return false;
  }

  if (imagePickerStatus !== ImagePicker.PermissionStatus.GRANTED) {
    console.warn(
      `Notification permission was not granted: ${imagePickerStatus}`
    );
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
