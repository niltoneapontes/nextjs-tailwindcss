import Image from "next/image";
import Logo from "@/assets/logo.png";
import "@/app/globals.css";
import api from "@/api";

export default function Signup() {
  const today = new Date();

  async function onSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("password") !== formData.get("password-confirmation")) {
      alert("Senhas devem ser iguais");
      return;
    }
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
      createdAt: today.toISOString(),
      updatedAt: today.toISOString(),
      roles: formData.get("isAdmin") === "on" ? "admin user" : "user",
    };

    try {
      await api.post("auth/signup", data);
      window.location.pathname = "/login"
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image src={Logo} alt="Bubble Punch logo" width={120}></Image>
      <h1 className="text-yellow-400 font-black text-4xl animation-fadeinUpwards">
        Bubble Punch
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center p-8"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-60 p-4 rounded-md shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          className="w-60 p-4 rounded-md shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700 mt-2"
          required
        />
        <input
          type="password"
          name="password-confirmation"
          id="password-confirmation"
          placeholder="Confirme sua senha"
          className="w-60 p-4 rounded-md shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700 mt-2"
          required
        />
        <label className="w-60 flex items-start space-x-3 mt-4 mb-2">
          <input
            type="checkbox"
            name="isAdmin"
            className="form-checkbox h-6 w-6 text-yellow-600 transition duration-200 ease-in-out"
          />
          <span className="text-white">
            Sou um administrador/gestor (sujeito a aprovação).
          </span>
        </label>
        <button
          type="submit"
          className="w-60 p-4 rounded-md bg-yellow-500 mt-4 hover:opacity-85 transition-all ease-in-out"
        >
          Criar conta
        </button>
      </form>
    </main>
  );
}
