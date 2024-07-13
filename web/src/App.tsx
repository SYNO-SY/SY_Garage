import Garage from "./Layouts/Garage/Garage";
import ImForm from "./Layouts/ImpoundForm/ImForm";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { useState } from "react";
import { debugData } from "./utils/debugData";
import {
  iv_Plate,
  iv_Props,
  iv_RemainingTime,
  iv_Vehicle,
  SpawnPoint,
  ui_State,
  vehicleDataAtom,
} from "./store";
import { useRecoilState } from "recoil";
import Impound from "./Layouts/Impound/Impound";

debugData([
  {
    action: "vehImpound",
    data: {
      type: "impound_form",
      plate: "",
      props: {},
      vehicle: 224258,
    },
  },
  {
    action: "vehicledata",
    data: {
      // type: "impound",
      type: "garage",
      vehiclesList: [
        {
          title: "SULTAN",
          plate: "ESX KISS",
          speed: 200,
          body: 100,
          engine: 100,
          fuel: 85,
          status: "out",
          fine: 5000,
        },
        {
          title: "ADDER",
          plate: "ESX KISS",
          speed: 200,
          body: 70,
          engine: 10,
          fuel: 85,
          status: "out",
          fine: 5000,
        },
        {
          title: "BALLER",
          plate: "ESX KISS",
          speed: 200,
          body: 50,
          engine: 20,
          fuel: 45,
          status: "out",
          fine: 5000,
        },
        {
          title: "ALPHA",
          plate: "ESX KISS",
          speed: 200,
          body: 76,
          engine: 80,
          fuel: 85,
          status: "in",
          fine: 5000,
        },
        {
          title: "ARDENT",
          plate: "ESX KISS",
          speed: 200,
          body: 100,
          engine: 100,
          fuel: 85,
          status: "out",
          fine: 5000,
        },
        {
          title: "ASEA",
          plate: "ESX KISS",
          speed: 200,
          body: 100,
          engine: 100,
          fuel: 85,
          status: "in",
          fine: 5000,
        },
        {
          title: "ASTRON",
          plate: "ESX KISS",
          speed: 200,
          body: 100,
          engine: 100,
          fuel: 85,
          status: "out",
          fine: 5000,
        },
        {
          title: "ASTRON2",
          plate: "ESX KISS",
          speed: 200,
          body: 100,
          engine: 100,
          fuel: 85,
          status: "out",
          fine: 5000,
        },
        {
          title: "AUTARCH",
          plate: "ESX KISS",
          speed: 200,
          body: 100,
          engine: 100,
          fuel: 85,
          status: "out",
          fine: 5000,
        },
      ],
      spawnPoint: {
        x: 123.4,
        y: 456.7,
        z: 789.0,
        heading: 350,
      },
    },
  },
]);

const App: React.FC = () => {
  const [uiState, setUiState] = useRecoilState(ui_State);
  const [ivPlate, setIvPlate] = useRecoilState(iv_Plate);
  const [ivProps, setIvProps] = useRecoilState(iv_Props);
  const [ivVeh, setIvVeh] = useRecoilState(iv_Vehicle);

  useNuiEvent("vehImpound", (data) => {
    setUiState(data.type);
    setIvPlate(data.plate);
    setIvProps(data.props);
    setIvVeh(data.vehicle);
  });
  const [vehData, setVehData] = useRecoilState(vehicleDataAtom);
  const [spawnPoint, setSpawnPoint] = useRecoilState(SpawnPoint);
  const [ivRemainingTime, setIvRemainingTime] =
    useRecoilState(iv_RemainingTime);

  useNuiEvent("vehicledata", (data) => {
    const { vehiclesList, spawnPoint } = data;
    setVehData(vehiclesList);
    setSpawnPoint(spawnPoint);
    setUiState(data.type);
    {
      data.remainingTime && setIvRemainingTime(data.remainingTime);
    }
  });

  return (
    <>
      {uiState === "garage" && <Garage opened={true} />}
      {uiState === "impound_form" && <ImForm opened={true} />}
      {uiState === "impound" && <Impound opened={true} />}
    </>
  );
};

export default App;
