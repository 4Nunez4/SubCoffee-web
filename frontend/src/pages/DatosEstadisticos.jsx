import React, { useEffect } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSubastaContext } from "../context/SubastaContext";

Chart.register(...registerables);

function DatosEstadisticos() {
  const {
    ListAllDatesSub,
    todasLasSubastas,
    subastasAbiertas,
    subastasEnEspera,
    subastasCerradas,
    subastasEnProceso,
    subastasConGanadorYPrecio,
    subastasSinGanadorOPrecioInactivas,
    subastasNoTerminadas,
    subastasPorMes,
    subastasPorAno,
    subastasPorVariedad,
  } = useSubastaContext();

  useEffect(() => {
    ListAllDatesSub();
  }, [ListAllDatesSub]);

  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(199, 199, 199, 0.2)",
  ];

  const borderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(199, 199, 199, 1)",
  ];

  const donutData = {
    labels: [
      "Terminadas Exitosamente",
      "Sin Establecer Ganador",
      "Aún No Terminadas",
    ],
    datasets: [
      {
        data: [
          subastasConGanadorYPrecio,
          subastasSinGanadorOPrecioInactivas,
          subastasNoTerminadas,
        ],
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const lineDataMes = {
    labels: subastasPorMes.map((item) => item.mes),
    datasets: [
      {
        label: "Subastas",
        data: subastasPorMes.map((item) => item.subastas),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const lineDataAno = {
    labels: subastasPorAno.map((item) => item.año),
    datasets: [
      {
        label: "Subastas por Año",
        data: subastasPorAno.map((item) => item.subastas_por_año),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const barDataVariedad = {
    labels: subastasPorVariedad.map((item) => item.variedad),
    datasets: [
      {
        label: "Subastas",
        data: subastasPorVariedad.map((item) => item.subastas_por_variedad),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className=" ">
      <div className=" grid grid-rows-5 gap-1 ">
        <div className=" h-52 w-full p-4 border rounded shadow row-span-1">
          <div className="flex justify-between items-center">
            <h2>Resumen de Subastas</h2>
            <span className="bg-green-200 text-green-800 py-1 px-2 rounded">
              Todas las subastas: {todasLasSubastas}
            </span>
          </div>
          <div className="flex mt-3 space-x-4">
            <div className="p-4 border rounded shadow flex-1">
              <h4>Subastas abiertas:</h4>
              <p className="font-semibold">{subastasAbiertas}</p>
            </div>
            <div className="p-4 border rounded shadow flex-1">
              <h4>Subastas en proceso:</h4>
              <p className="font-semibold">{subastasEnProceso}</p>
            </div>
            <div className="p-4 border rounded shadow flex-1">
              <h4>Subastas en espera:</h4>
              <p className="font-semibold">{subastasEnEspera}</p>
            </div>
            <div className="p-4 border rounded shadow flex-1">
              <h4>Subastas cerradas:</h4>
              <p className="font-semibold">{subastasCerradas}</p>
            </div>
          </div>
        </div>

        <div className=" h-52 w-full ">
          <div className=" ">
            <div className=" grid grid-cols-2 w-full gap-1">
              <div className="p-4 border rounded shadow w-full ">
                <h3>Subastas por Mes</h3>
                <Line data={lineDataMes} />
              </div>
              <div className="p-4 border rounded shadow w-full ">
                <h3>Subastas por Año</h3>
                <Line data={lineDataAno} />
              </div>
            </div>
          </div>

          <div className=" w-full row-span-3">
            <div className=" items-center grid grid-cols-2 gap-1">
              <div className=" w-full p-4 border rounded shadow">
                <h3>Mejores Variedades de Café</h3>
                <Bar data={barDataVariedad} />
              </div>

              <div className=" h-5/6 items-center flex justify-center" >
                <Doughnut data={donutData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatosEstadisticos;
