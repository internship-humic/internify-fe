// App.tsx / router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeInternPage from "../internify/intern/HomeInternPage";
import InternLayout from "../internify/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <InternLayout />,
    children: [
      { path: "home", element: <HomeInternPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}