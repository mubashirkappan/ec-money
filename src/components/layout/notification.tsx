import { Bell } from "lucide-react"

export function NotificationIcon() {

  return (
    <button
      className="
        fixed
        top-6
        right-4
        z-50
        size-12
        rounded-full
        bg-slate-500
        text-slate-100
        shadow-lg
        flex
        items-center
        justify-center
        cursor-pointer
        select-none
      "
    >
      <Bell />
    </button>
  );
}