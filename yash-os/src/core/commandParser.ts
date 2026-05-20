import { commandRegistry } from "./commandRegistry";

export const parseCommand = (
  input: string
): string | string[] => {
  const command = input.trim().toLowerCase();

  if (!commandRegistry[command]) {
    return `Command not found: ${command}`;
  }

  return commandRegistry[command]();
};