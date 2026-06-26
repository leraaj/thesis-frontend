import { useEffect, useState } from "react";
import axios from "axios";
import delay from "../../../utils/display/delay";

const useAddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setError] = useState(null);

  const addUser = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:5000/api/user/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await delay();
      if (response) {
        alert(response.data.message);
      }
      if (response.data.errors) {
        setError(response.data.errors);
      }
      return response.data.user;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Failed to update user";

      setError(err.response?.data?.errors);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetErrors = () => {
    setError({});
  };

  return {
    addUser,
    isLoading,
    errors,
    resetErrors,
  };
};

export default useAddUser;
