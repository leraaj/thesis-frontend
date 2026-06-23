import React, { useEffect, useMemo, useState } from "react";
import useGetUsers from "../../hooks/auth/users/useGetUsers";
import { Modal } from "bootstrap";
import useCloseModal from "../../utils/display/modal/useCloseModal";
import confirmCloseModal from "../../utils/display/modal/confirmCloseModal";
import useFormData from "../../utils/inputs/useFormData";
import BootstrapModal from "../../components/modal/BootstrapModal";
import useUpdateUser from "../../hooks/auth/users/useUpdateUser";

const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  username: "",
  role: "",
};

const Accounts = () => {
  const { users, loading: usersLoading } = useGetUsers();
  const { updateUser, loading: updateLoading } = useUpdateUser();
  const [selectedId, setSelectedId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState("");

  const { formData, handleChange, setFormData, resetForm } =
    useFormData(INITIAL_FORM_DATA);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = search.toLowerCase();

      return (
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.role.toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);
  const handleUpdate = async () => {
    try {
      const result = await updateUser(selectedId, formData);
      // optional cleanup
      resetForm();

      const { firstName, lastName, email, contact, username, role } = result;
      setFormData({
        firstName,
        lastName,
        email,
        contact,
        username,
        role,
      });
      setSelectedId(result?._id);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };
  return (
    <div className="col-12 py-3 overflow-auto">
      <div className="col-12 d-flex align-items-center justify-content-around gap-3 py-2">
        <pre className="col">Users</pre>

        <div className="col-6">
          <input
            type="text"
            name="search"
            className="form-control"
            placeholder="Search users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-auto">
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#AddModal"
            onClick={resetForm}>
            Add
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-sm table-bordered align-middle">
          <thead>
            <tr>
              <th className="col">Full name</th>
              <th className="col">Email</th>
              <th className="col">Contact</th>
              <th className="col">Role</th>
              <th className="col-1 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {usersLoading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{`${user.firstName}, ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td>{user.role}</td>

                  <td className="d-flex gap-1">
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#UpdateModal"
                      onClick={() => {
                        const {
                          firstName,
                          lastName,
                          email,
                          contact,
                          username,
                          role,
                        } = user;
                        setSelectedId(user._id);
                        setFormData({
                          firstName,
                          lastName,
                          email,
                          contact,
                          username,
                          role,
                        });
                      }}>
                      Update
                    </button>

                    <button
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#DeleteModal"
                      onClick={() => setSelectedId(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* <!-- Add Modal --> */}
      <BootstrapModal
        modalId="AddModal"
        title="Add User"
        initial_data={INITIAL_FORM_DATA}
        form_data={formData}
        isStatic={formData != INITIAL_FORM_DATA}
        isValidated={true}
        onClose={resetForm}>
        <div className="d-flex flex-column gap-2">
          <div className="col">
            <input
              type="text"
              name="firstName"
              placeholder="firstName"
              value={formData.firstName ?? ""}
              onChange={(e) => {
                handleChange(e);
              }}
              className={`form-control`}
              required
            />
          </div>
          <input
            type="text"
            name="lastName"
            placeholder="lastName"
            value={formData.lastName ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            className="form-control"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            value={formData.email ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            className="form-control"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="contact"
            value={formData.contact ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            className="form-control"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            className="form-control"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            className="form-control"
            required
          />
          <select
            name="role"
            className="form-select"
            value={formData.role ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            required>
            <option value="">Select role</option>
            <option value="admin">admin</option>
            <option value="client">client</option>
            <option value="applicant">applicant</option>
          </select>
        </div>
      </BootstrapModal>
      {/* <!-- Update Modal --> */}
      <BootstrapModal
        modalId="UpdateModal"
        title="Update User"
        initial_data={INITIAL_FORM_DATA}
        form_data={formData}
        formSubmit={handleUpdate}
        onClose={resetForm}
        footer={
          <button
            type="submit"
            className="btn btn-primary"
            disabled={updateLoading}>
            {updateLoading ? (
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Save changes"
            )}
          </button>
        }>
        <div className="d-flex flex-column gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="firstName"
            value={formData.firstName ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            disabled={updateLoading}
            className="form-control"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="lastName"
            value={formData.lastName ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            disabled={updateLoading}
            className="form-control"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            value={formData.email ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            disabled={updateLoading}
            className="form-control"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="contact"
            value={formData.contact ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            disabled={updateLoading}
            className="form-control"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            disabled={updateLoading}
            className="form-control"
            required
          />
          <div className="btn-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              value={formData.password ?? ""}
              placeholder="new password"
              onChange={(e) => {
                handleChange(e);
              }}
              disabled={updateLoading}
            />
            <button
              type="button"
              className="btn btn-outline-dark text-nowrap"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "hide" : "show"}
            </button>
          </div>
          <select
            className="form-select"
            value={formData.role ?? ""}
            onChange={(e) => {
              handleChange(e);
            }}
            disabled={updateLoading}
            required>
            <option value="">Select role</option>
            <option value="admin">admin</option>
            <option value="client">client</option>
            <option value="applicant">applicant</option>
          </select>
        </div>
      </BootstrapModal>
      {/* <!-- Delete Modal --> */}
      <BootstrapModal
        modalId={"DeleteModal"}
        title={"Delete this user?"}
        size="modal-sm">
        Are you sure you want to delete this user?
      </BootstrapModal>
    </div>
  );
};

export default Accounts;
