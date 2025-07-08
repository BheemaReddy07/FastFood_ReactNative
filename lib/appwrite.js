import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite"

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: "com.bsr.fooddelivery",
    databaseId: "686a2649000729848c36",
    bucketId: '686b48c70028b445e551',
    userCollectionId: "686a269c002be7f4d673",
    categoriesCollectionId: "686b445b0033245a6f6d",
    menuCollectionId: "686b44b7003cab8210af",
    customizationsCollectionId: '686b46a0000d9138ac37',
    menuCustomizationsCollectionId: '686b478a002fca8254d3',

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

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error("No Current account");

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser || !currentUser.documents.length) {
            throw new Error("User document not found");
        }
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

export const getMenu = async ({ category, query }) => {
    try {
        const queries = [];
        if (category && category !== 'all') {
            queries.push(Query.equal('Categories', category)); 
        }
        if (query) queries.push(Query.search("name", query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        );
        return menus.documents;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId
        );
        return categories.documents
    } catch (error) {
        throw new Error(error.message)
    }
}


