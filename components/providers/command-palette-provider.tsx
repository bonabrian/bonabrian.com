import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

interface CommandPaletteContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CommandPaletteContext = createContext<CommandPaletteContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useCommandPaletteContext = () => {
  const context = useContext(CommandPaletteContext);

  if (!context) {
    throw new Error(
      'useCommandPaletteContext must be used within a CommandPaletteProvider',
    );
  }

  return context;
};

const CommandPaletteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CommandPaletteContext.Provider>
  );
};

export default CommandPaletteProvider;
