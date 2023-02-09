import './index.css'
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import RootsLayout from "./layouts/RootsLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MoviesOverview from "./pages/MoviesOverview";
import Profile from "./pages/Profile";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootsLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='movies' element={<MoviesOverview/>}/>

          <Route path='*' element={<NotFound />} />
        </Route>
    )
)

export default function App() {

  return (
      <RouterProvider router={router}/>
  )
}
