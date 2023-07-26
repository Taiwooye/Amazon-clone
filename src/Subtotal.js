import React from "react";
import "./Subtotal.css";
//import CurrencyFormat from 'react-currency-format';
import { useStateValue } from "./StateProvider";
import { getBasetTotal } from "./Reducer";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <div>
        <>
          <p>
            Subtotal ({basket.length} items):{" "}
            <strong>{getBasetTotal(basket)}</strong>
          </p>
          <small className="subtotal__gift">
            <input className="subtotal__input" type="checkbox" /> This order
            contain a gift
          </small>
        </>
      </div>
      {/* <CurrencyFormat
      renderText={(value)=>(
      <>
      <p>Subtotal ({basket.length} items): <strong>{value}
      </strong>
      </p>
      <small className="subtotal__gift">
        <input className='subtotal__input' type="checkbox" /> This order contain a gift
      </small>
      </>
  )} 
  decimalScale={2}
  value={getBasetTotal(basket)}
  displayType={'text'}
  thousandSeparator={true}
  prefix={'$'}
   /> */}
      <button className="subtotal__button">Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;
