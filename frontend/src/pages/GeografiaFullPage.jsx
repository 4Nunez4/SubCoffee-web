import React from "react";
import { DepartamentoT } from "./DepartamentoT";
import MunicipioT from "./MunicipioT";
import VeredaT from "./VeredaT";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

function GeografiaFullPage() {
  return (
    <div className="flex flex-col px-10 gap-x-4 pt-8 bg-gray-100">
      <Tabs aria-label="Options" variant="bordered">
        <Tab key="departamentos" title="Departamentos">
          <Card>
            <CardBody>
              <DepartamentoT />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="municipios" title="Municipios">
          <Card>
            <CardBody>
              <MunicipioT />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="veredas" title="Veredas">
          <Card>
            <CardBody>
              <VeredaT />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

    </div>
  );
}

export default GeografiaFullPage;
