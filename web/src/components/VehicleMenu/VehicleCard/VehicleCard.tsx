import { useState } from "react";
import {
  Card,
  Text,
  Badge,
  Button,
  ScrollArea,
  SimpleGrid,
  Center,
  TextInput,
} from "@mantine/core";
import classes from "./VehicleCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { vehicleDataAtom, ItemData, selectedVehicleAtom } from "../../../store";
import { useLocales } from "../../../providers/LocaleProvider";

function VehicleCard() {
  const { locale } = useLocales();
  // icon for text input
  const icon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
  // vehData
  const [vehData, setvehData] = useRecoilState<ItemData[]>(vehicleDataAtom);
  const [selectedVehData, setSelectedVehData] = useRecoilState<ItemData | null>(
    selectedVehicleAtom,
  );

  // text input state handler
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = vehData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const items = filteredData.map((item) => {
    const vehicleName = item.title;
    return (
      <Card
        key={item.title}
        className={classes.card_ui}
        w={500}
        shadow='sm'
        padding='lg'>
        <Card.Section p={5}>
          <div className={classes.top_section}>
            <div className={classes.top_border}></div>
            <div className={classes.top_status}>
              <Text
                c={"white"}
                fw={500}
                tt={"uppercase"}>
                {item.title}
              </Text>
              <Badge
                size='lg'
                radius='sm'
                variant='white'
                color={item.status === "out" ? "red" : "green"}>
                {item.status}
              </Badge>
            </div>
            <Center>
              <img
                src={`https://gta-images.s3.fr-par.scw.cloud/vehicle/${vehicleName.toLowerCase()}.webp`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "./imgs/default.png";
                }}
                width='auto'
                height={180}
                alt={vehicleName.toLowerCase()}
              />
            </Center>
          </div>
        </Card.Section>

        <Button
          mt={10}
          size='md'
          className={classes.card_button}
          variant='light'
          radius='md'
          onClick={() => {
            setSelectedVehData(item);
          }}>
          {locale.ui_select}
        </Button>
      </Card>
    );
  });

  return (
    <>
      <Center>
        <TextInput
          pb={10}
          classNames={{
            root: `${classes.text_root}`,
            input: `${classes.text_input}`,
          }}
          leftSection={icon}
          variant='filled'
          size='md'
          radius='md'
          placeholder='Search vehicles'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />
      </Center>
      <ScrollArea
        h={620}
        // offsetScrollbars
        scrollbarSize={8}
        scrollHideDelay={0}>
        <Center>
          <SimpleGrid cols={3}>{items}</SimpleGrid>
        </Center>
      </ScrollArea>
    </>
  );
}

export default VehicleCard;
