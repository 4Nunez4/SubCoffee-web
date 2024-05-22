import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import SubastaIcon from "../nextui/SubastaIcon";
import FincaIcon from "../nextui/FincaIcon";
import FincaTable from "../components/Guard/FincaTable";
import SubastaTable from "../components/Guard/SubastaTable";

export default function MiSubastaT() {
  return (
    <div className="w-full flex bg-gray-100 flex-col items-center px-8">
      <div className="pb-2">
        <div className="flex justify-center pt-8 pb-2">
          <img src="./src/assets/cafe_mi_subasta.png" alt="Cafe_imagen" className="rounded-s-2xl transition-width duration-300 md:max-w-[25%] lg:max-w-[33.33%] xl:max-w-[50%] w-full lg:w-auto xl:w-auto" />
          <img src="./src/assets/carrofinca_mi_subasta.png" alt="Finca_imagen" className="rounded-e-2xl transition-width duration-300 md:max-w-[25%] lg:max-w-[33.33%] xl:max-w-[50%] w-full lg:w-auto xl:w-auto" />
        </div>
        <p className="text-center mt-3 text-black"> Para crear una subasta primero debes crear una finca. Luego, agregas las variedades que tienes en tu finca y ya por fin puedes agregar una subasta </p>
      </div>
      <div className="w-[1030px] flex flex-col justify-center gap-y-4">
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Options"
            color="primary"
            variant="underlined"
            classNames={{
              tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
              cursor: "w-full bg-[#22d3ee]",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-[#06b6d4]",
            }}
          >
            <Tab key="fincas" title={
              <div className="flex items-center space-x-2">
                <FincaIcon />
                <span>Fincas y variedades</span>
              </div>
            }>
              <Card>
                <CardBody>
                  <FincaTable />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="videos" title={
              <div className="flex items-center space-x-2">
                <SubastaIcon />
                <span>Subastas</span>
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
