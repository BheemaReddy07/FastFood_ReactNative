import { Account, Avatars, Client, Databases, ID, Storage } from "react-native-appwrite"

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: "com.bsr.fooddelivery",
    databaseId: "686a2649000729848c36",
    userCollectionId: "686a269c002be7f4d673",
}

export const client = new Client();

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatar = new Avatars(client)

export const createUser = async ({ email, password, name }) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if (!newAccount) throw new Error("Account creation Failed");
        await signIn({ email, password });

        const avatarUrl = Avatars.getInitialsURL(name);
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        )


    } catch (error) {
        throw new Error(error.message);
    }
}

export const signIn = async ({ email, password }) => {
    try {
        await account.createEmailPasswordSession(email, password)
    } catch (error) {
        throw new Error(error.message);
    }
}