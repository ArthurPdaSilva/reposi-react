import styled, {keyframes, css} from 'styled-components';

export const Container = styled.div`
    margin: 80px auto;
    max-width: 700px;
    background-color: #FFF;
    border-radius: 4px;
    padding: 30px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

    h1{
        display: flex;
        align-items: center;
        flex-direction: row;
        font-size: 20px;

        svg{
            margin-right: 10px;
        }
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: row;
    margin-top: 30px;

    input{
        flex: 1;
        border: 1px solid ${props => (props.error ? '#FF0000' : '#eee')};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`;

//Criando animação do botão
const animate = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`;

export const SubmitButton= styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0D2636;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;

    //Acessando propriedade, quando ele tiver com essa propriedade, faça o botão ficar...
    &[disabled]{
        cursor: not-allowed;
        opacity: .5;
    }

    ${props => props.loading && 
    css`
        svg{
            animation: ${animate} 2s linear infinite;
        }
    `}

`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        
        //Aplicar apenas do segundo para baixo
        & + li{
            border-top: 1px solid #DDD;
        }

        a{
            color: #0D2636;
            text-decoration: none;
        }
    }
`;

export const DeleteButton = styled.button.attrs({
    type: "button"
})`
    background: transparent;
    color: #0D2636;
    border: 0;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
`;