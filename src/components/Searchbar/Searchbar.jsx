import { useState } from 'react';
import { SearchFormInput, SearchFormButtonLabel, SearchFormButton, SearchForm, SearchbarStyled } from './Searchbar.styled';
import Notiflix from 'notiflix';

export const Searchbar = ({ onSubmit }) => {

    const [value, setValue] = useState('');

    const onChange = e => {
        setValue(e.currentTarget.value.toLowerCase());
        };

    const handleSubmit = e => {
        e.preventDefault();

        if (value.trim() === '') {
           Notiflix.Notify.failure('No search word entered!');
            return;
        }
        onSubmit(value, 1);
        setValue('');

        e.target.reset();
    };


    return (
        <SearchbarStyled className="Searchbar" onSubmit={handleSubmit}>
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
                onChange={onChange}
            />
        </SearchForm>
        </SearchbarStyled>
)};


