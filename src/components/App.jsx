import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Wrap, ErrorMessage } from './App.styled';
import fetchAPI from './API/API';
import ScrollToBottom from './Button/Button'
import { BrowserRouter } from 'react-router-dom';


const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',}


export const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
      if (!searchValue) {
        return;
      }

      setStatus(Status.PENDING);

      fetchAPI(page, searchValue)
        .then(responce => {
          if (responce.total === 0) {
            return Promise.reject(new Error(`No pictures with word "${searchValue}"`))
          }
            setTotal(Math.ceil(responce.total / 12));
            setImages(i=>{return ((page === 1) ? ([...responce.hits]) : ([...i, ...responce.hits]))});
            setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setError(Status.REJECTED);
        });
    
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',})
  }, [searchValue, page]);



  
  const onSubmit = (value, page) => {
    setSearchValue(value);
    setPage(page);
  }

  const toggleModal = (id) => {
    setShowModal(!showModal);
    setSelectedId(id);
  };

    return (
      <BrowserRouter >
        <main className="App">
          <Searchbar onSubmit={onSubmit}/>
          <Wrap>

            {(status === Status.RESOLVED) && (<>
              <ImageGallery images={images} toggleModal={toggleModal}/>
                { (page < total ) &&
                <><ScrollToBottom/><Button onSubmit={onSubmit} page={page} searchValue={searchValue}/></>}
              </>)}
            {(status === Status.PENDING) && <Loader/>}
            {(status === Status.REJECTED) && <ErrorMessage>{error.message}</ErrorMessage>}
            {(showModal) && <Modal selectedId={selectedId} images={images} onClose={toggleModal}/>}
          </Wrap>
        </main>
      </BrowserRouter>
  )
}

