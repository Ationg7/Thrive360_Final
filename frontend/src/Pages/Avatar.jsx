import React, { useMemo } from "react";

const BRAND_COLORS = [
    "#2e7d32",
    "#43a047",
    "#1b5e20",
    "#66bb6a",
    "#a5d6a7",
    "#ffffff",
];

function getInitialsFromEmail(email) {
    if (!email || typeof email !== "string") return "";
    const local = email.split("@")[0] || "";
    const letters = local.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
    return letters || "U";
}

export default function Avatar({ email, name, size, className, style }) {
    const initials = useMemo(() => {
        if (email) return getInitialsFromEmail(email);
        if (name && typeof name === "string") return name.slice(0, 2).toUpperCase();
        return "U";
    }, [email, name]);

    const bgColor = useMemo(() => {
        const index = initials.charCodeAt(0) % BRAND_COLORS.length;
        let color = BRAND_COLORS[index];
        if (color === "#ffffff") color = "#2e7d32";
        return color;
    }, [initials]);

    const computedStyle = {
        backgroundColor: bgColor,
        color: "#ffffff",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "uppercase",
        ...(size ? { width: size, height: size, borderRadius: "50%" } : {}),
        ...style,
    };

    return (
        <div className={["avatar", className].filter(Boolean).join(" ")} style={computedStyle}>
            {initials}
        </div>
    );
}

 

