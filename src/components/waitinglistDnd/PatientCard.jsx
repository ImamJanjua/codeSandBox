import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function PatientsCard({ patientKey, name }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: patientKey,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div
        style={{
          backgroundColor: "lightblue",
          height: "4rem",
          width: "14rem",
          borderRadius: "1rem",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {name}
      </div>
    </div>
  );
}

export default PatientsCard;
