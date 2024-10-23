import React, { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}

function Alert({ children }: Prop) {
  return <div className="alert alert-primary">{children}</div>;
}

export default Alert;
