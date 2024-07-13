import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import App from "./App";
import { isEnvBrowser } from "./utils/misc";
import { VisibilityProvider } from "./providers/VisibilityProvider";
import { debugData } from "./utils/debugData";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import LocaleProvider from "./providers/LocaleProvider";
import { RecoilRoot } from "recoil";
import { Notifications } from "@mantine/notifications";

debugData([
  {
    action: "setVisible",
    data: "show-ui",
  },
]);

if (isEnvBrowser()) {
  const root = document.getElementById("root");

  // https://i.imgur.com/iPTAdYV.png - Night time img
  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")';
  root!.style.backgroundSize = "cover";
  root!.style.backgroundRepeat = "no-repeat";
  root!.style.backgroundPosition = "center";
}

const root = document.getElementById("root");
ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <RecoilRoot>
      <VisibilityProvider>
        <LocaleProvider>
          <MantineProvider
            defaultColorScheme='dark'
            theme={{ ...theme }}>
            <Notifications
              position='top-right'
              zIndex={1000}
            />
            <App />
          </MantineProvider>
        </LocaleProvider>
      </VisibilityProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
