import { type FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    crearProveedor,
} from "../../../services/proveedores.service";


const AddProveedor = () => {

    const navigate = useNavigate();


    const [name_user, setNameUser] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [organizacion, setOrganizacion] =
        useState("");


    const [error, setError] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");

    const [cargando, setCargando] =
        useState(false);


    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setError("");
        setMensaje("");


        /*
         * Validaciones
         */

        if (!name_user.trim()) {

            setError(
                "El nombre del usuario es obligatorio"
            );

            return;
        }


        if (!email.trim()) {

            setError(
                "El email es obligatorio"
            );

            return;
        }


        if (!password) {

            setError(
                "La contraseña es obligatoria"
            );

            return;
        }


        if (password.length < 6) {

            setError(
                "La contraseña debe tener al menos 6 caracteres"
            );

            return;
        }


        if (!organizacion.trim()) {

            setError(
                "La organización es obligatoria"
            );

            return;
        }


        try {

            setCargando(true);


            const proveedor =
                await crearProveedor({

                    name_user:
                        name_user.trim(),

                    email:
                        email.trim(),

                    password,

                    organizacion:
                        organizacion.trim(),

                });


            console.log(
                "Proveedor creado:",
                proveedor
            );


            setMensaje(
                "Proveedor creado correctamente"
            );


            /*
             * Limpiar formulario
             */

            setNameUser("");
            setEmail("");
            setPassword("");
            setOrganizacion("");


            /*
             * Volver al listado después
             * de un momento.
             */

            setTimeout(() => {

                navigate(
                    "/admin/proveedores"
                );

            }, 1000);


        } catch (error: any) {

            console.error(
                "Error creando proveedor:",
                error
            );


            setError(
                error?.mensaje ||
                error?.message ||
                "No se pudo crear el proveedor"
            );


        } finally {

            setCargando(false);

        }
    };


    return (

        <div
            style={{
                maxWidth: "700px",
                margin: "0 auto",
                padding: "30px",
            }}
        >

            <h1>
                Agregar proveedor
            </h1>


            <p>
                Crear una nueva cuenta de proveedor
                para CotiMed.
            </p>


            {error && (

                <div
                    style={{
                        padding: "12px",
                        marginBottom: "20px",
                        backgroundColor: "#fee2e2",
                        color: "#991b1b",
                        borderRadius: "8px",
                    }}
                >
                    {error}
                </div>

            )}


            {mensaje && (

                <div
                    style={{
                        padding: "12px",
                        marginBottom: "20px",
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                        borderRadius: "8px",
                    }}
                >
                    {mensaje}
                </div>

            )}


            <form
                onSubmit={handleSubmit}
            >

                {/* NOMBRE */}

                <div
                    style={{
                        marginBottom: "20px",
                    }}
                >

                    <label>
                        Nombre de usuario
                    </label>

                    <input
                        type="text"
                        value={name_user}
                        onChange={(e) =>
                            setNameUser(e.target.value)
                        }
                        placeholder="Ej: Juan Pérez"
                        disabled={cargando}
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                        }}
                    />

                </div>


                {/* EMAIL */}

                <div
                    style={{
                        marginBottom: "20px",
                    }}
                >

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="proveedor@empresa.com"
                        disabled={cargando}
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                        }}
                    />

                </div>


                {/* CONTRASEÑA */}

                <div
                    style={{
                        marginBottom: "20px",
                    }}
                >

                    <label>
                        Contraseña
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Mínimo 6 caracteres"
                        disabled={cargando}
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                        }}
                    />

                </div>


                {/* ORGANIZACIÓN */}

                <div
                    style={{
                        marginBottom: "25px",
                    }}
                >

                    <label>
                        Organización / Empresa
                    </label>

                    <input
                        type="text"
                        value={organizacion}
                        onChange={(e) =>
                            setOrganizacion(e.target.value)
                        }
                        placeholder="Ej: MedEquip S.A."
                        disabled={cargando}
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                        }}
                    />

                </div>


                {/* BOTONES */}

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/proveedores"
                            )
                        }
                        disabled={cargando}
                    >
                        Cancelar
                    </button>


                    <button
                        type="submit"
                        disabled={cargando}
                    >

                        {cargando
                            ? "Creando..."
                            : "Crear proveedor"
                        }

                    </button>

                </div>

            </form>

        </div>
    );
};


export default AddProveedor;