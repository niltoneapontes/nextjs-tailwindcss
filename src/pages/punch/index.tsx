import Image from "next/image";
import Logo from "@/assets/logo.png";
import "@/app/globals.css";
import api from "@/api";
import { useEffect, useState } from "react";
import { User } from "../profile";
import { headers } from "next/headers";
import Clock from "@/components/Clock";

export default function Punch() {
  const today = new Date();

  const [token, setToken] = useState("");
  const [user, setUser] = useState<User>({
    userId: "-",
    username: "desconhecido",
    roles: "desconhecidas",
  });

  useEffect(() => {
    async function loadProfile() {
      const foundToken = localStorage.getItem("@bubblePunch/token");
      setToken(foundToken || "");

      try {
        const {
          data: { username, sub: userId, roles },
        } = await api.get("auth/profile", {
          headers: {
            Authorization: "Bearer " + foundToken,
          },
        });
        setUser({
          username,
          userId,
          roles,
        });
      } catch (error) {
        console.error(error);
        setUser({
          username: "desconhecido",
          userId: "-",
          roles: "desconhecidas",
        });
      }
    }

    loadProfile();
  }, []);

  async function handlePunch() {
    try {
      await api.post(
        "punch",
        {
          memberId: "3b5d2032-d607-4630-9784-c76e8a2ef210",
          memberName: user.username,
          type: "entrada",
          datetime: today.toISOString(),
          createdAt: today.toISOString(),
          updatedAt: today.toISOString(),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      alert("Ponto batido com sucesso!")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image src={Logo} alt="Bubble Punch logo" width={120}></Image>
      <Clock></Clock>
      <h2 className="mt-4">
        Usuário: {user.username}
      </h2>
      <button
        type="button"
        className="w-60 p-4 rounded-md bg-yellow-500 mt-4 hover:opacity-85 transition-all ease-in-out"
        onClick={handlePunch}
      >
        Bater ponto
      </button>
    </main>
  );
}
