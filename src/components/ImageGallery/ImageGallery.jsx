import { ImageGalleryItem } from './ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled'
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, toggleModal }) => {

const onClickTransit = (id) => {
    toggleModal(id);
}

    return (

<ImageGalleryStyled className="ImageGallery">
    { images.map(({ id, webformatURL, tags }) => <ImageGalleryItem onClickTransit={onClickTransit} id={id} key={id} webformatURL={webformatURL} tags={tags}/>)}
</ImageGalleryStyled>
)};


ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    toggleModal: PropTypes.func.isRequired,
};