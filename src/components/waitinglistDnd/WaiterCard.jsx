import React from "react";
import { useDraggable, useDndMonitor } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function WaiterCard({ name, waiterKey }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: waiterKey,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  useDndMonitor({
    onDragEnd(event) {
      console.log("onDrag", event);
    },
  });

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div
        style={{
          height: "4rem",
          width: "14rem",
          backgroundColor: "white",
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "1rem",
        }}
      >
        {name}
        <div
          style={{
            marginTop: "0.25rem",
            backgroundColor: "lightgreen",
            borderRadius: "0.5rem",
            padding: "0.2rem",
          }}
        >
          0 min
        </div>
      </div>
    </div>
  );
}

export default WaiterCard;
