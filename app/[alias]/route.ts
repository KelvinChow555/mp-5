import { redirect } from "next/navigation";
import getAlias from "@/lib/getAlias";

export async function GET(_request: Request, { params }: { params: Promise<{ alias: string }> }) {
    const { alias } = await params;
    const url = await getAlias(alias);
    if (!url) {
        return new Response(`No link found for "${alias}"`, { status: 404 });
    }
    redirect(url);
}