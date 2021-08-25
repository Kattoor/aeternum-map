import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import Modal from '../components/Modal/Modal';

type ModalData = {
  title: string;
  children: ReactNode;
};
type ModalContextProps = {
  modals: ModalData[];
  addModal: (modal: ModalData) => void;
};
const ModalContext = createContext<ModalContextProps>({
  modals: [],
  addModal: () => undefined,
});

type ModalProviderProps = {
  children: ReactNode;
};

export function ModalProvider({ children }: ModalProviderProps): JSX.Element {
  const [modals, setModals] = useState<ModalData[]>([]);

  function addModal(modal: ModalData) {
    setModals((modals) => [...(modals || null), modal]);
  }

  function handleClose() {
    const newModals = [...modals];
    newModals.pop();
    setModals(newModals);
  }

  const latestModal = modals[modals.length - 1];

  return (
    <ModalContext.Provider value={{ modals, addModal }}>
      {children}
      {latestModal && (
        <Modal title={latestModal.title} onClose={handleClose}>
          {latestModal.children}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextProps {
  return useContext(ModalContext);
}
