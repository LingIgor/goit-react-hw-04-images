import { AddBtn } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <AddBtn type="button" onClick={onClick}>
      Add more
    </AddBtn>
  );
};
