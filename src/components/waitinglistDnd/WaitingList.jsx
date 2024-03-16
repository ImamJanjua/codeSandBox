import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function WaitingList(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "waitingList",
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Sheet open modal={false}>
        <SheetTrigger asChild>
          <button>Open</button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>WaitingList</SheetTitle>
          </SheetHeader>
          {props.children}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default WaitingList;

// import React from "react";
// import { useDroppable } from "@dnd-kit/core";

// function WaitingList(props) {
//   const { isOver, setNodeRef } = useDroppable({
//     id: "waitingList",
//   });
//   const style = {
//     opacity: isOver ? "0.75" : undefined,
//   };

//   return (
//     <div ref={setNodeRef} style={style}>
//       {/* List background */}
//       <div
//         style={{
//           backgroundColor: "lightgray",
//           height: "85vh",
//           width: "16rem",
//           borderRadius: "1rem",
//           padding: "1rem",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         {/*  title */}
//         <h3>Waiting List</h3>

//         {/* Waiter card */}
//         <div
//           style={{
//             flexDirection: "column",
//             paddingTop: "2rem",
//           }}
//         >
//           {props.children}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WaitingList;
