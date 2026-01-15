import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export function AvatarGroup({ users = [], max = 3 }) {
  const visible = users.slice(0, max);
  const extra = users.length - max;

  return (
    <div className="flex -space-x-2">
      {visible.map((user) => (
        <Avatar key={user.id} className="h-8 w-8 border-2 border-white">
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
        </Avatar>
      ))}

      {extra > 0 && (
        <div className="h-8 w-8 rounded-full bg-slate-200 text-xs font-medium flex items-center justify-center border-2 border-white">
          +{extra}
        </div>
      )}
    </div>
  );
}
