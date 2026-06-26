import { Modal } from "bootstrap";
import React, { useEffect, useMemo } from "react";

const BootstrapModal = ({
  modalId,
  title,
  size = "",
  isValidated = false,
  onClose,

  initial_data,
  form_data,

  footer,
  formSubmit,
  children,
  isStatic,
  confirmMessage = "Discard changes?",

  // Enable/disable unsaved changes protection
}) => {
  const id = modalId || title?.replace(/\s+/g, "") || "BootstrapModal";

  const getModal = () => {
    const el = document.getElementById(id);

    if (!el) return null;

    return {
      el,
      instance: Modal.getOrCreateInstance(el),
    };
  };

  /**
   * Detect unsaved changes.
   */
  const isDirty = useMemo(() => {
    if (!initial_data || !form_data) return false;

    return JSON.stringify(initial_data) !== JSON.stringify(form_data);
  }, [initial_data, form_data]);

  const clearBackdrop = () => {
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("padding-right");
    document.body.style.removeProperty("overflow");
  };

  const closeModal = () => {
    const modal = getModal();

    if (!modal) return;

    modal.instance.hide();

    clearBackdrop();

    onClose?.();
  };

  useEffect(() => {
    const modal = getModal();

    if (!modal) return;

    const handleHide = (event) => {
      if (!isDirty) return;

      const confirmed = window.confirm(confirmMessage);

      if (!confirmed) {
        event.preventDefault();
      }
    };

    modal.el.addEventListener("hide.bs.modal", handleHide);

    return () => {
      modal.el.removeEventListener("hide.bs.modal", handleHide);
    };
  }, [id, isDirty, confirmMessage]);

  const content = () => {
    return (
      <>
        <div className="modal-header">
          <h1 className="modal-title fs-5" id={`${id}-label`}>
            {title || "Bootstrap Modal"}
          </h1>

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={closeModal}
          />
        </div>

        <div className="modal-body">
          {typeof children === "function"
            ? children({ closeModal, isDirty })
            : children}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal}>
            Close
          </button>

          {footer}
        </div>
      </>
    );
  };

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}-label`}
      aria-hidden="true"
      data-bs-backdrop={`${isStatic && "static"}`}
      data-bs-keyboard={isStatic && false}>
      <div className={`modal-dialog ${size}`}>
        <div className="modal-content">
          {formSubmit ? (
            <form
              className={`m-0 p-0 ${
                isValidated === true
                  ? "was-validated"
                  : isValidated === false
                  ? "needs-validation"
                  : ""
              }`}
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                formSubmit();
              }}>
              {content()}
            </form>
          ) : (
            content()
          )}
        </div>
      </div>
    </div>
  );
};

export default BootstrapModal;
