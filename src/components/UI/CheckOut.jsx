import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../../store/CartContex";
import { currencyFormatter } from "../util/formatting";
import Input from "./Input.jsx";
import Button from '../UI/Buttons.jsx';
import UserProgressContext from "../../store/UserProgressContext.jsx";
import useHttp from '../../hooks/useHttp.js';

const requestConfig = {
 method: 'POST',
 headers: {
    'Content-Type': 'application/json'
 }
};

export default function CheckOut(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx =  useContext(UserProgressContext);
     

   const{data, isLoading:isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders',requestConfig);
    const cartTotal =  cartCtx.items.reduce((totalPrice, item)=>totalPrice+item.quantity*item.price, 0);
    function handleClose(){
        userProgressCtx.hideCheckout();
    }


    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event){
             event.preventDefault();
            const fd=  new FormData(event.target);
            const coustomerData = Object.fromEntries(fd.entries());
              sendRequest(JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: coustomerData,
                },
            })
            );

            // fetch('http://localhost:3000/orders', {
            //     method:'POST',
            //     headers:{
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         order: {
            //             items: cartCtx.items,
            //             customer: coustomerData
            //         },
            //     })
            // });
    }

    let actions = (<>
       <Button textOnly type="button" onClick={handleClose}>Close</Button>
                <Button>Submit Order</Button>
    </>);

    if(isSending){
        actions= <span>Sending Order Data...</span>
    }
    if(data && !error){
        return <Modal open={userProgressCtx.progress==='checkout'} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your Order was Submitted Successfully. </p>
            <p>we will get back to you with mode details via email</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }
    return (<Modal open={userProgressCtx.progress ==='checkout'} onClose={handleFinish}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="name"/>
            <Input label="Email Address" id="email" type="email" />
            <Input label="street" type="text" id="street"/>
            <div className="control-row">
                <Input label="postal Code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city"/>
            </div>
            {error && <Error title="Failed to submit order" message={error}/>}
            <p className="odal-actions">
             {actions}
            </p>
        </form>
    </Modal>
    );
}