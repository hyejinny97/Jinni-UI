import { createContext } from 'react';

type ModalContextProps = {
  modalHeaderId: string;
  modalBodyId: string;
};

const ModalContext = createContext<ModalContextProps | null>(null);

export default ModalContext;
