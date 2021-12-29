import { connect } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const CheckoutPage = ({cartTotal, cartItems}) => (
 <div className="checkout-page">
   <div className="checkout-header">
     <div className="header-block">
       <span>Product</span>
     </div>
     <div className="header-block">
       <span>Description</span>
     </div>
     <div className="header-block">
       <span>Quantity</span>
     </div>
     <div className="header-block">
       <span>Price</span>
     </div>
     <div className="header-block">
       <span>Remove</span>
     </div>
   </div>
   {cartItems.map(cartItem => <CheckoutItem cartItem={cartItem}/>)}
   <div className="total">{cartItems.length ? `TOTAL: $${cartTotal}` : ''}</div>
 </div>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage);