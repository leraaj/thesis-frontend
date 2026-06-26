import React from "react";
import BootstrapModal from "../../components/modal/BootstrapModal";

const AccountsDelete = ({ initialData, formData, selectedId, resetForm }) => {
  return (
    <BootstrapModal
      modalId={"DeleteModal"}
      title={"Delete this user?"}
      onClose={resetForm}>
      Are you sure you want to delete this{" "}
      <strong>{formData?.firstName + ", " + formData?.lastName}</strong>?
    </BootstrapModal>
  );
};

export default AccountsDelete;
