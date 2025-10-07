import React from "react";
import { getInitialsFromEmail, getInitialsFromName, pickBrandColors } from "../utils/avatar";

export default function Avatar({ email, name, size = 40, style = {}, className = "" }) {
  const initials = email ? getInitialsFromEmail(email) : getInitialsFromName(name);
  const seed = email || name || "thrive360";
  const { backgroundColor, color, border } = pickBrandColors(seed);



  const diameter = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className={className}
      style={{
        width: diameter,
        height: diameter,
        borderRadius: "50%",
        backgroundColor,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: Math.max(12, Math.floor((parseInt(size, 10) || 40) * 0.4)),
        userSelect: "none",
        lineHeight: 1,
        border,
        ...style,
      }}
      aria-label="User avatar"
      title={email || name}
    >
      {initials}
    </div>
  );
}



