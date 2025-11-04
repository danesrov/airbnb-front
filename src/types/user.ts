export interface UserLogin {
  correo: string;
  password: string;
}

export interface User {
	"id_usuario": number,
	"nombre": string,
	"apellido": string,
	"correo": string,
	"telefono": string,
	"created_at": Date,
	"updated_at": Date
}