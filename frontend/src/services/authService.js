import api from "./api";

export function getProfilePictureUrl(filename) {
  if (!filename) return "";

  if (/^https?:\/\//i.test(filename)) {
    return filename;
  }

  const baseUrl = api.defaults.baseURL?.replace(/\/$/, "") || "";
  return `${baseUrl}/uploads/${filename}`;
}

export function signupUser(formData) {
  return api.post("/users/signup", formData);
}

export function loginUser(formData) {
  return api.post("/users/login", formData);
}

export function logoutUser() {
  return api.post("/users/logout");
}

export function getCurrentUser() {
  return api.get("/users/me", {
    skipAuthRedirect: true,
  });
}

export function uploadProfilePicture(file) {
  const formData = new FormData();
  formData.append("profilePicture", file);

  return api.post("/users/upload", formData);
}
