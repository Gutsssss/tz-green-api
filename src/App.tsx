import { BrowserRouter } from "react-router";
import { NavigationPanel } from "./components/Navigation/NavigationPanel";
import { AppRouter } from "./Routing/Router";
import { NotificationProvider } from "./components/NotificationProvider/NotificationProvider";

export const App = () => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <div className="appContainer">
          <NavigationPanel />

          <div className="mainContent">
            <AppRouter />
          </div>
        </div>
      </NotificationProvider>
    </BrowserRouter>
  );
};
