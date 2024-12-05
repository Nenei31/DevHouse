import React from 'react';
import { useForm } from 'react-hook-form';
import '../assets/css/tarjeta.css'; // Importamos un archivo CSS para los estilos

const TargetForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    alert('¡Pago realizado con éxito!');
  };

  return (
      <>
      <h2>Datos de la Tarjeta de Crédito</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="credit-card-form">
        <div className="form-group">
          <label htmlFor="cardHolderName">Nombre del Titular</label>
          <input
            id="cardHolderName"
            {...register('cardHolderName', { required: true })}
            placeholder="Ej. Juan Pérez"
          />
          {errors.cardHolderName && <span>Este campo es requerido</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Número de la Tarjeta</label>
          <input
            id="cardNumber"
            {...register('cardNumber', {
              required: true,
              pattern: /^[0-9]{16}$/,
            })}
            placeholder="1234 5678 9012 3456"
            maxLength="16"
          />
          {errors.cardNumber && <span>Introduce un número válido de 16 dígitos</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Fecha de Expiración</label>
            <input
              id="expiryDate"
              {...register('expiryDate', {
                required: true,
                pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
              })}
              placeholder="MM/AA"
              maxLength="5"
            />
            {errors.expiryDate && <span>Formato MM/AA</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              {...register('cvv', {
                required: true,
                pattern: /^[0-9]{3,4}$/,
              })}
              placeholder="123"
              maxLength="4"
            />
            {errors.cvv && <span>Código CVV incorrecto</span>}
          </div>
        </div>

        <button type="submit" className="submit-btn">Pagar</button>
      </form></>
  );
};

export default TargetForm;
