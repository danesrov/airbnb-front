import { Avatar, AvatarFallback } from "../ui/avatar";

export default function AvatarItem () {
  return (
    <div className="flex items-center justify-between gap-2">
      <Avatar>
        <AvatarFallback className="bg-primary-1">DR</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-white text-sm">Daniel Rodriguez</span>
        <span className="text-gray-600 text-xs">daniel@daniel.com</span>
      </div>
    </div>
  )
}