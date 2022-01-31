import { Icons, Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import "@pankod/refine/dist/styles.min.css";
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "pages/categories";
import { CollectionCreate, CollectionEdit, CollectionList, CollectionShow } from "pages/collections";
import {
  RegionCreate,
  RegionEdit,
  RegionList,
  RegionShow
} from "pages/regions";
import { useTranslation } from "react-i18next";
import authProvider from "./auth-provider";
import { Header, Title } from "./components/layout";
import Config from "./config";
import simpleRestDataProvider from "./data-provider";
import { LoginPage } from "./pages/login";
import {
  ScopeCreate,
  ScopeEdit,
  ScopeList,
  ScopeShow
} from "./pages/scopes/index";

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
        {
          name: "regions",
          icon: <Icons.EnvironmentOutlined />,
          list: RegionList,
          show: RegionShow,
          edit: RegionEdit,
          create: RegionCreate,
          canDelete: true,
        },
        {
          name: "collections",
          icon: <Icons.TagsOutlined />,
          list: CollectionList,
          show: CollectionShow,
          edit: CollectionEdit,
          create: CollectionCreate,
          canDelete: true,
        },
        {
          name: "categories",
          icon: <Icons.BarsOutlined />,
          list: CategoryList,
          show: CategoryShow,
          edit: CategoryEdit,
          create: CategoryCreate,
          canDelete: true,
        },
      ]}
    />
  );
}

export default App;
