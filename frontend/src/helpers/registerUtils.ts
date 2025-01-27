import { api } from "../api/api";

export async function registerUser(formData: { name: string; email: string; password: string }) {
  try {
    const response = await api.post("/user", formData);

    if (response.status === 200) {
      return { success: true, message: "Registration successful! Redirecting to login..." };
    } else {
      return { success: false, message: `Error: ${response.data.detail}` };
    }
  } catch (error) {
    return { success: false, message: "An error occurred. Please try again." };
  }
}
