import React from 'react';

const Modal = ({ children, isOpen, onClose }) => {
    if (!isOpen) return null; // Si el modal no está abierto, no mostrar nada.

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
                {/* Botón para cerrar el modal */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
