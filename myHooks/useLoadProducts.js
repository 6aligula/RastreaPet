import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useLoadProducts = (keyword, page) => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (firstLoad || page !== productList.page) {
            dispatch(listProducts(keyword, page));
            setFirstLoad(false);
        }
    }, [dispatch, keyword, page, productList.page]);

    return productList;
};
export default useLoadProducts;