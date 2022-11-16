
const APIKEY = '30180377-fac51c2acf971fb8cf8c6aeca';
const URL = `https://pixabay.com/api/?&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`;


async function fetchAPI (currentPage, nextValue) {

    return await fetch(`${URL}&page=${currentPage}&q=${nextValue}`)
        .then(response => {
        if (response.ok) {
        return response.json();
        }
        return Promise.reject(new Error('Error'));
        })

}

export default fetchAPI;