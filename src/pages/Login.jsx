import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { auth, signInWithGithub, signInWithGoogle } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [Data, setData] = useState(initialState);
  const { password, email } = Data;
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("¡Se requiere el correo electrónico!");
    } else if (password === "") {
      toast.error("¡Se requiere la contraseña!");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log(userCredentials);
        })
        .catch((err) => {
          if (err.code === "auth/invalid-email") {
            toast.error("¡Correo electrónico inválido!");
          }
          if (err.code === "auth/user-not-found") {
            toast.error("¡Usuario no registrado!");
          }
          if (err.code === "auth/wrong-password") {
            toast.error("¡Contraseña incorrecta!");
          }
          if (err.code === "auth/too-many-requests") {
            toast.error("¡Demasiados intentos, por favor inténtalo más tarde!");
          }
        });
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="flex items-center justify-between text-purple-500 font-bold mt-5 p-1">
        <Link to={"/register"}>
          <div className="cursor-pointer flex items-center text-xs">
            <MdArrowBackIos />
            Volver al registro
          </div>
        </Link>
        <div className="cursor-pointer text-xs">¿Necesitas ayuda?</div>
      </div>

      <h1 className="text-2xl text-gray-800 text-center font-medium mt-5 p-2">
        Iniciar sesión
      </h1>
      <p className="text-gray-500 leading-5 text-center mb-2">
        Inicia sesión para continuar
      </p>
      {error && <div className="my-4 text-center"> {error.message} </div>}
      <form
        onSubmit={handlesubmit}
        className="flex flex-col justify-center items-center"
      >
        <label className="relative">
          <input
            type="text"
            name="email"
            value={email}
            id="email"
            onChange={handleChange}
            className="my-2 mx-1 w-[270px] h-[30px] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {email ? "" : "Correo electrónico"}
          </span>
        </label>
        <label className="relative">
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={handleChange}
            className="my-2 mx-1 w-[270px] h-[30px] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
          />
          <span className="absolute w-[80px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
            {password ? "" : "Contraseña"}
          </span>
        </label>
        <button
          type="submit"
          className="w-[270px] h-[30px] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0  bg-purple-700 text-white text-base font-medium md:font-semibold rounded-full mt-5 md:mt-4"
        >
          Enviar
        </button>
      </form>
      <ToastContainer />
      <div className="flex items-center justify-center mt-5 text-gray-500">
        <div className="border-[1px] w-[200px] border-gray-300 mr-1" />
        O
        <div className="border-[1px] w-[200px] border-gray-300 ml-1"></div>
      </div>
      <div className="flex flex-col items-center">
        <button
          type="submit"
          className="w-[270px] h-[30px] sm:w-[360px] sm:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 bg-gray-100 text-black text-base font-medium rounded-full mt-5 md:mt-4 flex items-center justify-center"
          onClick={() => signInWithGoogle()}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2991/2991148.png"
            alt="google"
            className="h-[25px] md:h-[28px] mr-[6px]"
          />
          Iniciar sesión con Google
        </button>
        <button
          type="submit"
          className="w-[270px] h-[30px] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 bg-white border-gray-200 border-[2px] text-base font-medium rounded-full my-5 md:mt-4 flex items-center justify-center"
          onClick={() => signInWithGithub()}
        >
          <img
            src={require("../assets/Github.png")}
            alt="Github"
            className="h-[30px] sm:h-[36px] mr-[2px]"
          />
          Iniciar sesión con Github
        </button>
        <div className="text-gray-600 mt-2 mb-5">
          ¿No tienes una cuenta?{" "}
          <Link to={"/register"}>
            <span className="text-purple-500 font-medium">Regístrate aquí</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
