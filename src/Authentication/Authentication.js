import { Client, Account, ID } from "appwrite";
import Config from "../Config/Config";


class Auth {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(Config.appWriteUrl).setProject(Config.appWriteId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const newAccount = await this.account.create(
        ID.unique,
        email,
        password,
        name
      );

      if (newAccount) {
        //login
        return await this.logIn(email, password);
      } else {
        return newAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logIn({ email, password }) {
    return await this.account.createEmailSession(email, password);
  }
  async logOut() {
    return await this.account.deleteSessions();
  }
}

const Authentication = new Auth();
export default Authentication;
