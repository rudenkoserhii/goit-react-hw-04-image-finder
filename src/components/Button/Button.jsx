import { ButtonStyled } from './Button.styled'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const Button = ({ onSubmit, page, searchValue }) => {

  const handlerSubmit = () => {
      page = page + 1;
      onSubmit(searchValue, page);
  };

return (
    <ButtonStyled type="submit" className="Button" id="Button" onClick={handlerSubmit}>
      <span className="Button-label">Load more</span>
    </ButtonStyled>
)}

Button.propTypes = {
    searchValue: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default function ScrollToBottom() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  }, [pathname]);

  return null;
}
