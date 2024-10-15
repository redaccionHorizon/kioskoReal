import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase"; // Asegúrate de importar Firestore
import { collection, query, where, getDocs } from "firebase/firestore"; // Para obtener datos de Firestore

const HomePage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        const data = docs.docs[0]?.data();
        if (data) {
          setFullName(data.fullName || ""); // Obtén el campo fullName de Firestore
        }
      }
    };

    if (!loading && user) {
      fetchUserName();
    }

    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  return (
    <div className="-z-10">
      {error && <div>{error.message}</div>}
      <div className="flex items-center justify-between py-4">
        <Link to={"/profile"}>
          <button className="bg-purple-700 text-white text-xs sm:text-base px-5 py-2 rounded-full">
            Perfil
          </button>
        </Link>{" "}
        <button
          onClick={logout}
          className="bg-purple-700 text-white text-xs sm:text-base rounded-full py-2 px-5"
        >
          Cerrar sesión
        </button>
      </div>
      <div className="border-[1px] border-gray-300" />
      <h1 className="text-purple-700 p-3 mt-3 text-center text-base xs:text-xl font-black">
        Hola {fullName}
      </h1>

      <div className="mt-5">
        <h2 className="text-2xl text-center">Aquí irá la revista</h2>
      </div>
    </div>
  );
};

export default HomePage;
