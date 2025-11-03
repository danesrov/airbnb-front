import AvatarItem from "./avatar-item";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="w-full flex justify-between p-4 sticky top-0">
      <Navbar/>
      <AvatarItem/>
    </header>
  )
}