import styled from 'styled-components'



type BotaoProps = {
    bg: string;
    small?: boolean;
}
export const Botao = styled.button<BotaoProps>`
    font-size: ${(props) => props.small ? '15px':'30px'};
    background-color: ${(props) => props.bg};
`;


type ContainerProps ={
 bgColor?:string;
 color?:string;
 largura?: string;
 altura?: string;
};
export const Container = styled.div<ContainerProps>`
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.color};
    width: ${(props) => props.largura ? props.largura:20}px;
    heigth: ${(props) => props.altura ? props.altura:20}px;  
    display: inline;
`;