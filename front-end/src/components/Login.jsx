

export const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-white dark:bg-white-600 shadow-md rounded-lg px-8 py-6 max-w-md border border-gray-700">
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-black-200">INICIAR SESIÓN</h1>
                <form action="#">
                    <div className="mb-4">
                        <label htmlFor="correo" className="block text-sm font-medium text-black-700 dark:text-gray-800 mb-2">Correo</label>
                        <input type="correo" id="correo" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-600 focus:outline-none focus:border-indigo-500" placeholder="Ingrese su correo" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-black-700 dark:text-gray-800 mb-2">Password</label>
                        <input type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-600 focus:outline-none focus:border-indigo-600" placeholder="Ingrese su contraseña" required />
                        <a href="#" className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">¿Olvidaste tu contraseña?</a>
                    </div>
                    <div className="flex items-center justify-between mb-0">
                        {/* <div className="flex items-center"> */}
                        {/* <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" defaultChecked />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label> */}
                        {/* </div> */}
                    </div>
                    <button onClick={() => alert("Hello")} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Iniciar Sesión</button>
                    <a href="#" className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">¿No tienes una cuenta? </a>
                    <a href="#" className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Registrate aqui </a>
                </form>
            </div>
        </div>
    )
}
