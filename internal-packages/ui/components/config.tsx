export const buttonDefaults = {
  variant:
    process.env.NEXT_PUBLIC_BUTTON_VARIANT ??
    process.env.REACT_APP_BUTTON_VARIANT ??
    "contained",
};
