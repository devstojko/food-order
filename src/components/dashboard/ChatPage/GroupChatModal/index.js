import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@common/Modal';
import WizardForm from './WizardForm';
import './GroupChatModal.scss';

const GroupChatModal = ({ handleClose }) => (
  <Modal title="Create Group Chat" onClose={handleClose}>
    <WizardForm />
  </Modal>
);

GroupChatModal.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default GroupChatModal;
