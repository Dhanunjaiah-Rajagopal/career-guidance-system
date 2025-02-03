import conf from "@/conf/conf";

import { Client, Account, Avatars, Databases, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Your API Endpoint
    .setProject(conf.appwriteProjectId); // Your project ID

const databases = new Databases(client)
const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);


export { client, databases, account, avatars, storage} 
