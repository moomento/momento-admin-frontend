import { Icons, Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import simpleRestDataProvider from "./data-provider";
import "@pankod/refine/dist/styles.min.css";
import { useTranslation } from "react-i18next";
import authProvider from "./auth-provider";
import { Header, Title } from "./components/layout";
import { LoginPage } from "./pages/login";
import { ScopeCreate, ScopeEdit, ScopeList, ScopeShow } from "./pages/scopes/index";
import Config from "./config";

function App() {
  const { t, i18n } = useTranslation();

  const dataProvider = simpleRestDataProvider(Config.apiUrl);

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <Refine
      authProvider={authProvider}
      routerProvider={routerProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      LoginPage={LoginPage}
      Title={Title}
      Header={Header}
      resources={[
        {
          name: "scopes",
          icon: <Icons.BookOutlined />,
          list: ScopeList,
          show: ScopeShow,
          edit: ScopeEdit,
          create: ScopeCreate,
          canDelete: true,
        },
      ]}
    />
  );
}

export default App;
