// PerfilPage.jsx
import { Button } from "../components/atomos/Button";
import { AvatarImage, Avatar } from "../components/atomos/Avatar";
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "../components/atomos/Card";
import { Input } from "../components/atomos/Input";
import { Textarea } from "../components/atomos/Textarea";
import { CompassIcon, HomeIcon, SettingsIcon, TextIcon, CogIcon, CircleIcon, LogOutIcon, SearchIcon } from "../components/atomos/Icons";

export default function PerfilPage() {
  return (
    <div className="bg-[#1E293B] min-h-screen flex">
      <aside className="w-16 flex flex-col items-center bg-[#111827] py-4 space-y-6">
        <CompassIcon className="text-white h-6 w-6" />
        <HomeIcon className="text-white h-6 w-6" />
        <SettingsIcon className="text-white h-6 w-6" />
        <TextIcon className="text-white h-6 w-6" />
        <CogIcon className="text-white h-6 w-6" />
        <CircleIcon className="text-white h-6 w-6" />
        <TextIcon className="text-white h-6 w-6" />
        <LogOutIcon className="text-white h-6 w-6" />
      </aside>
      <div className="flex-1">
        <header className="flex justify-between items-center p-4 bg-[#111827] text-white">
          <SearchIcon className="h-6 w-6" />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Crear Subasta</Button>
          <Avatar>
            <AvatarImage alt="User avatar" src="/placeholder.svg?height=32&width=32" />
          </Avatar>
        </header>
        <main className="p-6">
          <h1 className="text-2xl font-semibold text-white mb-6">Perfil</h1>
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-[#2D3748] text-white">
              <CardHeader>
                <CardTitle>Foto de perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage alt="User profile" src="/placeholder.svg?height=64&width=64" />
                  </Avatar>
                  <Button variant="outline">Cambiar</Button>
                </div>
                <div className="mt-4 space-y-4">
                  <Input placeholder="Nombre" />
                  <Input placeholder="Correo" type="email" />
                  <Input placeholder="Contraseña" type="password" />
                  <Input placeholder="Cedula de Ciudadania Colombiana" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Descartar cambios</Button>
                <Button>Guardar Cambios</Button>
              </CardFooter>
            </Card>
            <Card className="bg-[#2D3748] text-white">
              <CardHeader>
                <CardTitle>Informacion</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea placeholder="Cuenta tu historia" />
                <div className="mt-4 space-y-4">
                  <Input placeholder="Rol" />
                  <Input placeholder="Telefono" />
                  <Input placeholder="Fecha de nacimiento" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}



// // PerfilPage.jsx
// import React from 'react';

// // Átomos
// const Avatar = ({ src, alt }) => {
//   return (
//     <img
//       className="w-12 h-12 rounded-full object-cover"
//       src={src}
//       alt={alt}
//     />
//   );
// };

// const Button = ({ children }) => {
//   return (
//     <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded">
//       {children}
//     </button>
//   );
// };

// // Moléculas
// const ProfileHeader = ({ username }) => {
//   return (
//     <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
//       <Avatar src="avatar.jpg" alt="Avatar" />
//       <div>
//         <h1 className="text-xl font-bold">{username}</h1>
//         <Button>Editar Perfil</Button>
//       </div>
//     </div>
//   );
// };

// // Organismos
// const Bio = ({ user }) => {
//   return (
//     <div className="mb-4">
//       <h2 className="text-lg font-semibold">Bio</h2>
//       <p>{user.bio}</p>
//     </div>
//   );
// };

// const Posts = ({ posts }) => {
//   return (
//     <div className="mb-4">
//       <h2 className="text-lg font-semibold">Publicaciones</h2>
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>{post.content}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const UserProfile = ({ user }) => {
//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <ProfileHeader username={user.username} />
//       <Bio user={user} />
//       <Posts posts={user.posts} />
//       {/* Otros componentes del perfil, como amigos, etc. */}
//     </div>
//   );
// };

// // Página de Perfil
// const PerfilPage = () => {
//   const user = {
//     username: "ejemplo_usuario",
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     posts: [
//       { id: 1, content: "¡Hola, mundo!" },
//       { id: 2, content: "Esto es una publicación de ejemplo." }
//     ]
//   };

//   return (
//     <div>
//       <UserProfile user={user} />
//     </div>
//   );
// };

// export default PerfilPage;
