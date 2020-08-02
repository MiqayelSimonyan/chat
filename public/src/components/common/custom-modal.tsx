import React, { memo, FunctionComponent } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import 'assets/styles/layout/modal.scss';

type Props = {
  open: boolean;
  modalHandler: () => void;
  overlay: string;
  children: React.ReactNode;
};

const CustomModal: FunctionComponent<Props> = (props) => {
  const { open, modalHandler, overlay, children } = props;
  const closeIcon = <span aria-hidden='true'>&times;</span>;

  return (
    <>
      <Modal
        open={open}
        onClose={modalHandler}
        center
        classNames={{
          modal: 'customModal',
          overlay: overlay || 'custom-overlay',
          closeButton: 'close',
          animationIn: 'customEnterAnimation',
          animationOut: 'customLeaveAnimation',
        }}
        animationDuration={400}
        closeIcon={closeIcon}
      >
        <div className='modal-content'>{children}</div>
      </Modal>
    </>
  );
};

export default memo(CustomModal);
