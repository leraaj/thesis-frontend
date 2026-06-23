import { useState } from "react";
import axios from "axios";
import delay from "../../../utils/display/delay";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (id, formData) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/user/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await delay();
      return response.data.user;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to update user";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUser,
    loading,
    error,
  };
};

export default useUpdateUser;
