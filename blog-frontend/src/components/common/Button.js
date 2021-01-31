import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const buttonStyle = `
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

const StyledButton = styled.button`
  ${buttonStyle} //기존에 사용하던 스타일을 buttonStyle에 담아서 재사용 
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

//styled()함수로 만든 컴포넌트의 경우 임의 props가 필터릴ㅇ 되지 않음..
//실제 엘리먼트에게 속성이 전달되지 않음,,, 
//a태그는 boolean 값이 임의 props로 설정되는 것을 허용하지 않음, 숫자, 문자열만 허용 1163page 참조
const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};
//import가 제대로 작동하기 위해 styled-components로 만든 컴포넌트를 만들어서 export
export default Button;
