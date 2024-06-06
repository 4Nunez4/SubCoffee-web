import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import SubastaIcon from "../nextui/SubastaIcon";
import FincaIcon from "../nextui/FincaIcon";
import FincaTable from "../components/Guard/FincaTable";
import SubastaTable from "../components/Guard/SubastaTable";

export default function MiSubastaT() {
    
  return (
    <div className="w-full flex flex-col px-8 bg-gray-50">
      <div className="pb-2">
         <p className="pl-4 text-xl my-2 text-gray-500 mt-8"> Para crear una subasta primero debes crear una finca. Luego, agregas las variedades que tienes en tu finca y ya por fin puedes agregar una subasta </p>
      </div>
      <div className="flex flex-col  gap-y-4">
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
                <span className="">Subastas</span>
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
