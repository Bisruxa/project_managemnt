import { link } from 'fs'
import Card from './Card'
import SidebarLink from './SidebarLink'
const links = [
  {
    label: "Home",
    icon: "Home",
    link: "/home",
  },
  {
    label: "Profile",
    icon: "User",
    link: "/profile",
  },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
];
const Sidebar =()=>{
  <Card className="h-full w-40 flex items-center justify-center flex-wrap">{
links.map((link)=>(
  <SidebarLink link={link}/>
))}</Card>
}
export default Sidebar;