import React, { FunctionComponent, useEffect } from 'react';
import FocusLock from "react-focus-lock";
import ReactDOM from 'react-dom';

import {
    Wrapper,
    Header,
    StyledModal,
    HeaderText,
    CloseButton,
    Content,
    Backdrop
  } from "./modal.style";

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  modalContent: JSX.Element;
  headerText: string;
}

export const ModalC2C: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  modalContent,
  headerText,
}) => {
  const modal = (
    <React.Fragment>
       <Backdrop onClick={hide} />
      <FocusLock>
        <Wrapper
          aria-modal
          aria-labelledby={headerText}
          tabIndex={-1}
          role="dialog"
        >
          <StyledModal>
            <Header>
              <HeaderText>{headerText}</HeaderText>
              <CloseButton onClick={hide}>X</CloseButton>
            </Header>
            <Content>{modalContent}</Content>
          </StyledModal>
        </Wrapper>
      </FocusLock>
    </React.Fragment>
  );

  return isShown ?ReactDOM.createPortal(modal, document.body) : <></>;
};