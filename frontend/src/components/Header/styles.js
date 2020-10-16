import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
    background: white;
    padding: 20px 75px;
    border-bottom: 2px solid #dadada;
    border-style: none none solid none;
    z-index: 5042;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    img {
        height: 48px;
    }

    .right {
        align-items: center;
        display: flex;
        justify-content: center;
    }
`;

export const SearchButton = styled.button.attrs((props)=>({
    type: 'submit'
}))`
    background: #cbcdd4;
    border: 0;
    padding: 0 10px;

    border-radius: 0px 4px 4px 0px;
    border: 2px solid #cbcdd4;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const SearchField = styled.span`

    background-color: transparent;
    outline: 0;

    display: flex;
    flex-direction: row;

    input {
        width:400px;
        padding: 10px 15px;
        font-size: 17px;
        line-height: 1.8rem;
        border: 2px solid #cbcdd4;
        border-right: 0px;
        border-radius: 4px 0px 0px 4px;

        :focus::placeholder {
            color: transparent;
        }

        :focus{
            background: white;
            border: 2px solid #e91e63;
            border-right: 0px;
        }

        :focus + button {
            background: #e91e63;
            border-color: #e91e63;
        }

        :focus + button svg {
            fill: white;
        }

    }

`;

export const CartButton = styled.button`
    background: transparent;
    border: 0;
    padding: 10px;

    justify-content: center;
    align-items: center;
`;


export const UserButton = styled.button`
    background: transparent;
    border: 0;
    padding: 10px;

    justify-content: center;
    align-items: center;
`;

export const HeaderLoginMessage = styled.p`
    margin-right: 100px;
    flex: 1;

    strong {
        font-size: 18px;
    }

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;

        small {
            margin-right: 5px;
        }

    }
`;

export const CartLink = styled(Link)`
    text-decoration: none;

    display: flex;
    flex-direction: row;

    align-items: center;

    strong {
        color: #E70D91;
    }

`;
