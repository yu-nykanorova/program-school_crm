import {useAppDispatch} from "./store/hooks/useAppDispatch.tsx";
import {useAppSelector} from "./store/hooks/useAppSelector.tsx";
import {useEffect} from "react";
import {getFromLocalStorage} from "./utils/localStorage.ts";
import type {ITokenPair} from "./interfaces/IAuth.ts";
import {authSliceActions} from "./store/slices/authSlice.ts";
import {RouterProvider} from "react-router-dom";
import {routes} from "./router/routes.tsx";
import {Loader} from "./components/ui/Loader.tsx";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthChecked } = useAppSelector(({ authSlice }) => authSlice);

  useEffect(() => {
    const tokens = getFromLocalStorage<ITokenPair>("tokens");

    if (tokens) {
      dispatch(authSliceActions.loadMe());
    } else {
      dispatch(authSliceActions.setAuthChecked());
    }

  }, [dispatch]);

  if (!isAuthChecked) {
    return <Loader />;
  }

  return <RouterProvider router={routes} />;
}

export default App;
