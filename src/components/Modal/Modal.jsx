import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalStyled, Overlay } from './Modal.styled'

const modalRoot = document.querySelector('#modal-root');

export const Modal = ( { selectedId, images, onClose }) => {

    useEffect(() => {
    if (window){
        window.addEventListener('keydown', onClickEscape);
    }
    return () => {
        window.removeEventListener('keydown', onClickEscape);
    }}, )

    const onClickEscape = (e) => {
        if(e.code === 'Escape') {
        onClose();
        }
    }

    const onClickBackdrop = (e) => {
        if(e.currentTarget === e.target) {
            onClose();
        }
    }

    const filtered = images.filter(({ id }) => id === selectedId);

    return createPortal(
        <Overlay className="Overlay" onClick={onClickBackdrop}>
        <ModalStyled className="Modal">
            <img src={filtered[0].largeImageURL} alt={filtered[0].tags} />
        </ModalStyled>
        </Overlay>, modalRoot,

)}