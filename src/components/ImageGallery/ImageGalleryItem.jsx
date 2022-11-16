import PropTypes from 'prop-types';
import { ImageGalleryItemStyled, ImageGalleryItemImage } from './ImageGallery.styled'

export const ImageGalleryItem = ({ webformatURL, tags, id, onClickTransit }) => {


    const onClick = () => {
        onClickTransit(id);
    };

    return  (

<ImageGalleryItemStyled className="ImageGalleryItem" onClick={onClick} id={id}>
  <ImageGalleryItemImage className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
</ImageGalleryItemStyled>

)};

ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClickTransit: PropTypes.func,
};