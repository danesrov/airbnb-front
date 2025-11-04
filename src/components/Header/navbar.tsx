import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils"
import { NavLink } from "react-router"

function MenuItem({label, to, onClick}: {label: string; to: string; onClick?: VoidFunction}) {
  return (
    <NavLink onClick={onClick} to={to} className={({isActive}) => cn("text-base transition-colors", isActive ? 'border-b-2 text-white' : 'text-gray-600 hover:text-gray-300')}>{label}</NavLink>
  )
}

export default function Navbar() {
  const {signOut, userSession} = useUser()

  return (
    <nav className="flex items-center justify-left">
      <ul className="flex items-center gap-4">
        <MenuItem label={'Principal'} to="/"/>
        {userSession && (
          <li className="text-gray-600 hover:text-gray-300 cursor-pointer" onClick={() => {
            signOut()
            window.location.reload()
          }}>Salir</li>
        )}
      </ul>
    </nav>
  )
}