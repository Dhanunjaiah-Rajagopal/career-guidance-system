import conf from "@/conf/conf";

import {Avatars, Client, Databases, Storage, Users} from "node-appwrite"

let client = new Client();

client
    .setEndpoint(conf.appwriteUrl) // Your API Endpoint
    .setProject(conf.appwriteProjectId) // Your project ID
    .setKey(conf.apikey) // Your secret API key
    
;

const databases = new Databases(client)
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client)


export { client, databases, users, avatars, storage}
