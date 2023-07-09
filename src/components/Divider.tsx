import { Divider } from "@mantine/core";
import React from "react";

interface CustomDividerProps {
  size?: number;
  color?: string;
}

export default function CustomDivider({
  size = 4,
  color = "blue",
}: CustomDividerProps) {
  return (
    <Divider
      size={size}
      color={color}
      sx={{ width: 32, borderRadius: 2, margin: "2px auto 8px" }}
    />
  );
}
