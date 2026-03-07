import React from 'react';
import { PaystackButton } from 'react-paystack';

const PaystackIntegration = ({
    email,
    amount,
    metadata,
    onSuccess,
    onClose,
    buttonText = "Pay Now"
}) => {
    // PUBLIC KEY - In production, this should be in .env
    const publicKey = "pk_test_d2d6c134078864f1c12140889279589998129846"; // Placeholder Test Key

    const componentProps = {
        email,
        amount: amount * 100, // Paystack takes amounts in Kobo (NGN * 100)
        metadata: {
            ...metadata,
            custom_fields: [
                {
                    display_name: "Service Type",
                    variable_name: "service_type",
                    value: metadata?.serviceType || "Cleaning Service"
                }
            ]
        },
        publicKey,
        text: buttonText,
        onSuccess: (reference) => {
            console.log("Payment Successful:", reference);
            onSuccess(reference);
        },
        onClose: () => {
            console.log("Transaction closed");
            if (onClose) onClose();
        },
    };

    return (
        <PaystackButton
            className="btn btn-primary w-full py-4 mt-4 flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/20"
            {...componentProps}
        />
    );
};

export default PaystackIntegration;
