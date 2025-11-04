import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/hooks/useUser"
import type { UserLogin } from "@/types/user"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

export default function LoginPage () {
  const {loading, login} = useUser()
  const [loginData, setLoginData] = useState<UserLogin>({
    correo: '',
    password: ''
  })
  const navigate = useNavigate()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.currentTarget
    setLoginData((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login(loginData)
      navigate('/')
    } catch {
      toast.error("Credenciales invalidas", {
        position: 'top-center',
        richColors: true
      })
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Inicia Sesion con tu cuenta</CardTitle>
          <CardDescription>
            Escribe tu correo en el campo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="POST" onSubmit={handleSubmit} id="loginform">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="correo">Correo</Label>
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={onChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input id="password" type="password" placeholder="******" name="password" required onChange={onChange}/>
              </div>
            </div>
            <Button type="submit" form="loginform" className="w-full bg-primary-1 mt-4" disabled={loading}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}