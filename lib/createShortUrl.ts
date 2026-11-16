"use server"
import{getCollection, URL_COLLECTION} from "@/db";
import{isReachable, isValidAlias, isValidUrl} from "@/lib/validation";
import getAlias from "@/lib/getAlias";
import {formatUrl} from "next/dist/shared/lib/router/utils/format-url";
export type Result =
    |{ok: true; alias: string}
    |{ok: false; error: string}
    |null;
export default async function createShortUrl(urli: string, aliasi: string): Promise<Result> {
    const url = urli.trim();
    const alias = aliasi.trim();
    if (!isValidUrl(url)) {
        return {ok: false, error:"Invalid URL"};
    }else if(!isValidAlias(alias)){
        return {ok: false, error:"Invalid Alias"};
    }else if(!isReachable(url)){
        return {ok: false, error:"Cannot verify the url"};
    }else if(await getAlias(alias)){
        return {ok: false, error:"That alias already exists"};
    }
    const collection = await getCollection(URL_COLLECTION);
    await collection.insertOne({alias, url});
    return {ok: true, alias};
}