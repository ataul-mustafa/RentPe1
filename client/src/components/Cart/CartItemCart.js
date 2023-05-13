import { Link } from 'react-router-dom';
import './CartItemCart.css'

const CartItemCard = ({item, deletCartItems}) =>{
    
    return(
        <div className='CartItemCard'>
            <img src={item.image} alt='ssa' />
            <div>
                <Link to={`/produtct/${item.product}`} >{item.name}</Link>
                <span>{`price:  ${item.price}`}</span>
                <p onClick={()=>deletCartItems(item.product)}>Remove</p>
            </div>
        </div>
    )
}

export default CartItemCard;