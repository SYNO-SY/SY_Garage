import { Box, Center, Transition } from "@mantine/core";
import Header from "..//../components/Header/Header";
import VehicleMenu from "../../components/VehicleMenu/VehicleMenu";
import classes from "../Garage/Garage.module.css";
import { useLocales } from "../../providers/LocaleProvider";

function Impound({ opened }: { opened: boolean }) {
  const { locale } = useLocales();
  return (
    <Center h={"100%"}>
      <Transition
        transition='slide-down'
        duration={100}
        timingFunction='ease-in-out'
        mounted={opened}>
        {(style) => (
          <Box
            style={style}
            className={classes.ui_menu}>
            <Header header={locale.ui_iv_heading} />
            <VehicleMenu />
          </Box>
        )}
      </Transition>
    </Center>
  );
}

export default Impound;
