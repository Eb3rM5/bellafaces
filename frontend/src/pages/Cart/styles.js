import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    padding: 30px;
    background: #fff;
    border-radius: 4px;
    margin: 160px 200px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;

    footer {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            background: #E70D91;
            color: #fff;
            border: 0;
            border-radius: 4px;
            padding: 12px 20px;
            font-weight: 600;
            font-size: 16px;
            text-transform: uppercase;
            transition: background 0.2s;

            &:hover {
                background:${darken(0.03, '#E70D91')}
            }
        }
    }
`;

export const ProductList = styled.table`
    width: 100%;

    thead th {
        color: #999;
        text-align: left;
        padding: 12px;
    }

    tbody td {
        padding: 12px;
        border-bottom: 1px solid #eee;
    }

    img {
        height: 75px;
    }

    strong {
        color: #333;
        display: block;
    }

    span {
        display: block;
        margin-top: 5px;
        font-size: 18px;
        font-weight: bold;
    }

    div {
        display: flex;
        align-items: center;

        input {
            border: 1px solid #ddd;
            border-radius: 4px;
            color: #666;
            padding: 6px;
            width: 50px;
        }
    }

    button {
        background: none;
        border: 0;
        padding: 6px;

        :hover {
            opacity: .8;
        }
    }

`;

export const Total = styled.div`
    display: flex;
    align-items: baseline;

    span {
        color: #999;
        font-weight: bold;
    }

    strong {
        font-size: 20px;
        margin-left: 5px;
    }
`;

export const Title = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: #999;
    text-align: left;
    padding: 12px;
    padding: 0;
    outline: 0;
    margin-top: 12px;
`;

export const CommentArea = styled.textarea`
    flex: 1;
    margin-top: 10px;
    padding: 10px 15px;
    font-size: 17px;
    line-height: 1.8rem;
    border: 2px solid #cbcdd4;
    border-radius: 4px;

    resize: none;

    :focus::placeholder {
        color: transparent;
    }

    :focus{
        background: white;
        border: 2px solid #e91e63;
    }

    :focus + button {
        background: #e91e63;
        border-color: #e91e63;
    }

    :focus + button svg {
        fill: white;
    }
`;
