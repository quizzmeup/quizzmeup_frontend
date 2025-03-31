export const handleApiError = (error) => {
  const status = error.response?.status;
  const message =
    error.response?.data?.message ||
    error.message ||
    "An unexpected error occurred.";

  console.error(`[API Error ${status || "??"}]`, message);

  return message;
};
