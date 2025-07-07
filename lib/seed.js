import { appwriteConfig, databases ,storage} from './appwrite';
import dummyData from './data';
import { ID } from 'react-native-appwrite';

const data = dummyData;

async function clearAll(collectionId) {
    const list = await databases.listDocuments(appwriteConfig.databaseId, collectionId);
    await Promise.all(
        list.documents.map((doc) =>
            databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
        )
    );
}

async function clearStorage() {
    const list = await storage.listFiles(appwriteConfig.bucketId);
    await Promise.all(
        list.files.map((file) => storage.deleteFile(appwriteConfig.bucketId, file.$id))
    );
}

async function seed() {
    try {
        console.log('Starting seed process...');
        console.log('Clearing collections and storage...');
        await Promise.all([
            clearAll(appwriteConfig.categoriesCollectionId),
            clearAll(appwriteConfig.customizationsCollectionId),
            clearAll(appwriteConfig.menuCollectionId),
            clearAll(appwriteConfig.menuCustomizationsCollectionId),
            clearStorage(),
        ]);
        console.log('Collections and storage cleared.');

        console.log('Seeding categories...');
        const categoryMap = {};
        for (const cat of data.categories) {
            console.log(`Creating category: ${cat.name}`);
            const doc = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.categoriesCollectionId,
                ID.unique(),
                cat
            );
            categoryMap[cat.name] = doc.$id;
        }
        console.log('Categories seeded:', categoryMap);

        console.log('Seeding customizations...');
        const customizationMap = {};
        for (const cus of data.customizations) {
            console.log(`Creating customization: ${cus.name}`);
            const doc = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.customizationsCollectionId,
                ID.unique(),
                {
                    name: cus.name,
                    price: cus.price,
                    type: cus.type,
                }
            );
            customizationMap[cus.name] = doc.$id;
        }
        console.log('Customizations seeded:', customizationMap);

        console.log('Seeding menu...');
        const menuMap = {};
        for (const item of data.menu) {
            console.log(`Processing menu item: ${item.name}`);
            const doc = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.menuCollectionId,
                ID.unique(),
                {
                    name: item.name,
                    description: item.description,
                    image_url: item.image_url, // Use pre-uploaded Appwrite URL
                    price: item.price,
                    rating: item.rating,
                    calories: item.calories,
                    protein: item.protein,
                    Categories: categoryMap[item.category_name],
                }
            );
            menuMap[item.name] = doc.$id;
            for (const cusName of item.customizations) {
                console.log(`Linking customization ${cusName} to ${item.name}`);
                await databases.createDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.menuCustomizationsCollectionId,
                    ID.unique(),
                    {
                        menu: doc.$id,
                        customizations: customizationMap[cusName],
                    }
                );
            }
        }
        console.log('Menu seeded:', menuMap);
        console.log('✅ Seeding complete.');
    } catch (error) {
        console.error('Seed error:', error.message);
        throw error;
    }
}

export default seed;