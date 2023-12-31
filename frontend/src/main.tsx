import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";
import Root from "./Root";
import "./index.css";

// pages
import Dashboard from "./pages/dashboard";
import Summary from "./pages/summary";
import MeetingStatus from "./pages/meetingstatus";
// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

// const authRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: 'auth',
//   component: AuthLayout,

// })

// const loginRoute = new Route({
//   getParentRoute: () => authRoute,
//   path: 'login',
//   component: Login,
// })

// const uploadAudioRoute = new Route({
//   getParentRoute: () => rootRoute,
//   path: "upload-audio",
//   component: () => <UploadAudioPage />,
// });

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const summaryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "summary",
  component: Summary,
});

const meetingStatusRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "meetingstatus",
  component: MeetingStatus,
});

indexRoute.addChildren([summaryRoute, meetingStatusRoute]);

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute]);

// Create the router using your route tree
const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render our app!
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
