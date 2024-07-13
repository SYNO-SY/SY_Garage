import {
  Text,
  Progress,
  Group,
  Flex,
  Image,
  Center,
  Button,
} from "@mantine/core";
import classes from "../Vehiclemenu.module.css";
import { useRecoilState } from "recoil";
import {
  ItemData,
  iv_RemainingTime,
  selectedVehicleAtom,
  SpawnPoint,
  ui_State,
} from "../../../store";
import { useLocales } from "../../../providers/LocaleProvider";
import { fetchNui } from "../../../utils/fetchNui";

const plate_Data = {
  src: "./imgs/plate_san_andreas.png",
  alt: "plate",
};

function VDetailMenu() {
  const { locale } = useLocales();
  const [uiState, setUiState] = useRecoilState(ui_State);
  const [selectedVehData, setSelectedVehData] = useRecoilState<ItemData | null>(
    selectedVehicleAtom,
  );
  const [ivRemainingTime, setIvRemainingTime] =
    useRecoilState(iv_RemainingTime);
  const [spawnPoint, setSpawnPoint] = useRecoilState(SpawnPoint);

  const veh_body = () => {
    const x = selectedVehData?.body || 0;
    const y = x / 100;
    return y;
  };
  const veh_engine = () => {
    const x = selectedVehData?.engine || 0;
    const y = x / 100;
    return y;
  };

  const renderProgress = (label: string, value: number) => (
    <>
      <Group
        justify='space-between'
        mt={10}>
        <Text c={"dimmed"}>{label}</Text>
        {label === locale.ui_text_speed ? (
          <Text c={"dimmed"}>{`${value}KmH`}</Text>
        ) : (
          <Text c={"dimmed"}>{`${value}%`}</Text>
        )}
      </Group>
      <Progress
        transitionDuration={200}
        value={value}
      />
    </>
  );
  return (
    <>
      {selectedVehData && (
        <Flex
          mt={10}
          gap='lg'>
          <div
            style={{
              width: "250px",
            }}>
            <Text
              className={classes.heading_text}
              fw={600}
              ta={"center"}
              tt={"uppercase"}
              size='xl'>
              {locale.ui_specification}
            </Text>
            <div>
              {renderProgress(locale.ui_text_body, veh_body())}
              {renderProgress(locale.ui_text_engine, veh_engine())}
              {renderProgress(locale.ui_text_fuel, selectedVehData.fuel)}
              {renderProgress(locale.ui_text_speed, selectedVehData.speed)}
            </div>
          </div>
          {/* Plate */}
          <div
            style={{
              marginLeft: "20px",
              width: "250px",
            }}>
            <Text
              className={classes.heading_text}
              fw={600}
              ta={"center"}
              tt={"uppercase"}
              size='xl'>
              {locale.ui_plate}
            </Text>
            <div className={classes.plate_container}>
              <Center h={204.2}>
                <Text
                  mt={20}
                  fw={600}
                  size='xl'
                  c={"dark"}
                  className={classes.plate_text}>
                  {selectedVehData?.plate}
                </Text>
                <Image
                  src={plate_Data.src}
                  alt={plate_Data.alt}></Image>
              </Center>
            </div>
          </div>
          {/* button to take out */}
          {uiState === "garage" ? (
            <div
              style={{
                marginLeft: "20px",
                width: "250px",
              }}>
              <Center h={237.2}>
                {selectedVehData.status === "out" ? (
                  <Button
                    variant='light'
                    size='xl'
                    radius='lg'
                    fullWidth
                    disabled
                    className={classes.button}
                    onClick={(e) => {
                      e.preventDefault();
                    }}>
                    {locale.ui_take_out}
                  </Button>
                ) : (
                  <Button
                    className={classes.button}
                    variant='light'
                    size='xl'
                    radius='lg'
                    fullWidth
                    onClick={() => {
                      const sendData = {
                        selectedVehData,
                        spawnPoint,
                      };
                      fetchNui("selectedVeh", sendData);
                      fetchNui("hide-ui");
                    }}>
                    {locale.ui_take_out}
                  </Button>
                )}
              </Center>
            </div>
          ) : (
            // impound Details
            <>
              <div
                style={{
                  width: "250px",
                }}>
                <Flex
                  justify='center'
                  align='center'
                  direction='column'>
                  <Text
                    className={classes.heading_text}
                    fw={600}
                    tt={"uppercase"}
                    size='xl'>
                    {locale.ui_fine_text}
                  </Text>
                  <Center h={170}>
                    <div className={classes.fine_card}>
                      <Flex
                        p={5}
                        direction='column'
                        wrap='wrap'>
                        <Text
                          className={classes.fine_text}
                          ta={"center"}
                          c={"lime"}
                          fz={"40px"}
                          fw={500}>
                          {`$${selectedVehData.fine}`}
                        </Text>
                      </Flex>
                    </div>
                  </Center>
                </Flex>
              </div>
              {/* iv Button */}
              <div
                style={{
                  marginLeft: "20px",
                }}>
                <Center h={237.2}>
                  {ivRemainingTime.time === 0 ? (
                    <Button
                      tt={"uppercase"}
                      variant='light'
                      size='xl'
                      radius='lg'
                      onClick={() => {
                        const Fine = selectedVehData.fine;
                        const sendData = {
                          selectedVehData,
                          spawnPoint,
                          Fine,
                        };
                        fetchNui("impound_pay", sendData);
                      }}
                      className={classes.button}>
                      {locale.ui_iv_pay}
                    </Button>
                  ) : (
                    <Button
                      tt={"uppercase"}
                      variant='light'
                      size='xl'
                      radius='lg'
                      disabled
                      className={classes.button}>
                      {`${ivRemainingTime?.string} Remaining`}
                    </Button>
                  )}
                </Center>
              </div>
            </>
          )}
          {/* button to share key */}
          {uiState === "garage" && (
            <div
              style={{
                marginLeft: "20px",
                width: "250px",
              }}>
              <Center h={237.2}>
                {selectedVehData.status === "out" ? (
                  <Button
                    variant='light'
                    size='xl'
                    radius='lg'
                    fullWidth
                    disabled
                    className={classes.button}
                    onClick={(e) => {
                      e.preventDefault();
                    }}>
                    {locale.ui_share_key}
                  </Button>
                ) : (
                  <Button
                    className={classes.button}
                    variant='light'
                    size='xl'
                    radius='lg'
                    fullWidth
                    disabled
                    onClick={() => {
                      fetchNui("selectedVehShare", selectedVehData);
                      fetchNui("hide-ui");
                    }}>
                    {locale.ui_share_key}
                  </Button>
                )}
              </Center>
            </div>
          )}
        </Flex>
      )}
    </>
  );
}

export default VDetailMenu;
