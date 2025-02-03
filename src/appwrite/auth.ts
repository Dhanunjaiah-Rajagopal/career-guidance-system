import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
import type { Models } from "appwrite";

export interface CreateAccountParams {
  email: string;
  password: string;
  name: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export class AuthService {
  private client: Client;
  private account: Account;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }: CreateAccountParams): Promise<Models.Session | null> {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({ email, password });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }: LoginParams): Promise<Models.Session> {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(userId?: string): Promise<any| null> {
    try {
      if (userId) {
        // Fetch a specific user's data if userId is provided
        return await this.account.get();
      } else {
        // Fetch the currently logged-in user's data
        return await this.account.get();
      }
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser() :: ", error);
      return null;
    }
  }

  async getUser(): Promise<any | null> {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getUser() :: ", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite service :: logout() :: ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
