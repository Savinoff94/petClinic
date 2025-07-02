import { useReducer } from 'react';

type ModalState = {
  patientId: string | null;
  isOpen: boolean;
};

type ModalAction =
  | { type: 'OPEN_MODAL'; payload?: string | null }
  | { type: 'CLOSE_MODAL' };

const initialState: ModalState = {
  patientId: null,
  isOpen: false,
};

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { patientId: action.payload ?? null, isOpen: true };
    case 'CLOSE_MODAL':
      return { patientId: null, isOpen: false };
    default:
      return state;
  }
};

export function usePatientModal() {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (id?: string | null) => {
    dispatch({ type: 'OPEN_MODAL', payload: id });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return {
    isOpen: state.isOpen,
    patientId: state.patientId,
    openModal,
    closeModal,
  };
}