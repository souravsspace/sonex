import {
  Add01Icon,
  Alert01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy01Icon,
  Delete01Icon,
  Download01Icon,
  Edit01Icon,
  EyeIcon,
  EyeOff,
  File01Icon,
  Folder01Icon,
  GitBranchIcon,
  Home01Icon,
  InformationCircleIcon,
  Loading03Icon,
  LogoutSquare01Icon,
  Message02Icon,
  Moon02Icon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  Search01Icon,
  Settings01Icon,
  Sun01Icon,
  Tick02Icon,
  Upload01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import type { HugeiconsProps } from "@hugeicons/react";
import { HugeiconsIcon } from "@hugeicons/react";

// Re-export raw icon data under semantic names for tree-shaking
export const ThreadIconData = Message02Icon;
export const SettingsIconData = Settings01Icon;
export const PlusIconData = Add01Icon;
export const CloseIconData = Cancel01Icon;
export const BranchIconData = GitBranchIcon;
export const CheckIconData = Tick02Icon;
export const BackIconData = ArrowLeft01Icon;
export const ForwardIconData = ArrowRight01Icon;
export const SearchIconData = Search01Icon;
export const FileIconData = File01Icon;
export const FolderIconData = Folder01Icon;
export const HomeIconData = Home01Icon;
export const DeleteIconData = Delete01Icon;
export const EditIconData = Edit01Icon;
export const CopyIconData = Copy01Icon;
export const DownloadIconData = Download01Icon;
export const UploadIconData = Upload01Icon;
export const UserIconData = UserIcon;
export const LogoutIconData = LogoutSquare01Icon;
export const InfoIconData = InformationCircleIcon;
export const WarningIconData = Alert01Icon;
export const SuccessIconData = CheckmarkCircle01Icon;
export const SpinIconData = Loading03Icon;
export const DarkModeIconData = Moon02Icon;
export const LightModeIconData = Sun01Icon;
export const ShowIconData = EyeIcon;
export const HideIconData = EyeOff;
export const MoreHorizontalIconData = MoreHorizontalIcon;
export const MoreVerticalIconData = MoreVerticalIcon;
export const ChevronDownIconData = ChevronDown;
export const ChevronRightIconData = ChevronRight;
export const ChevronLeftIconData = ChevronLeft;
export const ChevronUpIconData = ChevronUp;

// Reusable semantic icon components
type IconProps = Omit<HugeiconsProps, "icon">;

export function ThreadIcon(props: IconProps) {
  return <HugeiconsIcon icon={Message02Icon} {...props} />;
}

export function SettingsIcon(props: IconProps) {
  return <HugeiconsIcon icon={Settings01Icon} {...props} />;
}

export function PlusIcon(props: IconProps) {
  return <HugeiconsIcon icon={Add01Icon} {...props} />;
}

export function CloseIcon(props: IconProps) {
  return <HugeiconsIcon icon={Cancel01Icon} {...props} />;
}

export function BranchIcon(props: IconProps) {
  return <HugeiconsIcon icon={GitBranchIcon} {...props} />;
}

export function CheckIcon(props: IconProps) {
  return <HugeiconsIcon icon={Tick02Icon} {...props} />;
}

export function SearchIcon(props: IconProps) {
  return <HugeiconsIcon icon={Search01Icon} {...props} />;
}

export function UserProfileIcon(props: IconProps) {
  return <HugeiconsIcon icon={UserIcon} {...props} />;
}

// File icon lookup by language/extension
const languageColorMap: Record<string, string> = {
  ts: "text-blue-400",
  tsx: "text-blue-500",
  js: "text-yellow-400",
  jsx: "text-yellow-500",
  rs: "text-orange-500",
  py: "text-green-400",
  go: "text-cyan-400",
  md: "text-gray-400",
  json: "text-yellow-300",
  toml: "text-orange-300",
  css: "text-pink-400",
  html: "text-orange-400",
  sh: "text-green-300",
  yaml: "text-red-300",
  yml: "text-red-300",
};

interface FileIconProps extends IconProps {
  filename?: string;
  language?: string;
}

export function FileIcon({
  filename,
  language,
  className,
  ...props
}: FileIconProps) {
  const ext = language ?? filename?.split(".").pop() ?? "";
  const colorClass = languageColorMap[ext] ?? "text-muted-foreground";

  return (
    <HugeiconsIcon
      className={`${colorClass} ${className ?? ""}`}
      icon={File01Icon}
      {...props}
    />
  );
}
