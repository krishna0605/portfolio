"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Persona = "engineer" | "creative";

interface PersonaContextType {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  togglePersona: () => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersona] = useState<Persona>("engineer");

  useEffect(() => {
    const saved = localStorage.getItem("persona") as Persona;
    if (saved && (saved === "engineer" || saved === "creative")) {
      setPersona(saved);
    }
  }, []);

  const handleSetPersona = (newPersona: Persona) => {
    setPersona(newPersona);
    localStorage.setItem("persona", newPersona);
  };

  const togglePersona = () => {
    const newPersona = persona === "engineer" ? "creative" : "engineer";
    handleSetPersona(newPersona);
  };

  return (
    <PersonaContext.Provider value={{ persona, setPersona: handleSetPersona, togglePersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (!context) {
    return { persona: "engineer" as Persona, setPersona: () => {}, togglePersona: () => {} };
  }
  return context;
}
