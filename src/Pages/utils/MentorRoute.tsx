// App.tsx / router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeMentorPage from "../internify/mentor/HomePage";
import {MentorLayout} from "../internify/mentor/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MentorLayout />,
    children: [
      { path: "home", element: <HomeMentorPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}