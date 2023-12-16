import "./App.css";
import { Suspense, lazy } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loading from "@/components/Layout/Loading";

// jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
import Search from "./pages/Search";

// Components imports
const Layout = lazy(() => import("@/components/Layout"));
const Home = lazy(() => import("@/pages/Home"));
const Jobs = lazy(() => import("@/pages/Jobs"));
// const Search = lazy(() => import("@/pages/Search"));
// const History = lazy(() => import("@/pages/History"));
const JobDetail = lazy(() => import("@/pages/JobDetail"));
const SkillDetail = lazy(() => import("@/pages/SkillDetail"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "jobs", element: <Jobs /> },
        { path: "skill/:id", element: <SkillDetail /> },
        { path: "job/:id", element: <JobDetail /> },
        { path: "jobs/search", element: <Search /> },
        // { path: "history", element: <History /> },
      ],
    },
  ]);
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
