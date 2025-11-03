import { Outlet } from "react-router";
import Header from "../Header/header";

export default function MainLayout () {
  return (
    <>
      <Header/>
      <main className="w-full mt-8">
        <Outlet/>
      </main>
    </>
  )
}