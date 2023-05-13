import './EmptyCart.css';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
    return (
        <div className='emptyCart'>
            <div className='emptyCartBox'>
                <RemoveShoppingCartIcon className='icon' />
                <p>There is no any product in your Cart</p>
                <Link className='exp' to={'/products'}>Explore Products</Link>
            </div>
        </div>
    )
}

export default EmptyCart;