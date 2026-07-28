import { api } from "../api/api";


export const obtenerDashboardAdmin = async()=>{


    return await api(
        "/admin/dashboard"
    );


};