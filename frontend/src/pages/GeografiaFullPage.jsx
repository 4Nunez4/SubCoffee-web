import React, { useEffect } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import DepartamentoTable from "../components/Guard/DepartamentoTable";
import MunicipioTable from "../components/Guard/MunicipioTable";
import VeredaTable from "../components/Guard/VeredaTable";
import { useAuthContext } from "../context/AuthContext";

function GeografiaFullPage() {
  const { getUsers } = useAuthContext()
  useEffect(() => {
      getUsers()
    }, []);
    
  return (
    <div className="flex flex-col px-10 gap-x-4 pt-8 w-full bg-[#FDFBF6]">
      <Tabs aria-label="Options" variant="bordered" >
        <Tab key="departamentos" title="Departamentos">
          <Card className=" ">
            <CardBody>
              <DepartamentoTable />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="municipios" title="Municipios">
          <Card className=" ">
            <CardBody>
              <MunicipioTable />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="veredas" title="Veredas">
          <Card className=" ">
            <CardBody>
              <VeredaTable />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default GeografiaFullPage;
