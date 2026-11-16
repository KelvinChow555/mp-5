"use client"
import {useState} from "react";
import createShortUrl from "@/lib/createShortUrl";
import type{ Result } from "@/lib/createShortUrl";
import styled from "styled-components";
const Card = styled.div`
    width: 100%;
    max-width: 450px;
    background: white;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-radius: 12px;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
const Input = styled.input`
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 8px;
    font: inherit;
`;
const SubmitButton=styled.button`
    background: blue;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px;
    font: inherit;
    cursor: pointer;
    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;
const ErrorMessage = styled.p`
    color: red;
    margin: 0;
`;
const ResultBox = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    background: white;
    border-radius: 6px;
    border: 1px solid lightblue;
    padding: 8px;
`;
const ShortLink = styled.a`
    flex: 1;
    color: grey;
    word-break: break-all;
`;
const CopyButton = styled.button`
    background: white;
    border: none;
    border-radius: 6px;
    padding: 4px 8px;
    font: inherit;
    cursor: pointer;
`;
export default function ShortenForm(){
    const [result, setResult] = useState<Result | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    let shortUrl = "";
    if(result && result.ok){
        shortUrl = window.location.origin + "/" + result.alias;
    }
    async function submit(data:FormData){
        setLoading(true);
        setCopied(false);
        const res = await createShortUrl(String(data.get("url")), String(data.get("alias")));
        setResult(res);
        setLoading(false);
    }
    async function copy(){
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
    }
    return(
        <Card>
            <Form action={submit}>
                <Input name="url" required placeholder="https://yourwebsite.com"/>
                <Input name="alias" placeholder="custome-alias"/>
                <SubmitButton type="submit" disabled ={loading}>
                    {loading ? "Shortening..." : "Shorten"}
                </SubmitButton>
            </Form>
            {result && !result.ok &&<ErrorMessage>{result.error}</ErrorMessage>}
            {result && result.ok && (
                <ResultBox>
                    <ShortLink href = {shortUrl} target="_blank">{shortUrl}</ShortLink>
                    <CopyButton onClick={copy}>
                        {copied ? "Copied!" : "Copy"}
                    </CopyButton>
                </ResultBox>
            )}
        </Card>

    )


}