import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "./boxlist.module.css";

type Item = {
  title: string;
  value: any;
  img: string;
};

interface BoxListProps {
  items: Item[];
  onItemSelected: (value: any) => void;
  selected?: string;
}

export function BoxList({ items, onItemSelected, selected }: BoxListProps) {
  const [selectedItem, setSelectedItem] = React.useState<any>(selected);

  const handleItemClick = (value: any) => {
    setSelectedItem(value);
    onItemSelected(value);
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {items.map((item, index) => (
        <Box
          key={`a_${index}`}
          className={style.itembox}
          sx={{
            display: "block",
            border: 1.5,
            borderColor: (theme) =>
              selectedItem === item.value
                ? theme.palette.primary.main
                : "#bdbdbd",
          }}
        >
          <Box
            key={index}
            className={style.item}
            onClick={() => handleItemClick(item.value)}
          >
            <Box className={style.image}>
              <img src={item.img} alt={item.title} />
            </Box>
            <Typography
              sx={{
                lineHeight: 1.2,
                fontWeight: "500",
                "@media (max-width: 600px)": {
                  fontSize: "0.65rem",
                },
              }}
              variant="caption"
            >
              {item.title}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
