import styled from "styled-components";

export const ButtonSubmit = styled.button`
display: inline-block;
color: palevioletred;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 1px solid palevioletred;
border-raduis: 5px;
display: block;
overflow: hidden;
transition: transform .2s;

&:hover{
    background-color: blue;
    transform: scale(1.2);
}
`;