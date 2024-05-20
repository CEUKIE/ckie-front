import styled from '@emotion/native';
import theme from '../../styles/theme';
import {ButtonProps} from 'react-native';

interface IButtonProps extends Omit<ButtonProps, 'title'> {
  varient?: 'default' | 'outline' | 'text';
  fullWidth?: boolean;
  children: React.JSX.Element;
}

const StyledTouchableOpacity = styled.TouchableOpacity<IButtonProps>`
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: ${props => props.varient !== 'text' && '10px'};
  width: ${props => (props.fullWidth ? '100%' : 'fit-content')};
  border: ${props => props.varient === 'outline' && '1px solid #ACACAC'};
  background-color: ${props =>
    props.varient === 'default' && theme.color.primary};
  background-color: ${props => props.disabled && theme.color.lightGray};
`;

const Button = (props: IButtonProps) => {
  const {varient = 'default', fullWidth, children, ...rest} = props;

  return (
    <StyledTouchableOpacity varient={varient} fullWidth={fullWidth} {...rest}>
      {children}
    </StyledTouchableOpacity>
  );
};

export default Button;
