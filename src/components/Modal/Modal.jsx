import { Component } from "react";
import { createPortal } from "react-dom";
import { ModalStyled, Overlay } from './Modal.styled'

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.onClickEscape)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onClickEscape)
    }

    onClickEscape = (e) => {
        if(e.code === 'Escape') {
        this.props.onClose();
        }
    }

    onClickBackdrop = (e) => {
        if(e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

filtered = this.props.images.filter(({ id }) => id === this.props.selectedId);

render() {
return createPortal(
<Overlay className="Overlay" onClick={this.onClickBackdrop}>
  <ModalStyled className="Modal">
    <img src={this.filtered[0].largeImageURL} alt={this.filtered[0].tags} />
  </ModalStyled>
</Overlay>, modalRoot,

)}}