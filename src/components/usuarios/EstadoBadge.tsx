interface Props{

    estado:string;

}

const colores={

    ACTIVO:
    "bg-green-100 text-green-700",

    PENDIENTE:
    "bg-yellow-100 text-yellow-700",

    SUSPENDIDO:
    "bg-red-100 text-red-700"

} as const;

const EstadoBadge = ({
    estado
}:Props)=>{

    return(

        <span

            className={`

                rounded-full

                px-3

                py-1

                text-sm

                font-medium

                ${

                    colores[
                        estado as keyof typeof colores
                    ] ||

                    "bg-slate-100"

                }

            `}

        >

            {estado}

        </span>

    );

};

export default EstadoBadge;