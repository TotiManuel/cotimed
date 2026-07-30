import { Outlet } from "react-router-dom";
import Header from "../components/header";


const PublicLayout = () => {


  return (

    <>

      <Header />


      <main className="pt-24">

        <Outlet />

      </main>


    </>

  );


};


export default PublicLayout;