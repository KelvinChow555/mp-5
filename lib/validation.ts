export function isValidUrl(input: string): boolean{
    try{
        const url = new URL(input);
        return (url.protocol === "https:" || url.protocol === "http:") && url.hostname.includes(".");
    }catch{
        return false;
    }
}
export async function isReachable(input: string): Promise<boolean>{
    try{
        const res = await fetch(input, {method: "HEAD", redirect: "follow", signal:AbortSignal.timeout(5000),});
        return res.status < 500;
    }catch{
        return false;
    }
}
export function isValidAlias(alias: string): boolean{
    return /^[A-Za-z0-9_-]{1,50}$/.test(alias);
}

