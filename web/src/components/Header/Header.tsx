import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Group, Image, Text } from "@mantine/core";
import React from "react";
import { fetchNui } from "../../utils/fetchNui";

// Header Image data
const img_data = {
  src: "https://sydev.in/image/sy_scripts.png",
  alt: "SY_Dev",
};

interface HeaderProps {
  header: string;
}

const Header: React.FC<HeaderProps> = ({ header }) => {
  function CloseMenu() {
    fetchNui("hide-ui");
  }

  return (
    <Group
      justify='space-between'
      style={{ padding: "5px", borderBottom: "1px solid #ffffff26" }}>
      <Image
        height={50}
        src={img_data.src}
        alt={img_data.alt}
      />
      <Text
        style={{ fontSize: "41px", fontWeight: 600 }}
        tt='uppercase'>
        {header}
      </Text>
      <ActionIcon
        style={{ boxShadow: "rgba(169, 84, 255, 0.552) 0px 4px 24px" }}
        onClick={CloseMenu}
        size='xl'
        variant='light'
        radius='lg'
        aria-label='Close'>
        <FontAwesomeIcon icon={faXmark} />
      </ActionIcon>
    </Group>
  );
};

export default Header;
