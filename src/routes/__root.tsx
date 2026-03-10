import {
  AppShell,
  Box,
  Button,
  Flex,
  Group,
  Menu,

  Switch,

  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <Menu>
      <Menu.Target>
        <Button size="compact-sm" variant="transparent">
          {i18n.resolvedLanguage?.toUpperCase()}
        </Button>
      </Menu.Target>
    </Menu>
  );
}

function Nav() {
  return (
    <Menu
      shadow="sm"
      offset={-8}
      radius={0}
      position="bottom-start"
      width={200}
    >
      <Menu.Target>
        <Button variant="transparent" px={0} size="xl">
          <Group gap={0}>
            <IconCaretDownFilled />
          </Group>
        </Button>
      </Menu.Target>
    </Menu>
  );
}

function Logo() {
  return <img />;
}

function ThemeSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const isLight = computedColorScheme === "light";
  return (
    <Switch
      onClick={() => setColorScheme(isLight ? "dark" : "light")}
      checked={isLight}
      size="md"
      color="dark.4"
      withThumbIndicator={false}
      onLabel={<Title size="h5">☀️</Title>}
      offLabel={<Title size="h5">🌑</Title>}
    />
  );
}

function Header() {
  return (
    <Flex
      px="lg"
      direction="row"
      gap="lg"
      align="center"
      style={{ height: 45 }}
    >
      <Link style={{ textDecoration: "none" }} to="/">
        <Logo />
      </Link>
      <Nav />
      <Box style={{ flex: 1 }} />
      <LanguageSwitcher />
      <ThemeSwitcher />
    </Flex>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell padding="md" header={{ height: 45 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>

        {children}
      </AppShell.Main>
    </AppShell>
  );
}

interface RouteContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),

});
