import styled from 'styled-components';
import Button from '../button/button.component';

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  button:nth-child(2){
    font-size: 11px;
  }
`;