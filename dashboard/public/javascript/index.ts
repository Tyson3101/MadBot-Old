import { Guild } from "../../interfaces/Guild";

function serverPageRedirect(server: Guild) {
  window.location.replace(`/${server.id}`);
}
