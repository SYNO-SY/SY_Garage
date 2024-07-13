import VehicleCard from "./VehicleCard/VehicleCard";
import VDetailMenu from "./VehicleDetailMenu/VDetailMenu";
import { Center, Divider } from "@mantine/core";

function VehicleMenu() {
  return (
    <>
      <div style={{ padding: "10px" }}>
        {/* vehicle Card menu */}
        <VehicleCard></VehicleCard>
        {/* divider */}
        <Divider></Divider>
        {/* vehicle Detail menu */}
        <Center>
          <VDetailMenu></VDetailMenu>
        </Center>
      </div>
    </>
  );
}

export default VehicleMenu;
