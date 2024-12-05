import React, { useState, useEffect } from 'react';
import '../assets/css/pago.css'; // Importa el archivo de estilos

function PaymentPage() {
  const [factura, setFactura] = useState({
    numeroDocumento: '',
    IDTipoDocumento: '',
    montoTotal: '',
    descuentoDocumento: '',
    subTotalDocumento: '',
    IDMetodoPago: '',
    direccionEntrega: '',
    observacionesDocumento: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFactura({ ...factura, [name]: value });
  };

  useEffect(() => {
    const subTotal = parseFloat(factura.subTotalDocumento) || 0;
    const descuento = parseFloat(factura.descuentoDocumento) || 0;
    const total = subTotal - descuento;
    setFactura((prevFactura) => ({
      ...prevFactura,
      montoTotal: total.toFixed(2),
    }));
  }, [factura.subTotalDocumento, factura.descuentoDocumento]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const facturaData = {
      numeroDocumento: factura.numeroDocumento,
      montoTotal: parseFloat(factura.montoTotal),
      descuentoDocumento: parseFloat(factura.descuentoDocumento),
      subTotalDocumento: parseFloat(factura.subTotalDocumento),
      direccionEntrega: factura.direccionEntrega,
      observacionesDocumento: factura.observacionesDocumento,
      idmetodoPago: parseInt(factura.IDMetodoPago),
      idtipoDocumento: parseInt(factura.IDTipoDocumento)
    };

    try {
      const response = await fetch('http://localhost:8080/facturas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facturaData),
      });

      if (response.ok) {
        alert('¡Pago enviado exitosamente!');
      } else {
        console.error('Error al crear la factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="payment-page">
      <h1>Realiza el Pago</h1>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Número de Documento:</label>
          <input
            type="text"
            name="numeroDocumento"
            value={factura.numeroDocumento}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo de Documento:</label>
          <select
            name="IDTipoDocumento"
            value={factura.IDTipoDocumento}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Seleccione el tipo de documento</option>
            <option value="1">DNI</option>
            <option value="2">RUC</option>
            <option value="3">Pasaporte</option>
          </select>
        </div>

        <div className="form-group">
          <label>SubTotal:</label>
          <input
            type="text"
            name="subTotalDocumento"
            value={factura.subTotalDocumento}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descuento:</label>
          <input
            type="text"
            name="descuentoDocumento"
            value={factura.descuentoDocumento}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Monto Total:</label>
          <input
            type="text"
            name="montoTotal"
            value={factura.montoTotal}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Método de Pago:</label>
          <select
            name="IDMetodoPago"
            value={factura.IDMetodoPago}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Seleccione el método de pago</option>
            <option value="1">Tarjeta de Crédito</option>
            <option value="2">Transferencia Bancaria</option>
            <option value="3">Pago en Efectivo</option>
          </select>
        </div>

        <div className="form-group">
          <label>Dirección de Entrega:</label>
          <input
            type="text"
            name="direccionEntrega"
            value={factura.direccionEntrega}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Observaciones:</label>
          <textarea
            name="observacionesDocumento"
            value={factura.observacionesDocumento}
            onChange={handleInputChange}
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Enviar Pago</button>
      </form>
    </div>
  );
}

export default PaymentPage;
