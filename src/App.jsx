import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import PatientsCard from "./components/waitinglistDnd/PatientCard";
import WaitingList from "./components/waitinglistDnd/WaitingList";
import WaiterCard from "./components/waitinglistDnd/WaiterCard";

const initailPatients = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
  {
    id: 3,
    name: "Tom Smith",
  },
  {
    id: 4,
    name: "Jerry Smith",
  },
];

function App() {
  const [patients, setPatients] = useState(initailPatients);
  const [waiters, setWaiters] = useState([]);

  const [animationParent] = useAutoAnimate();

  // handling the drag end
  function handleDragEnd(event) {
    const { over, active } = event;
    const activeIdParts = active.id.split("-");
    const itemType = activeIdParts[0];
    const itemId = parseInt(activeIdParts[1]);

    if (over && over.id === "waitingList" && itemType === "patient") {
      // The card has been dragged into the WaitingList
      const activePatient = patients.find((p) => p.id === itemId);
      const index = patients.findIndex((p) => p.id === itemId);

      setWaiters((waiters) => [...waiters, activePatient]);

      // Remove the patient from the list
      setPatients((patients) =>
        patients.filter((p) => p.id !== activePatient.id)
      );
    } else if (itemType === "waiter" && (!over || over.id !== "waitingList")) {
      // The card has been dragged into the WaitingList
      const activeWaitingPatient = waiters.find((p) => p.id === itemId);
      const index = waiters.findIndex((p) => p.id === itemId);

      // The card has been dragged outside of the WaitingList
      setWaiters((waiters) => waiters.filter((waiter) => waiter.id !== itemId));
    }
  }

  function undo({ action, patient, index }) {
    if (action === "addBacktoPatients") {
      setPatients((prevPatients) => {
        const newPatients = [...prevPatients];
        newPatients.splice(index, 0, patient);
        return newPatients;
      });
      setWaiters((prevWaiters) =>
        prevWaiters.filter((p) => p.id !== patient.id)
      );
    } else if (action === "addBacktoWaiters") {
      setWaiters((prevWaiters) => {
        const newWaiters = [...prevWaiters];
        newWaiters.splice(index, 0, patient);
        return newWaiters;
      });
      setPatients((prevPatients) =>
        prevPatients.filter((p) => p.id !== patient.id)
      );
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          ref={animationParent}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {patients.map((patient) => (
            <PatientsCard
              key={patient.id}
              patientKey={`patient-${patient.id}`}
              name={patient.name}
            />
          ))}
        </div>

        {/* Display waitinglist */}
        <div>
          <WaitingList>
            <div ref={animationParent}>
              {waiters.map((waiter) => (
                <WaiterCard
                  key={waiter.id}
                  waiterKey={`waiter-${waiter.id}`}
                  name={waiter.name}
                />
              ))}
            </div>
          </WaitingList>
        </div>
      </div>
    </DndContext>
  );
}

export default App;
