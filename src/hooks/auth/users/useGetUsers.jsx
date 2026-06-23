import { useEffect, useState } from "react";
import axios from "axios";
import delay from "../../../utils/display/delay";

const API_URL = "http://localhost:5000/api/user";

const useGetUsers = ({ id, role } = {}) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const params = {};

      if (id) params.id = id;
      if (role) params.role = role;

      const response = await axios.get(API_URL, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await delay();
      if (id) {
        setUser(response.data.user);
      } else {
        setUsers(response.data.users);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [id, role]);

  return {
    user,
    users,
    loading,
    error,
    refresh: getUsers,
  };
};

export default useGetUsers;
