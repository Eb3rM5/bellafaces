import styled from 'styled-components';

import { darken } from 'polished';

export const EmptyContainer = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Container = styled.div`

    padding: 30px;
    background: #fff;
    border-radius: 4px;
    margin: 160px 200px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    display: inline-block;
    flex-direction: column;
`;

export const Title = styled.h1`

`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    align-items: center;
    row-gap: 10px;
    justify-content: center;

    button {
        background: #e91e63;
        color: #fff;
        border: 0;
        border-radius: 4px;
        padding: 12px 20px;
        font-weight: 600;
        font-size: 16px;
        text-transform: uppercase;
        transition: background 0.2s;

        &:hover {
            background:${darken(0.03, '#e91e63')}
        }
    }
`;

export const TextField = styled.span`

    background-color: transparent;
    outline: 0;

    display: flex;
    flex-direction: row;

    :focus-within span {
        background: #e91e63;
        border-color: #e91e63;
    }

    :focus-within span svg {
        fill: white;
    }

    input {
        width:400px;
        padding: 10px 15px;
        font-size: 17px;
        line-height: 1.8rem;
        border: 2px solid #cbcdd4;
        border-left: 0px;

        border-radius: 0px 4px 4px 0px;

        :focus::placeholder {
            color: transparent;
        }

        :focus{
            background: white;
            border-color: #e91e63;
        }



    }


`;

export const IconButton = styled.span.attrs((props)=>({
    type: 'submit'
}))`
    background: #cbcdd4;
    border: 0;
    padding: 0 10px;

    border-radius: 4px 0px 0px 4px;
    border: 2px solid #cbcdd4;

    display: flex;
    align-items: center;
    justify-content: center;
`;
