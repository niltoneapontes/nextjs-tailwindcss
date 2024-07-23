import Image from "next/image";
import Logo from "@/assets/logo.png";
import "@/app/globals.css";
import Link from "next/link";
import api from "@/api";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter()

  async function onSubmit(e: any) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      const {data: {"access_token": token}} = await api.post("auth/login", data);
      localStorage.setItem("@bubblePunch/token", token)
      router.push("/punch")
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
        <button
          type="submit"
          className="w-60 p-4 rounded-md bg-yellow-500 mt-4 hover:opacity-85 transition-all ease-in-out"
        >
          Entrar
        </button>
        <Link
          href="/signup"
          className="w-60 p-4 rounded-md cursor-pointer text-center"
        >
          Criar conta
        </Link>
      </form>
    </main>
  );
}
