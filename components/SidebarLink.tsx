'use client'
import Link from 'next/link';
import {Settings,User,Grid,Calendar} from "react-feather";
import { usePathname } from 'next/navigation'; 
import clsx from 'clsx';
const icons = {
  Settings,User,Grid,Calendar
}

const SidebarLink =({link})=>{
const path = usePathname();
let isActive = false;

if (path === link.link){
  isActive = true;
}
const Icon = icons[link.icon];
return(
  <Link href={link.link} className={clsx("flex items-center gap-2 p-2 rounded-md hover:bg-gray-200", { 'bg-gray-300': isActive })}>
    <Icon size={40} className={clsx("stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",isActive && 'stroke-violet-600')}/>
    <span className="text-sm">{link.name}</span>
  </Link>
)}
export default SidebarLink;