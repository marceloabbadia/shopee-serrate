import React from "react";
import PesquisaContext from "./PesquisaContext";
import { useState } from "react";
import propTypes from "prop-types";

function Provider({ children }) {
  const [searchValue, setSearchValue] = useState("");

  const value = {
    searchValue,
    setSearchValue,
  };

  return (
    <PesquisaContext.Provider value={value}>
      {children}
    </PesquisaContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: propTypes.any,
}.isRequired;
