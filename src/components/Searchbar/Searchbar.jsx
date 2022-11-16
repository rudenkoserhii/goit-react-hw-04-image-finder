import { Component } from 'react';
import { SearchFormInput, SearchFormButtonLabel, SearchFormButton, SearchForm, SearchbarStyled } from './Searchbar.styled';
import Notiflix from 'notiflix';

export class Searchbar extends Component {
state = {
    value: '',
}

onChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
    };

handleSubmit = e => {
    e.preventDefault();


    if (this.state.value.trim() === '') {
        Notiflix.warning('No search word entered!');
        return;
    }
    this.props.onSubmit(this.state.value, 1);
    this.setState({ value: '' });

    e.target.reset();
};


    render() {
        return (
<SearchbarStyled className="Searchbar" onSubmit={this.handleSubmit}>
  <SearchForm className="SearchForm">
    <SearchFormButton type="submit" className="SearchForm-button">
        {<SearchFormButtonLabel className="SearchForm-button-label">Search</SearchFormButtonLabel>}
    </SearchFormButton>
    <SearchFormInput
        name="searchValue"
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={this.onChange}
    />
  </SearchForm>
</SearchbarStyled>
)}};


