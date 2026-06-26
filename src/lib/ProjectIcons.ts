import {
  LuClipboardList,
  LuLightbulb,
  LuShield,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { MdOutlineInsertChart } from "react-icons/md";
import { IoMdCode, IoMdCloudOutline  } from "react-icons/io";
import { CiMobile3 } from "react-icons/ci";
import { RiSettings3Fill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { PiSpeedometer } from "react-icons/pi";

export const PROJECT_ICON_MAP: Record<string, IconType> = {
  code: IoMdCode,
  chart: MdOutlineInsertChart,
  cloud: IoMdCloudOutline,
  mobile: CiMobile3,
  gear: RiSettings3Fill,
  users:FiUsers,
  clipboard:   LuClipboardList,
  speedometer: PiSpeedometer,
  lightbulb:   LuLightbulb,
  shield:      LuShield,
};

export const PROJECT_ICON_CODES = Object.keys(PROJECT_ICON_MAP);

export const getProjectIcon = (code: string): IconType =>
  PROJECT_ICON_MAP[code] ?? IoMdCode;