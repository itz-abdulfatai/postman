import type { AvatarProps } from "../../../types";

function Avatar({
  src = "default-avatar.png",
  alt = "User Avatar",
}: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-5 h-5 rounded-full"
      draggable={false}
    />
  );
}

export default Avatar;
