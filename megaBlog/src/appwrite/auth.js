import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(), 
                email, 
                password, 
                name
            );

            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }

        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email, 
                password
            );
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            // This throws 401 if the user is not logged in.
            // The catch block handles it, so your app doesn't crash.
            return await this.account.get();
        } catch (error) {
            // It is normal to see a 401 error in the console here if the user is not logged in.
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout() {
        try {
            // FIX: Pass the session ID string directly
            await this.account.deleteSession('current');
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;