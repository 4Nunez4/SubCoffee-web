import React from "react";
import logo from "../assets/isotipo-SubCoffee.png";

function PoliticasYCondicionesPageA() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#FDFBF6]">
      <h2 className="font-semibold text-3xl text-center mb-8 mt-40 ">
        Políticas de privacidad
      </h2>
      <div className=" py-6 w-full b overflow-y-auto max-w-7xl px-12">
        <section id="primera">
          <div className="flex-grow">
            <h2 className="font-semibold text-3xl mb-4 ">
              Fecha de efectividad
            </h2>
            <p className="font-normal text-lg text-[#919190]">
              Bienvenido a SubCoffe, la plataforma de subasta en línea enfocada
              en el café pergamino de calidad directamente de los campesinos del
              Huila, Colombia. Al utilizar nuestro sitio web ubicado en
              [Ingresar URL del Sitio Web] (en adelante, el "Sitio Web"), usted
              acepta estar vinculado por estos Términos y Condiciones de Uso (en
              adelante, los "Términos"), que rigen su acceso y uso del Sitio Web
              y de los servicios ofrecidos por SubCoffe (en adelante, los
              "Servicios").
            </p>

            <p className="font-normal text-lg text-[#919190]">
              Por favor, lea estos Términos cuidadosamente antes de acceder o
              utilizar nuestro Sitio Web. Si no está de acuerdo con todos los
              términos y condiciones de este acuerdo, entonces no puede acceder
              al Sitio Web ni utilizar ninguno de los servicios. Al acceder o
              usar cualquier parte del sitio, usted acepta estar sujeto a estos
              Términos.
            </p>

            <div className="flex flex-col md:flex-row items-start mb-6">
              <img
                src={logo}
                alt="Logo de SubCoffe"
                className="w-32 h-auto mb-6 md:mr-8 max-w-full md:max-w-none"
              />
              <div>
                <h2 className="font-semibold text-3xl mb-4  ">
                  Descripción del Servicio
                </h2>
                <p className="font-normal text-lg text-[#919190]">
                  SubCoffe proporciona una plataforma de subasta en línea que
                  permite a los campesinos del Huila, Colombia, subastar su café
                  pergamino de calidad. Los usuarios registrados pueden
                  participar en las subastas para adquirir café directamente de
                  los productores. SubCoffe actúa como intermediario entre los
                  vendedores (campesinos) y los compradores, pero no participa
                  en el proceso de pago entre las partes.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="font-semibold text-3xl mb-4  ">
            Registro de Usuarios
          </h2>
          <p className="font-normal text-lg text-[#919190]">
            Para acceder a ciertas funciones del Sitio Web, incluyendo la
            participación en subastas, deberá registrarse y crear una cuenta de
            usuario. Al registrarse, se compromete a proporcionar información
            verdadera, precisa, actualizada y completa sobre usted, según lo
            solicitado por el formulario de registro. SubCoffe se reserva el
            derecho de suspender o terminar su cuenta si se descubre que
            cualquier información proporcionada es falsa, inexacta,
            desactualizada o incompleta.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-3xl mb-4  ">
            Privacidad y Protección de Datos
          </h2>
          <p className="font-normal text-lg text-[#919190]">
            SubCoffe toma seriamente la privacidad de sus usuarios. Recopilamos
            y utilizamos sus datos personales de acuerdo con nuestra Política de
            Privacidad, la cual se encuentra disponible en [Ingresar URL de la
            Política de Privacidad]. Al utilizar nuestros Servicios, usted
            consiente la recopilación, uso y compartición de sus datos
            personales según lo establecido en nuestra Política de Privacidad.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-3xl mb-4  ">
            Cookies y Tecnologías de Seguimiento
          </h2>
          <p className="font-normal text-lg text-[#919190]">
            El Sitio Web utiliza cookies y otras tecnologías de seguimiento para
            mejorar su experiencia de usuario y recopilar datos sobre cómo
            utiliza el sitio. Al usar nuestro Sitio Web, usted acepta el uso de
            estas tecnologías, según se describe en nuestra Política de
            Privacidad.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-3xl mb-4  ">
            Uso de los Servicios
          </h2>
          <p className="font-normal text-lg text-[#919190]">
            Al utilizar los Servicios de SubCoffe, usted se compromete a:
          </p>
          <ul className="mb-6 ml-8 list-disc font-normal text-lg text-[#919190]">
            <li>
              No utilizar los Servicios para fines ilegales o no autorizados.
            </li>
            <li>
              No recopilar información de otros usuarios sin su consentimiento.
            </li>
            <li>
              Mantener la confidencialidad de su contraseña y otros datos de
              acceso a su cuenta.
            </li>
            <li>
              No publicar contenido falso, inexacto, engañoso, difamatorio o de
              naturaleza ofensiva.
            </li>
            <li>
              Cumplir con todas las leyes locales, nacionales e internacionales
              aplicables.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="font-semibold text-3xl mb-4  ">
            Derechos de Propiedad Intelectual
          </h2>
          <p className="font-normal text-lg text-[#919190]">
            Todo el contenido incluido en el Sitio Web, como textos, gráficos,
            logos, imágenes, así como la compilación de dicho contenido, es
            propiedad de SubCoffe o de sus licenciantes y está protegido por las
            leyes de derechos de autor de Colombia y leyes internacionales de
            derechos de autor. Usted se compromete a no reproducir, duplicar,
            copiar, vender, revender o explotar cualquier parte del Servicio,
            uso del Servicio, o acceso al Servicio sin el permiso expreso por
            escrito de SubCoffe.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-3xl mb-4  ">
            Modificación de los Términos
          </h2>
          <p className="font-normal text-lg text-[#919190]">
            SubCoffe se reserva el derecho, a su sola discreción, de modificar o
            reemplazar estos Términos en cualquier momento. Si las revisiones
            son significativas, haremos lo posible por notificarle al menos 30
            días antes de que los nuevos términos entren en vigencia. Lo que
            constituye un cambio significativo será determinado a nuestra
            discreción.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-3xl mb-4  ">
            Limitación de Responsabilidad
          </h2>
          <p className="font-normal text-lg text-[#919190]">
            SubCoffe no será responsable por daños indirectos, incidentales,
            especiales, consecuenciales o ejemplares, incluidos, pero no
            limitados a, daños por pérdida de beneficios, buena voluntad, uso,
            datos u otras pérdidas intangibles, resultantes de su acceso o uso o
            la imposibilidad de acceder o usar el Servicio.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-3xl mb-4  ">
            Jurisdicción y Ley Aplicable
          </h2>
          <p className="font-normal text-lg text-[#919190]">
            Estos Términos se regirán e interpretarán de acuerdo con las leyes
            de Colombia, sin dar efecto a ningún principio de conflictos de
            leyes. Cualquier disputa relacionada con estos Términos o el
            Servicio será resuelta en los tribunales competentes ubicados en
            Colombia.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PoliticasYCondicionesPageA;
