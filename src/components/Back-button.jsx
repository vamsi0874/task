import React from "react";
import { Link } from "react-router-dom";

import { Button } from "./ui/button"



export const BackButton = ({label,href}) => {
  return (
    <Button>
        <Link to={href}>
        {label}</Link>
    </Button>
  )
}
