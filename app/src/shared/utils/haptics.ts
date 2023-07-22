import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const buttonClick = () => {
  ReactNativeHapticFeedback.trigger('impactMedium', options);
};

export const errorResponse = () => {
  ReactNativeHapticFeedback.trigger('notificationError', options);
};

export const textClick = () => {
  ReactNativeHapticFeedback.trigger('rigid', options);
};
