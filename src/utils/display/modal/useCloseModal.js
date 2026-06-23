import { Modal } from "bootstrap";

const useCloseModal = (modalId) => {
  const modalElement = document.getElementById(modalId);

  if (!modalElement) return;

  let modal = Modal.getInstance(modalElement);

  if (!modal) {
    modal = new Modal(modalElement);
  }

  modal.hide();

  document
    .querySelectorAll(".modal-backdrop")
    .forEach((backdrop) => backdrop.remove());

  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("padding-right");
  document.body.style.removeProperty("overflow");
};

export default useCloseModal;
