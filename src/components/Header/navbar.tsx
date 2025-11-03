import { cn } from "@/lib/utils"
import { NavLink } from "react-router"

function MenuItem({label, to}: {label: string; to: string}) {
  return (
    <NavLink to={to} className={({isActive}) => cn("text-base transition-colors", isActive ? 'border-b-2 text-white' : 'text-gray-600 hover:text-gray-300')}>{label}</NavLink>
  )
}

export default function Navbar() {
  return (
    <nav className="flex items-center justify-left">
      <ul className="flex items-center gap-4">
        <MenuItem label={'sadhasdghas'} to="/"/>
        <MenuItem label={'sadhasdghas'} to="reservas"/>
      </ul>
    </nav>
  )
}