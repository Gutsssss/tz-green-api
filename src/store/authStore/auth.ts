import { makeAutoObservable } from "mobx";
import axios from "axios";

interface AuthDataType {
  avatar: string;
  phone: string;
  chatId: string;
  username: string;
  logoutProcess: boolean;
  idInstance: string;
  apiTokenInstance: string;
}
export class AuthStore {
  authData?: AuthDataType;
  loading = false;
  error: string | null | unknown = null;
  get isAuthorized() {
    return Boolean(
      this.authData?.idInstance && this.authData?.apiTokenInstance,
    );
  }
  constructor() {
    makeAutoObservable(this);
  }

  async login(idInstance: string, apiTokenInstance: string) {
    this.loading = true;
    this.error = null;
    try {
      const res = await axios.get(
        `https://4100.api.green-api.com/waInstance${idInstance}/getAccountSettings/${apiTokenInstance}`,
      );
      this.authData = {
        ...res.data,
        idInstance: idInstance,
        apiTokenInstance: apiTokenInstance,
      };
      sessionStorage.setItem("authData", JSON.stringify(this.authData));
    } catch (error: unknown | null | string) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }
  getProfile() {
    const profileData = sessionStorage.getItem("authData");
    this.authData = JSON.parse(profileData ?? "null");
  }
}
export const authStore = new AuthStore();
