"use client";

import { forwardRef } from "react";

import Input from "@/components/ui/Input";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  label?: string;
};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
    {
      value,
      onChange,
      placeholder = "Search projects...",
      id = "project-search",
      label = "Search projects",
    },
    ref
  ) {
    return (
      <Input
        ref={ref}
        id={id}
        type="search"
        label={label}
        hideLabel
        inputSize="lg"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        icon="⌕"
      />
    );
  }
);

export default SearchBar;
