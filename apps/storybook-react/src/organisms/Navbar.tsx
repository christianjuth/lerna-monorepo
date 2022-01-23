import { Navbar } from "@christianjuth/ui";

export function NavbarExample(props: Partial<Navbar.Props>) {
  return (
    <Navbar
      logo="Logo"
      leftItems={[
        { link: { children: "Google", href: "//google.com" } },
        { link: { children: "Apple", href: "//apple.com" } },
      ]}
      rightItems={[{ search: {} }]}
      {...props}
    />
  );
}
