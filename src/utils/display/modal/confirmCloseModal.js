import useCloseModal from "./useCloseModal";

const confirmCloseModal = (
  modalId,
  message = "Discard all changes and close this form?",
  onConfirm = null
) => {
  const confirmed = window.confirm(message);

  if (!confirmed) return false;

  if (typeof onConfirm === "function") {
    onConfirm();
  }

  useCloseModal(modalId);

  return true;
};

export default confirmCloseModal;
