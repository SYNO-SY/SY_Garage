import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Group, Text } from "@mantine/core";
import { useLocales } from "../../providers/LocaleProvider";
import { fetchNui } from "../../utils/fetchNui";

function Header() {
  // locale provider
  const { locale } = useLocales();

  // function to close the Menu
  function CloseMenu() {
    fetchNui("hide-ui");
  }

  return (
    <>
      <Group
        justify='space-between'
        style={{ padding: "5px", borderBottom: "1px solid #ffffff26" }}>
        <div></div>
        <Text
          style={{ fontSize: "24px", fontWeight: 400 }}
          tt={"uppercase"}>
          {locale.ui_iv_form_heading}
        </Text>
        <ActionIcon
          style={{ boxShadow: "rgba(169, 84, 255, 0.552) 0px 4px 24px" }}
          onClick={() => {
            CloseMenu();
          }}
          size={"xl"}
          radius='lg'
          aria-label='Close'>
          <FontAwesomeIcon icon={faXmark} />
        </ActionIcon>
      </Group>
    </>
  );
}

export default Header;
