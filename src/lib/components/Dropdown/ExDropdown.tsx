"use client";

import ExDropdownRoot from "./ExDropdownRoot";
import ExDropdownTrigger from "./ExDropdownTrigger";
import ExDropdownContent from "./ExDropdownContent";
import ExDropdownItem from "./ExDropdownItem";

const ExDropdown = Object.assign(ExDropdownRoot, {
  Trigger: ExDropdownTrigger,
  Content: ExDropdownContent,
  Item: ExDropdownItem,
});

export default ExDropdown;
