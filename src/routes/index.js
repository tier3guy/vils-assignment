import { VideoPlayer } from "../pages";

const routes = [
  {
    path: "/",
    page: <VideoPlayer />,
    exact: true,
  },
  {
    path: "/video-player",
    page: <VideoPlayer />,
    exact: true,
  },
];

export default routes;
