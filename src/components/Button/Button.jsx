import { ButtonStyled } from './Button.styled'
import PropTypes from 'prop-types';


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