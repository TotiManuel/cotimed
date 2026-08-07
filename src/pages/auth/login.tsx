import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../../context/AuthContext";


const Login =()=>{


    const {
        login
    } = useAuth();


    const navigate = useNavigate();


    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");



    const handleSubmit = async(
        e:React.FormEvent
    )=>{


        e.preventDefault();


        try{


            await login(
                email,
                password
            );


            navigate("/");


        }catch(error){


            console.log(
                "Error login",
                error
            );


        }


    };



    return null;

};


export default Login;