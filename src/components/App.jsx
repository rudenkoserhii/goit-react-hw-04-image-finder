import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Wrap, ErrorMessage } from './App.styled';
import fetchAPI from './API/API';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',}


export class App extends Component {
  state = {
    images: [],
    error: null,
    status: Status.IDLE,
    searchValue: '',
    page: 0,
    showModal: false,
    selectedId: 0,
    total: 0,
  };

  componentDidUpdate(_, prevState) {
    const prevValue = prevState.searchValue;
    const nextValue = this.state.searchValue;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevValue !== nextValue || prevPage !== currentPage) {
      this.setState({ status: Status.PENDING });

      fetchAPI(currentPage, nextValue)
        .then(responce => {
          if (responce.total === 0) {
            return Promise.reject(new Error(`No pictures with word "${this.state.searchValue}"`))
          }

          return this.setState({ 
              total: Math.ceil(responce.total / 12),
              images: ((prevValue !== nextValue) ? ([...responce.hits]) : ([...prevState.images, ...responce.hits])),
              status: Status.RESOLVED });
        })
        .catch(error => {this.setState({ error, status: Status.REJECTED })
        });
    };
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  
  onSubmit = (value, page) => {
    this.setState({searchValue: value, page: page });
  }

  toggleModal = (id) => {
    this.setState(({ showModal }) => ({ showModal: !showModal, selectedId: id }));
  };

  render() {
    const { images, error, status, showModal, selectedId, page, searchValue, total} = this.state;

    return (
      <main className="App">
        <Searchbar onSubmit={this.onSubmit}/>
        <Wrap>

          {(status === Status.RESOLVED) && (<>
            <ImageGallery images={images} toggleModal={this.toggleModal}/>
              { (page < total ) &&
              <Button onSubmit={this.onSubmit} page={page} searchValue={searchValue}/>}
            </>)}
          {(status === Status.PENDING) && <Loader/>}
          {(status === Status.REJECTED) && <ErrorMessage>{error.message}</ErrorMessage>}
          {(showModal) && <Modal selectedId={selectedId} images={images} onClose={this.toggleModal}/>}
        </Wrap>
      </main>
  )}
}

