import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: 'auto',
    height: 'auto',
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
};

const CustomModal = ({ isOpen, onRequestClose, contentLabel, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={contentLabel} style={customStyles}>
      {children}
    </Modal>
  );
};

export default CustomModal;