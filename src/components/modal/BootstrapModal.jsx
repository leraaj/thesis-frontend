import { Modal } from "bootstrap";
import React, { useEffect, useMemo } from "react";

const BootstrapModal = ({
  modalId,

  title,
  // Controls Bootstrap "static backdrop" behavior.
  // If true, clicking outside won't close modal.
  // Combined with isDirty logic for conditional locking.
  isStatic = false,
  // Optional Bootstrap modal sizing class (e.g., "modal-lg", "modal-sm").
  size = "",
  isValidated = false,
  onClose,

  // Initial form state used for dirty-check comparison.
  initial_data,

  // Current form state used for dirty-check comparison.
  form_data,

  // Optional JSX injected into modal footer.
  footer,
  formSubmit,
  children,
  confirmMessage = "Discard changes?",

  // Enables/disables unsaved-changes protection behavior.
  protectUnsavedChanges = true,
}) => {
  /** Derived modal ID used for DOM lookup and Bootstrap instance binding. */
  const id = modalId || title?.replace(/\s+/g, "") || "BootstrapModal";

  /**
   * Returns the Bootstrap Modal instance for this element.
   * Ensures a single instance is reused instead of creating duplicates.
   */
  const getModal = () => {
    const el = document.getElementById(id);

    if (!el) return null;

    return {
      el,
      instance: Modal.getOrCreateInstance(el),
    };
  };

  /**
   * Determines whether the form has unsaved changes.
   * Uses deep comparison via JSON serialization (simple but not perfect).
   */
  const isDirty = useMemo(() => {
    if (!form_data || !initial_data) return false;
    return JSON.stringify(form_data) !== JSON.stringify(initial_data);
  }, [form_data, initial_data]);

  /**
   * Manually cleans leftover Bootstrap artifacts:
   * - modal-backdrop overlay
   * - body scroll locking
   *
   * Used after programmatic modal close to prevent UI desync.
   */
  const clearBackdrop = () => {
    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("padding-right");
    document.body.style.removeProperty("overflow");
  };

  /**
   * Programmatically closes the modal.
   * Ensures Bootstrap instance is used instead of direct DOM manipulation.
   * Also triggers optional onClose callback.
   */
  const closeModal = () => {
    const modal = getModal();

    if (!modal) return;

    modal.instance.hide();

    clearBackdrop();

    onClose?.();
  };

  /**
   * Bootstrap lifecycle hook:
   * Fires BEFORE modal fully closes.
   *
   * Used here to prevent closing when:
   * - unsaved changes exist
   * - protection is enabled
   *
   * If user cancels confirmation, modal close is blocked.
   */
  useEffect(() => {
    const modal = getModal();

    if (!modal) return;

    const handleHide = (event) => {
      if (!protectUnsavedChanges || !isDirty || !isStatic) return;

      if (!window.confirm(confirmMessage)) {
        event.preventDefault();
      }
    };

    modal.el.addEventListener("hide.bs.modal", handleHide);

    return () => {
      modal.el.removeEventListener("hide.bs.modal", handleHide);
    };
  }, [id, isDirty, confirmMessage, protectUnsavedChanges, isStatic]);

  const content = () => {
    return (
      <>
        {/* Header Section */}
        <div className="modal-header">
          <h1 className="modal-title fs-5" id={`${id}-label`}>
            {title || "Bootstrap Modal"}
          </h1>

          {/* Manual close trigger (X button) */}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={closeModal}
          />
        </div>
        {/* Body Section */}
        <div className="modal-body">
          {/* <span>{`isDirty=${isDirty}, isStatic=${isStatic}`}</span>  */}
          {/* <pre>{`INITAL:`}</pre>
    <pre>{initial_data && JSON.stringify(initial_data, null, 2)}</pre> */}
          {/* <pre>{`FORM:`}</pre>
    <pre>{form_data && JSON.stringify(form_data, null, 2)}</pre> */}
          {typeof children === "function"
            ? children({ closeModal, isDirty })
            : children}
        </div>
        {/* Footer Section */}
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
      data-bs-backdrop={isStatic ? (isDirty ? "static" : undefined) : undefined}
      data-bs-keyboard={isStatic ? (isDirty ? "false" : undefined) : undefined}
      aria-hidden="true">
      <div className={`modal-dialog ${size}`}>
        <div className="modal-content">
          {formSubmit ? (
            <form
              className={`m-0 p-0 ${
                isValidated == true
                  ? "is-validated"
                  : isValidated == false
                  ? "needs-validation"
                  : ""
              }`}
              {...(isValidated || !isValidated ? { noValidate: true } : {})}
              onSubmit={(e) => {
                e.preventDefault();
                formSubmit();
              }}>
              {content()}
            </form>
          ) : (
            <>{content()}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default BootstrapModal;
