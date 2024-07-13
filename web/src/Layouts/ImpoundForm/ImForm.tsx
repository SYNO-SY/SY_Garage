import { useState } from "react";
import {
  Box,
  Button,
  Center,
  NumberInput,
  Select,
  TextInput,
  Transition,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import classes from "./ImForm.module.css";
import IvHeader from "./IvHeader";
import { fetchNui } from "../../utils/fetchNui";
import { debugData } from "../../utils/debugData";
import { useRecoilState } from "recoil";
import { iv_Plate, iv_Props, iv_Vehicle } from "../../store";

debugData([
  {
    action: "ImpoundData",
    data: {
      plate: "ESX KISS",
      spawnPoint: {
        x: 123.4,
        y: 456.7,
        z: 789.0,
        heading: 350,
      },
      vehProps: {},
    },
  },
]);

interface ImpoundData {
  reason: string;
  ivTime: string | null;
  cost: string | number;
}

function ImForm({ opened }: { opened: boolean }) {
  const [formData, setFormData] = useState<ImpoundData>({
    reason: "",
    ivTime: null,
    cost: 0,
  });
  const [ivPlate, setIvPlate] = useRecoilState(iv_Plate);
  const [ivProps, setIvProps] = useRecoilState(iv_Props);
  const [ivVeh, setIvVeh] = useRecoilState(iv_Vehicle);

  const handleImpound = async () => {
    if (formData.ivTime !== null) {
      try {
        const ImpData = {
          formData,
          ivProps,
          ivPlate,
          ivVeh,
        };
        fetchNui("Impound", ImpData);
        setFormData({
          reason: "",
          ivTime: null,
          cost: "0",
        });
        setIvPlate("");
      } catch (error) {
        notifications.show({
          title: "Impound System",
          message: "An error occurred while impounding the vehicle",
          autoClose: 5000,
          classNames: classes,
          radius: "md",
        });
      }
    } else {
      notifications.show({
        title: "Impound System",
        message: "Impound time shouldn't be empty",
        autoClose: 5000,
        classNames: classes,
        radius: "md",
      });
    }
  };

  const handleChange = (field: keyof ImpoundData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Center h={"100%"}>
      <Transition
        transition='slide-down'
        duration={100}
        timingFunction='ease-in-out'
        mounted={opened}>
        {(style) => (
          <Box className={classes.ui_menu}>
            <IvHeader />
            <Box p={10}>
              <TextInput
                mt={10}
                size='md'
                variant='filled'
                radius='md'
                label='Vehicle Plate'
                value={ivPlate}
                classNames={{
                  input: classes.text_input,
                }}
                readOnly
              />
              <TextInput
                size='md'
                mt={10}
                variant='filled'
                radius='md'
                label='Reason (optional)'
                placeholder='Enter the reason'
                value={formData.reason}
                onChange={(event) =>
                  handleChange("reason", event.currentTarget.value)
                }
                classNames={{
                  input: classes.text_input,
                }}
              />
              <Select
                size='md'
                variant='filled'
                radius='md'
                label='Impound Time'
                placeholder='Pick Impound time'
                data={[
                  { value: "0", label: "Available immediately" },
                  { value: "60", label: "1 hour" },
                  { value: "240", label: "4 hours" },
                  { value: "720", label: "12 hours" },
                  { value: "1440", label: "1 day" },
                  { value: "4320", label: "3 days" },
                  { value: "10080", label: "7 days" },
                ]}
                value={formData.ivTime}
                onChange={(value) => handleChange("ivTime", value)}
                maxDropdownHeight={130}
                classNames={{
                  input: classes.text_input,
                  dropdown: classes.select_dropdown,
                }}
              />
              <NumberInput
                size='md'
                variant='filled'
                radius='md'
                label='Cost'
                placeholder='Enter the amount'
                value={formData.cost}
                onChange={(value) => handleChange("cost", value ?? undefined)}
                classNames={{
                  input: classes.text_input,
                }}
              />
              <Button
                variant='filled'
                size='md'
                radius='lg'
                mt={20}
                onClick={handleImpound}>
                Impound
              </Button>
            </Box>
          </Box>
        )}
      </Transition>
    </Center>
  );
}

export default ImForm;
