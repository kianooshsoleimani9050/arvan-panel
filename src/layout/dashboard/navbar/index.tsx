import { Navbar as BsNavbar, Button, Stack } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import MobileMenu from "../menu/MobileMenu";

const Navbar = () => {
  const { logout, user } = useAuth();
  return (
    <BsNavbar bg="dark" expand="sm">
      <Stack direction="horizontal" className="w-100 px-3">
        <BsNavbar.Brand as={"div"}>
          <Stack className="flex-column flex-md-row" gap={3}>
            <h4 className="p-0 m-0 text-white">Arvan Challenge</h4>
            <small className="p-0 m-0 text-white">
              Welcome {user?.user.username}
            </small>
          </Stack>
        </BsNavbar.Brand>
        <BsNavbar.Toggle className="bg-white ms-auto" />
        <BsNavbar.Offcanvas>
          <MobileMenu />
        </BsNavbar.Offcanvas>
        <Button
          variant="outline-info"
          className="ms-auto d-none d-sm-inline"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </Stack>
    </BsNavbar>
  );
};
export default Navbar;
