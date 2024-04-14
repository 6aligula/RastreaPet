import { useDispatch } from 'react-redux';
import { listProducts } from '../store/actions/productActions';

const useSearch = (searchKeyword, setSearchKeyword, page) => {
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(listProducts(searchKeyword, page));
    };

    const clearSearch = () => {
        setSearchKeyword('');
        dispatch(listProducts('', page));
    };

    return { handleSearch, clearSearch };
};

export default useSearch;