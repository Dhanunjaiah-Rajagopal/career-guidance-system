import {
  Navbar,
  NavbarBrand,
  // NavbarMenuToggle,
  // NavbarMenuItem,
  // NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { Logo } from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import Container from "../container/Container";
import authService from "@/appwrite/auth";
import { logout } from "@/store/authSlice";
import { ModeToggle } from "../mode-toggle";
import { useEffect, useState } from "react";

export default function Header() {
  interface User {
    email: string;
    name: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authStatus) {
      authService.getCurrentUser()
        .then(userData => setUser(userData))
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [authStatus]);
  
  interface MenuItem {
    name: string;
    slug: string;
    active: boolean;
  }

  const menuItems: MenuItem[] = [
    { name: "Home", slug: "home", active: true },
    { name: "Features", slug: "features", active: true },
    { name: "Foundation", slug: "foundation", active: true },
    { name: "GetStarted", slug: "get-started", active: true }
  ];

  const authItems: MenuItem[] = [
    { name: "Home", slug: "home", active: true },
    { name: "Features", slug: "features", active: true },
    { name: "Foundation", slug: "foundation", active: true },
    { name: "GetStarted", slug: "get-started", active: true }
  ];

  const logoutHandler = async (): Promise<void> => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <Container>
      <Navbar
        isBordered
        className="fixed top-0 backdrop-blur-md bg-background/80 border-b border-divider "
        maxWidth="xl"
      >
        {/* Brand Section */}
        <NavbarContent justify="start">
        <NavbarBrand>
            <Link color="foreground" href="/" aria-label="Career Pro">
              <Logo />
              <p className="font-bold text-inherit">CAREER PRO</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop Navigation */}
        <NavbarContent
          className="hidden sm:flex gap-4 transition-opacity duration-200"
          justify="center"
        >
          {(authStatus ? authItems : menuItems).map(
            (item) =>
              item.active && (
                <NavbarItem key={item.name}>
                  <Link color="foreground" href={`#${item.slug}`} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>

                </NavbarItem>
              )
          )}
        </NavbarContent>

        {/* Right Side - Dark Mode Toggle and User Actions */}
        <NavbarContent justify="end" >
          <NavbarItem>
            <ModeToggle />
          </NavbarItem>

          {/* Sign In Button */}
          {!authStatus && (
            <NavbarItem className="hidden sm:block">
              <Button as={Link} color="warning" href="/login" variant="flat">
                Sign In
              </Button>
            </NavbarItem>
          )}

          {/* Authenticated User Dropdown */}
          {authStatus && (
            <NavbarItem className="hidden sm:block">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform hover:scale-105"
                    color="secondary"
                    size="md"
                    src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Profile Actions"
                  variant="flat"
                  className="transition-all duration-200"
                >
                   <DropdownItem key="profile" href="/profile" className="gap-2">
                      <p className="font-semibold">{user?.name || 'Loading...'}</p>
                      <p className="font-semibold">{user?.email || 'Loading...'}</p>
                    </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="warning"
                    variant="flat"
                    onClick={logoutHandler}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </Container>
  );
}
