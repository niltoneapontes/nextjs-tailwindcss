import Image from "next/image";
import Logo from "@/assets/logo.png";
import "@/app/globals.css";
import api from "@/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditMember() {
  const today = new Date();
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState("");
  const [member, setMember] = useState<any>(null);

  async function onSubmit(e: any) {
    e.preventDefault();
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
      await api.put("members", data, {
        params: { id: id },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      alert("Membro editado com sucesso!");
      router.replace("/profile")
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    try {
      await api.delete("members", {
        params: { id: id },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      alert("Membro excluído com sucesso!")
      router.replace("/profile")
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchMemberDataById(id: any, token: string) {
    try {
      const response = await api.get("members", {
        params: { id: id },
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const {
        member: { userId, name, role, email, phone, birthdate, pix, createdAt },
      } = response.data;

      setMember({
        userId,
        name,
        role,
        email,
        phone,
        birthdate,
        pix,
        createdAt,
      });
    } catch (error) {
      alert("Membro não encontrado. Verifique o id informado e tente novamente.")
      // router.back();
      console.error(error);
    }
  }

  useEffect(() => {
    const foundToken = localStorage.getItem("@bubblePunch/token") || "";
    setToken(foundToken);
    if (id && foundToken) {
      fetchMemberDataById(id, foundToken);
    }
  }, [router.query]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image src={Logo} alt="Bubble Punch logo" width={120}></Image>
      <h1 className="text-yellow-400 font-black text-4xl animation-fadeinUpwards">
        Create a member
      </h1>
      {member && (
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center p-8"
        >
          <input
            type="text"
            name="name"
            placeholder="Nome"
            defaultValue={member.name}
            className="w-60 p-4 rounded-md shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
            required
          />
          <input
            type="text"
            name="userId"
            defaultValue={member.userId}
            placeholder="Id do usuário"
            className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
            required
          />
          <input
            type="text"
            name="role"
            defaultValue={member.role}
            placeholder="Função desempenhada"
            className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
            required
          />
          <input
            type="email"
            name="email"
            defaultValue={member.email}
            placeholder="E-mail"
            className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
            required
          />
          <input
            type="tel"
            name="phone"
            defaultValue={member.phone}
            placeholder="Telefone"
            className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
            required
          />
          <input
            type="date"
            name="birthdate"
            defaultValue={member.birthdate}
            placeholder="Data de nascimento"
            className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
            required
          />
          <input
            type="text"
            name="pix"
            defaultValue={member.pix}
            placeholder="Chave pix para pagamento"
            className="w-60 p-4 rounded-md mt-2 shadow-md focus:outline-none focus:border-yellow-1000 focus:ring-2 focus:ring-yellow-500 transition duration-200 ease-in-out text-gray-700"
            required
          />

          <button
            type="submit"
            className="w-60 p-4 rounded-md bg-yellow-500 mt-4 hover:opacity-85 transition-all ease-in-out"
          >
            Atualizar
          </button>
          <button
            type="button"
            className="w-60 p-4 text-red-500 hover:opacity-85 transition-all ease-in-out"
            onClick={handleDelete}
          >
            Excluir
          </button>
        </form>
      )}
    </main>
  );
}
