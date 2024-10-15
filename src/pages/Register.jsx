import React, { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, signInWithGoogle, signInWithGithub } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; // Firestore para guardar los datos
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [age, setAge] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (fullName === "") {
      toast.error("¡Se requiere el nombre completo!");
    } else if (password === "") {
      toast.error("¡Se requiere la contraseña!");
    } else if (password.length < 8) {
      toast.error("¡La contraseña debe tener al menos 8 caracteres!");
    } else if (email === "") {
      toast.error("¡Se requiere un correo electrónico!");
    } else if (address === "") {
      toast.error("¡Se requiere la dirección!");
    } else if (profession === "") {
      toast.error("¡Se requiere la profesión!");
    } else if (age === "") {
      toast.error("¡Se requiere la edad!");
    } else {
      try {
        // Crea el usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guarda los datos adicionales en Firestore
        await addDoc(collection(db, "users"), {
          fullName,
          email,
          address,
          profession,
          age,
          userType: "normal", // Asigna automáticamente "normal" como tipo de usuario
          uid: user.uid,
          timestamp: serverTimestamp(),
        });

        toast.success("Registro exitoso. Redirigiendo a la página principal...");
        setTimeout(() => {
          navigate("/"); // Redirige a la página principal (HomePage)
        }, 2000);

      } catch (err) {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          toast.error("¡El correo ya está registrado, inicia sesión para continuar!");
        } else {
          toast.error("Error al registrarse, por favor intente de nuevo.");
        }
      }
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/"); // Redirige si el usuario ya está logueado
    }
  }, [user, loading, navigate]);

  return (
    <div className="max-w-[100%] mx-auto">
      <div className="flex items-center justify-between text-purple-500 font-bold mt-5 p-1">
        <Link to={"/login"}>
          <div className="cursor-pointer flex items-center text-xs">
            <MdArrowBackIos />
            Volver al inicio de sesión
          </div>
        </Link>

        <div className="cursor-pointer text-xs">¿Necesitas ayuda?</div>
      </div>
      <h1 className="text-2xl text-gray-800 font-medium text-center mt-5 p-2">
        Registro
      </h1>
      <p className="text-gray-500 leading-5 mb-2 text-center">
        Completa los detalles para registrarte
      </p>
      {error && <div className="my-4 text-center"> {error.message} </div>}
      <form
        onSubmit={handlesubmit}
        className="flex flex-col justify-center items-center"
      >
        <label className="relative">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {fullName ? "" : "Nombre Completo"}
          </span>
        </label>
        <label className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className=" absolute top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {email ? "" : "Correo Electrónico"}
          </span>
        </label>
        <label className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[80px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {password ? "" : "Contraseña"}
          </span>
        </label>

        {/* Input para la dirección */}
        <label className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {address ? "" : "Dirección"}
          </span>
        </label>

        {/* Input para la profesión */}
        <label className="relative">
          <input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {profession ? "" : "Profesión"}
          </span>
        </label>

        {/* Input para la edad */}
        <label className="relative">
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[80px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {age ? "" : "Edad"}
          </span>
        </label>

        <button
          type="submit"
          className="w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] bg-purple-500 hover:bg-purple-700 p-2 md:p-0 text-white text-base rounded-full mt-5 md:mt-4"
        >
          Registrarse
        </button>
        <ToastContainer />
      </form>

      <div className="flex items-center justify-center mt-5 text-gray-500">
        <div className="border-[1px] w-[200px] border-gray-300 mr-1" />
        O
        <div className="border-[1px] w-[200px] border-gray-300 ml-1"></div>
      </div>
      <div className="flex flex-col items-center">
        <button
          type="button"
          className="w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 bg-white border-gray-200 border-[2px] text-base font-medium rounded-full mt-5 md:mt-4 flex items-center justify-center"
          onClick={() => signInWithGoogle()}
        >
          <img
            src={require("../assets/Google.png")}
            alt="google"
            className="h-[25px] md:h-[28px] mr-[6px]"
          />
          Con Google
        </button>
        <button
          type="button"
          className="w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 bg-gray-100 border-[2px] text-base font-medium rounded-full my-5 md:mt-4 flex items-center justify-center"
          onClick={() => signInWithGithub()}
        >
          <img
            src={require("../assets/Github.png")}
            alt="github"
            className="h-[30px] sm:h-[36px] mr-[2px]"
          />
          Con Github
        </button>
        <div className="text-gray-600 mt-2 mb-5">
          ¿Ya tienes una cuenta?{" "}
          <Link to={"/login"}>
            <span className="text-purple-500 font-medium">Inicia sesión</span>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;
