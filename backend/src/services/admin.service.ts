const API_URL = import.meta.env.VITE_API_URL;

export const obtenerDashboardAdmin = async () => {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/admin/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );


  if (!response.ok) {
    throw new Error("Error obteniendo datos del dashboard");
  }


  return await response.json();

};