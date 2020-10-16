import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    padding: 30px;
    margin: 80px 200px;
`;

export const ProductList = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    list-style: none;

    li {
        display: flex;
        flex-direction: column;
        background: #fff;
        border-radius: 4px;
        padding: 20px;

        img {
            align-self: center;
            width: 250px;
        }

        > strong {
            font-size: 16px;
            line-height: 20px;
            color: #333;
            margin-top: 5px;
        }

        > span {
            font-size: 21px;
            font-weight: bold;
            margin: 5px 0px 20px;
        }

        button {
            background: #E70D91;
            color: #fff;
            border: 0;
            border-radius: 4px;
            overflow: hidden;
            margin-top: auto;

            display: flex;
            align-items: center;

            transition: background 0.2s;

            &:hover {
                background: ${darken(0.03, '#E70D91')};
            }

            div {
                display: flex;
                align-items: center;
                padding: 12px;
                background: rgba(0, 0, 0, 0.1);
            }

            span {
                flex: 1;
                text-align: center;
                font-weight: bold;
            }

        }
    }
`;
