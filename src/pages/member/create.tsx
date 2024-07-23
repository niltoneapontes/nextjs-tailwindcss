import Image from "next/image";
import Logo from "@/assets/logo.png";
import "@/app/globals.css";
import api from "@/api";

export default function CreateMember() {
  const today = new Date();

  async function onSubmit(e: any) {
    e.preventDefault();
    const token = localStorage.getItem("@bubblePunch/token");
    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      userId: formData.get("userId"),
      role: formData.get("role"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      birthdate: formData.get("birthdate"),
      pix: formData.get("pix"),
      createdAt: today.toISOString(),
      updatedAt: today.toISOString(),
    };

    try {
      await api.post("members", data, {
        headers: { 
          'Authorization': 'Bearer ' + token
        }
      });
      alert("Membro criado com sucesso!")
      window.location.pathname = "/profile";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image src={Logo} alt="Bubble Punch logo" width={120}></Image>
      <h1 className="text-yellow-400 font-black text-4xl animation-fadeinUpwards">
        Create a member
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center p-8"
      >
        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="w-60 p-4 rounded-md shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
          required
        />
        <input
          type="text"
          name="userId"
          placeholder="Id do usuário"
          className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Função desempenhada"
          className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefone"
          className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
          required
        />
        <input
          type="date"
          name="birthdate"
          placeholder="Data de nascimento"
          className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
          required
        />
        <input
          type="text"
          name="pix"
          placeholder="Chave pix para pagamento"
          className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
          required
        />

        <button
          type="submit"
          className="w-60 p-4 rounded-md bg-yellow-500 mt-4 hover:opacity-85 transition-all ease-in-out"
        >
          Criar
        </button>
      </form>
    </main>
  );
}
