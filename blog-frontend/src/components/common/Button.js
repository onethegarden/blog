import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    `
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        width: 100%;
        font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    `
        background: ${palette.cyan[5]};
        &:hover {
            ackground: ${palette.cyan[4]};
        }
    `}
`;

const Button = ({to, history, ...rest}) => {
  const onClick = e => {
    //to가 있다면 to로 페이지 이동
    if(to){
      history.push(to);
    }
    if(rest.onClick){
      rest.onClick(e)
    }
  };
return <StyledButton {...rest} onClick={onClick} />;
}
//import가 제대로 작동하기 위해 styled-components로 만든 컴포넌트를 만들어서 export
export default withRouter(Button);
