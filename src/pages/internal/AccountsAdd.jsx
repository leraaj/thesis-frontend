import React, { useEffect, useState } from "react";
import BootstrapModal from "../../components/modal/BootstrapModal";
import useAddUser from "../../hooks/auth/users/useAddUser";

const AccountsAdd = ({
  initialData,
  formData,
  handleChange,
  setSelectedId,
  resetForm,
  setUsers,
}) => {
  const { addUser, isLoading, errors, resetErrors } = useAddUser();
  const [showPassword, setShowPassword] = useState(false);

  const addData = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };
  const handleUpdate = async () => {
    try {
      const result = await addUser(formData);
      // optional cleanup
      resetForm();

      // const { _id, firstName, lastName, email, contact, username, role } = result;
      await addData(result);
      setSelectedId(_id);
    } catch (err) {
      console.errors("Update failed:", err);
    }
  };

  const forms = [
    { type: "text", name: "firstName", label: "First name" },
    { type: "text", name: "lastName", label: "Last name" },
    { type: "email", name: "email", label: "Email" },
    { type: "text", name: "contact", label: "Contact" },
    { type: "text", name: "username", label: "Username" },
    {
      type: "password",
      name: "password",
      label: "Password",
      required: false,
      placeholder: "new password",
    },
    {
      type: "select",
      name: "role",
      label: "Role",

      options: (
        <>
          <option value="">Select role</option>
          <option className="text-capitalize" value="admin">
            admin
          </option>
          <option className="text-capitalize" value="client">
            client
          </option>
          <option className="text-capitalize" value="applicant">
            applicant
          </option>
        </>
      ),
    },
  ];
  // useEffect(() => {
  //   if (errors) {
  //     alert(JSON.stringify(errors) + "YOW");
  //   }
  // }, [errors]);

  return (
    <BootstrapModal
      modalId="AddModal"
      title="Create new user"
      initial_data={initialData}
      form_data={formData}
      formSubmit={handleUpdate}
      isStatic
      onClose={() => {
        resetForm();
        resetErrors();
      }}
      isValidated={false}
      size="modal-lg"
      footer={
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <div className="spinner-grow spinner-grow-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Save changes"
          )}
        </button>
      }>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-column gap-2">
          {forms.map((field, index) => {
            if (field.type === "select") {
              return (
                <div key={index} className="input-group">
                  <label
                    key={field.label}
                    className="input-group-text"
                    htmlFor={field.name}>
                    {field.label}
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    className={`form-select rounded-end ${
                      errors?.[field.name] && "is-invalid"
                    } `}
                    value={formData[field.name] ?? ""}
                    onChange={(e) => handleChange(e)}
                    disabled={isLoading}
                    required>
                    {field?.options}
                  </select>
                  <div className="invalid-feedback">{`${
                    errors?.[field.name]
                  }`}</div>
                </div>
              );
            }

            if (field.type === "password") {
              return (
                <div key={index} className="input-group">
                  <label
                    key={field.label}
                    className="input-group-text"
                    htmlFor={field.name}>
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type={showPassword ? "text" : "password"}
                    name={field.name}
                    className={`form-control  ${
                      errors?.[field.name] && "is-invalid"
                    } `}
                    value={formData[field.name] ?? ""}
                    // placeholder={`new ${field.name}`}
                    onChange={(e) => handleChange(e)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    key={field.name}
                    type="button"
                    className={`btn btn${
                      showPassword ? `-outline-dark` : `-dark`
                    } text-nowrap input-group-text rounded-end `}
                    onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? "hide" : "show"}
                  </button>
                  <div className="invalid-feedback">{`${
                    errors?.[field.name]
                  }`}</div>
                </div>
              );
            }

            return (
              <div key={index} className="input-group mb-2">
                <div className="input-group-text">
                  <label key={field.label} htmlFor={field.name}>
                    {field.label}
                  </label>
                </div>
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  // placeholder={field.name}
                  value={formData[field.name] ?? ""}
                  onChange={(e) => handleChange(e)}
                  disabled={isLoading}
                  className={`form-control rounded-end  ${
                    errors?.[field.name] && "is-invalid"
                  } `}
                  required
                />
                <div className="invalid-feedback">{`${
                  errors?.[field.name]
                }`}</div>
              </div>
            );
          })}
        </div>
      </div>
    </BootstrapModal>
  );
};

export default AccountsAdd;
