import { useUser } from "@/hooks/useUser";
import AvatarItem from "./avatar-item";
import Navbar from "./navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export default function Header() {
  const {userSession} = useUser()
  const navigate = useNavigate()

  return (
    <header className="w-full flex justify-between p-4 sticky top-0">
      <Navbar/>
      {userSession && <AvatarItem/>}
      {!userSession && <Button onClick={() => navigate('/login')}>Iniciar Sesion</Button>}
    </header>
  )
}