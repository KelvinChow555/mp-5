import{getCollection, URL_COLLECTION} from "@/db";
export default async function getAlias(alias: string): Promise<string|null>{
    const collection = await getCollection(URL_COLLECTION);
    const data = await collection.findOne({alias});
    if(data){
        return data.url;
    }
    return null;
}