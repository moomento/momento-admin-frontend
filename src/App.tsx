import { Icons, Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import simpleRestDataProvider from "@pankod/refine-simple-rest";
import "@pankod/refine/dist/styles.min.css";
import { useTranslation } from "react-i18next";
import authProvider from "./auth-provider";
import { Header, Title } from "./components/layout";
import { LoginPage } from "./pages/login";
import { PostCreate, PostEdit, PostList, PostShow } from "./pages/posts/index";

function App() {
  const { t, i18n } = useTranslation();

  const API_URL = "https://api.fake-rest.refine.dev";
  const dataProvider = simpleRestDataProvider(API_URL);

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
          name: "posts",
          icon: <Icons.BookOutlined />,
          list: PostList,
          show: PostShow,
          edit: PostEdit,
          create: PostCreate,
          canDelete: true,
        },
      ]}
    />
  );
}

export default App;
