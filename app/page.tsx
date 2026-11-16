"use client"
import styled from "styled-components";
import ShortenForm from "@/app/components/ShortenForm";
const Main = styled.main`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
`;
const Title = styled.h1`
    font-size: 48px;
    margin-bottom: 24px;
`;
export default function Home(){
    return (
        <Main>
            <Title>Shorten your URL</Title>
            <ShortenForm />
        </Main>
    );
}
