import React from 'react';
import ReactDOM from 'react-dom';
import '../../assets/css/paypalButton.css';
import { useLocation } from 'react-router-dom';
import TargetForm from '../tarjeta';

const PayPalButtonComponent = window.paypal.Buttons.driver("react", { React, ReactDOM });

const PaypalButton = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get('total');

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: price.toString()
                },
            }],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture();
    };

    return (
        <div className="paypal-button-container">
            <div className="paypal-button-overlay">
                <h1>MONTO TOTAL: S/. {price}</h1>
                <TargetForm />
            </div>
        </div>
    );
};

export default PaypalButton;


