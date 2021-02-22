
import io from "socket.io-client";
import config from '../config'

const ENDPOINT = config.SOCKET_URL;
const socket = io(ENDPOINT);

export default socket