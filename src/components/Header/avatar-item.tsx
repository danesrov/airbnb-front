import { useUser } from "@/hooks/useUser";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useEffect, useState } from "react";
import { getInitials } from "../utilities/text.utils";

export default function AvatarItem () {
  const {userSession} = useUser()
  const [fullName, setFullName] = useState<string>("")

  useEffect(() => {
    if (userSession) {
      setFullName(`${userSession.nombre} ${userSession.apellido}`)
    }
  }, [userSession])

  const initials = getInitials(fullName)

  return (
    <div className="flex items-center justify-between gap-2">
      <Avatar>
        <AvatarFallback className="bg-primary-1">{initials.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-white text-sm">{fullName}</span>
        <span className="text-gray-600 text-xs">{userSession?.correo}</span>
      </div>
    </div>
  )
}