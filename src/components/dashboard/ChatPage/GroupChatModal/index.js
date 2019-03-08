import React from 'react';
import Modal from '@common/Modal';
import WizardForm from './WizardForm';

const GroupChatModal = ({ handleClose }) => (
  <Modal title="Create Group Chat" onClose={handleClose}>
    <WizardForm />
  </Modal>
);

export default GroupChatModal;
