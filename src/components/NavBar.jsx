import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SideNavBar, SideNavBarItem } from "./ui/SideNavBar";
import { GoHomeFill } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const handleItemClick = (id, path) => {
    setSelected(id);
    navigate(path);
  };

  return (
    <SideNavBar>
      <>
        <SideNavBarItem
          selected={selected === 0}
          id={0}
          setSelected={() => handleItemClick(0, "")}
        >
          <GoHomeFill />
        </SideNavBarItem>
        <SideNavBarItem
          selected={selected === 1}
          id={1}
          setSelected={() => handleItemClick(1, "/calendar")}
        >
          <FaCalendarAlt />
        </SideNavBarItem>
        <SideNavBarItem
          selected={selected === 2}
          id={2}
          setSelected={() => handleItemClick(2, "/profile")}
        >
          <FaUser />
        </SideNavBarItem>
      </>
    </SideNavBar>
  );
};

export default NavBar;
