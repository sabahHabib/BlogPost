import { apiWithFormUrlEncoded } from "../api/api";

export async function loginUser(formData: { username: string; password: string }) {
  try {
    const response = await apiWithFormUrlEncoded("/login", formData);

    if (response.status === 200) {
      const token = response.data.access_token;
      localStorage.setItem("token", token);

      return { success: true, message: "Login successful!" };
    }

    return { success: false, message: `Error: ${response.data.detail}` };
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "An error occurred. Please try again.";
    return { success: false, message: errorMessage };
  }
}
