import React from 'react'

export const ApiPago = () => {
  return (
    <div>
      <h1>Carrito de Compras</h1>
      {ApiPago.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        ApiPago.map((item, index) => (
          <div key={index}>
            <h2>{item.name}</h2>
            <p>${item.price}</p>
          </div>
        ))
      )}
      {ApiPago.length > 0 && <Link to="/checkout">Proceder al Pago</Link>}
    </div>
  )
}
export default ApiPago;