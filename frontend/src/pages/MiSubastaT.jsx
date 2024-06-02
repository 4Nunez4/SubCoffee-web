import React, { useEffect } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import SubastaIcon from "../nextui/SubastaIcon";
import FincaIcon from "../nextui/FincaIcon";
import FincaTable from "../components/Guard/FincaTable";
import SubastaTable from "../components/Guard/SubastaTable";
import { useAuthContext } from "../context/AuthContext";

export default function MiSubastaT() {
  const { getUsers } = useAuthContext()
  useEffect(() => {
      getUsers()
    }, []);
    
  return (
    <div className="w-full flex flex-col items-center px-8 bg-gray-300">
      <div className="pb-2">
        <div className="flex justify-center pt-8 pb-2">
          <img src="./src/assets/cafe_mi_subasta.png" alt="Cafe_imagen" className="rounded-s-2xl transition-width duration-300 md:max-w-[25%] lg:max-w-[33.33%] xl:max-w-[50%] w-full lg:w-auto xl:w-auto" />
          <img src="./src/assets/carrofinca_mi_subasta.png" alt="Finca_imagen" className="rounded-e-2xl transition-width duration-300 md:max-w-[25%] lg:max-w-[33.33%] xl:max-w-[50%] w-full lg:w-auto xl:w-auto" />
        </div>
        <p className="text-center mt-3 text-[#00684a] text-xl	font-bold	"> Para crear una subasta primero debes crear una finca. Luego, agregas las variedades que tienes en tu finca y ya por fin puedes agregar una subasta </p>
      </div>
      <div className="w-[1030px] flex flex-col justify-center gap-y-4">
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Options"
            color="[#00ed64]"
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-[#00ed64]",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-[#00ed64]",
            }}
          >
            <Tab key="fincas" title={
              <div className="text-[#00684a]  flex items-center space-x-2 text-lg font-semibold	">
                <FincaIcon className=""/>
                <span >Fincas y variedades</span>
              </div>
            }>
              <Card>
                <CardBody>
                  <FincaTable />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="videos" title={
              <div className="text-[#00684a]  flex items-center space-x-2 text-lg font-semibold	">
                <SubastaIcon />
                <span classname="">Subastas</span>
              </div>
            }>
              <Card>
                <CardBody>
                  <SubastaTable />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
