import React, { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

function PoliticasYCondicionesPageA() {
    const { getUsers } = useAuthContext()
    useEffect(() => {
        getUsers()
      }, []);

    return (
        <div className="px-44 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Política de Privacidad y Uso de Datos</h1>
            <p className="mb-4">Bienvenido/a a la plataforma de subastas de café en línea. En esta página, nos preocupamos profundamente por la privacidad y seguridad de nuestros usuarios. Por ello, hemos desarrollado esta política detallada que explica cómo recopilamos, usamos, compartimos y protegemos la información personal que usted nos proporciona. Al utilizar nuestros servicios, usted acepta los términos descritos a continuación.</p>

            <h3 className="text-xl font-bold mb-2">Información que Recopilamos</h3>
            <p className="mb-4">Recopilamos varios tipos de información para mejorar su experiencia de usuario y ofrecer un servicio de calidad:</p>
            <ul className="list-disc list-inside mb-4">
                <li>Información Personal: Cuando se registra en nuestro sitio web, le solicitamos cierta información personal, como su nombre, dirección de correo electrónico, dirección postal y número de teléfono. Esta información es necesaria para crear su cuenta y facilitar nuestras transacciones.</li>
                <li>Información de Pago: Si realiza una compra en nuestra plataforma, necesitaremos información de pago, como detalles de tarjetas de crédito o cuentas bancarias, para procesar sus transacciones.</li>
                <li>Información de Uso: Recopilamos datos sobre cómo interactúa con nuestra plataforma, como sus patrones de navegación, páginas visitadas, consultas de búsqueda y artículos vistos.</li>
                <li>Información de Comunicación: Si se comunica con nuestro equipo de soporte o envía mensajes a otros usuarios a través de nuestra plataforma, almacenaremos esos mensajes para resolver problemas o mejorar nuestros servicios.</li>
            </ul>

            <h3 className="text-xl font-bold mb-2">Uso de la Información</h3>
            <p className="mb-4">Utilizamos la información recopilada para los siguientes propósitos:</p>
            <ul className="list-disc list-inside mb-4">
                <li>Proporcionar Servicios Personalizados: Utilizamos su información para ofrecer servicios personalizados, como sugerencias de café basadas en sus preferencias.</li>
                <li>Procesar Transacciones: Utilizamos sus datos de pago para procesar sus compras y subastas de café.</li>
                <li>Mejorar Nuestros Servicios: Analizamos la información para comprender mejor las necesidades y preferencias de nuestros usuarios y así mejorar continuamente nuestra plataforma.</li>
                <li>Comunicación: Utilizamos su información de contacto para enviarle actualizaciones sobre subastas, promociones especiales y cambios en nuestras políticas.</li>
            </ul>

            <h3 className="text-xl font-bold mb-2">Compartir Información</h3>
            <p className="mb-4">Respetamos su privacidad y solo compartimos su información en las siguientes circunstancias:</p>
            <ul className="list-disc list-inside mb-4">
                <li>Proveedores de Servicios: Compartimos información con terceros que nos ayudan a proporcionar servicios, como procesadores de pagos y servicios de envío.</li>
                <li>Cumplimiento Legal: Podemos divulgar información cuando sea requerido por ley, como en respuesta a una orden judicial o solicitud gubernamental.</li>
                <li>Consentimiento: Compartiremos su información con su consentimiento explícito, como cuando elija compartir su actividad en nuestras redes sociales.</li>
            </ul>

            <h3 className="text-xl font-bold mb-2">Seguridad de la Información</h3>
            <p className="mb-4">Implementamos medidas de seguridad físicas, técnicas y administrativas para proteger su información contra el acceso no autorizado, pérdida o alteración.</p>

            <h3 className="text-xl font-bold mb-2">Cookies y Tecnologías Similares</h3>
            <p className="mb-4">Utilizamos cookies y tecnologías similares para mejorar su experiencia en línea. Puede ajustar la configuración de su navegador para rechazar cookies, pero esto puede afectar la funcionalidad de nuestro sitio.</p>

            <h3 className="text-xl font-bold mb-2">Privacidad de Menores</h3>
            <p className="mb-4">Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente información personal de menores sin el consentimiento de los padres o tutores.</p>

            <h3 className="text-xl font-bold mb-2">Cambios en la Política de Privacidad</h3>
            <p className="mb-4">Nos reservamos el derecho de actualizar esta política en cualquier momento. Le notificaremos sobre cambios significativos mediante un aviso en nuestro sitio web o por correo electrónico.</p>

            <h3 className="text-xl font-bold mb-2">Contacto</h3>
            <p className="mb-4">Si tiene alguna pregunta sobre nuestra política de privacidad o desea acceder, corregir o eliminar su información personal, contáctenos a través de [subcoffee@gmail.com] o nuestra dirección postal.</p>

            <p>Al utilizar nuestra plataforma, usted acepta esta política de privacidad. Le agradecemos por confiar en nosotros con su información personal y nos comprometemos a proteger su privacidad en todo momento.</p>
        </div>
    );
}

export default PoliticasYCondicionesPageA;
