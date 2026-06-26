import React, { useEffect, useMemo, useState } from "react";
import useGetUsers from "../../hooks/auth/users/useGetUsers";
import useFormData from "../../utils/inputs/useFormData";
import AccountsUpdate from "./AccountsUpdate";
import AccountsDelete from "./AccountsDelete";
import AccountsAdd from "./AccountsAdd";
import TableComponent from "../../components/table/TableComponent";
export const INITIAL_ACCOUNTS_FORM = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  username: "",
  password: "",
  role: "",
};

const Accounts = () => {
  const { users: apiUsers, loading: usersLoading } = useGetUsers();

  // Local state
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  // Sync once whenever API data changes
  useEffect(() => {
    setUsers(apiUsers);
  }, [apiUsers]);

  const { formData, handleChange, setFormData, resetForm } = useFormData(
    INITIAL_ACCOUNTS_FORM
  );

  const tableUsers = useMemo(() => {
    return users.map((user) => ({
      ...user,
      fullName: `${user.firstName}, ${user.lastName}`,
    }));
  }, [users]);

  const columns = [
    {
      key: "fullName",
      label: "Full Name",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "contact",
      label: "Contact",
      sortable: false,
    },
    {
      key: "role",
      label: "Role",
      sortable: false,
      filter: ["admin", "client", "applicant"],
    },
  ];
  const searchKeys = ["fullName", "email", "contact", "role"];
  const openUpdate = (user) => {
    setSelectedId(user._id);

    setFormData({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contact: user.contact,
      username: user.username,
      role: user.role,
    });

    document.getElementById("UpdateModalButton")?.click();
  };
  const openDelete = (user) => {
    setSelectedId(user._id);

    setFormData({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      contact: user.contact,
      username: user.username,
      role: user.role,
    });

    new bootstrap.Modal(document.getElementById("DeleteModal")).show();
  };
  return (
    <div className="col-12 py-3 overflow-auto">
      <TableComponent
        title="Users"
        loading={usersLoading}
        data={tableUsers}
        columns={columns}
        searchKeys={searchKeys}
        itemsPerPage={10}
        toolbar={
          <>
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#AddModal">
              Add User
            </button>
          </>
        }
        actions={(user) => (
          <div className="d-flex gap-1">
            <button
              className="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#UpdateModal"
              onClick={() => {
                openUpdate(user);
              }}>
              Update
            </button>

            <button
              className="btn btn-danger btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#DeleteModal"
              onClick={() => {
                openDelete(user);
              }}>
              Delete
            </button>
          </div>
        )}
      />

      <AccountsAdd
        initialData={INITIAL_ACCOUNTS_FORM}
        formData={formData}
        setSelectedId={setSelectedId}
        handleChange={handleChange}
        resetForm={resetForm}
        setUsers={setUsers}
      />

      <AccountsUpdate
        initialData={INITIAL_ACCOUNTS_FORM}
        formData={formData}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        handleChange={handleChange}
        resetForm={resetForm}
        setUsers={setUsers}
      />

      <AccountsDelete
        initialData={INITIAL_ACCOUNTS_FORM}
        formData={formData}
        selectedId={selectedId}
        resetForm={resetForm}
        setUsers={setUsers}
      />
    </div>
  );
};

export default Accounts;
