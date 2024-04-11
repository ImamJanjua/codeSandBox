import { AnimatePresence, motion } from "framer-motion";

const SideNavBar = ({ children }) => {
  return (
    <nav className="fixed flex h-screen flex-col items-center gap-8 bg-gray-100 p-4">
      {children}
    </nav>
  );
};

const SideNavBarItem = ({ children, selected, id, setSelected }) => {
  return (
    <motion.button
      className="relative rounded-md bg-gray-300 p-3 text-xl transition-colors hover:bg-gray-400"
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 block">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 z-0 rounded-md bg-blue-300"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export { SideNavBar, SideNavBarItem };
