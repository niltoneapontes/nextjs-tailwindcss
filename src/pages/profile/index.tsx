import Image from "next/image";
import Logo from "@/assets/logo.png";
import "@/app/globals.css";
import api from "@/api";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";

export type User = {
  userId: string;
  username: string;
  roles: string;
}

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState<User>({
    userId: "-",
    username: "Desconhecido",
    roles: "desconhecidas"
  })
  const [searchId, setSearchId] = useState("")

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("@bubblePunch/token")

      try {
        const {data: { username, sub: userId, roles }} = await api.get("auth/profile", {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        setUser({
          username,
          userId,
          roles
        })
      } catch(error) {
        console.error(error)
        setUser({
          username: "Desconhecido",
          userId: "-",
          roles: "desconhecidas"
        })
      }
    }

    loadProfile()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image src={Logo} alt="Bubble Punch logo" width={120}></Image>
      <h1 className="text-yellow-400 font-black text-4xl animation-fadeinUpwards">
        {user.username}
      </h1>
      <h2 className="mt-2">
        Permissões: {user.roles}
      </h2>
      <SearchBar placeholder="Pesquise por um id" onSearch={(value) => {
        setSearchId(value)
      }}
      onAction={() => {
          router.replace("/member/edit", { query: { id: searchId }})
      }}></SearchBar>
      </main>
  );
}
