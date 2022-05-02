import * as React from 'react';
import './no-book-yet.scss';
export interface INoBooksYetProps {}

export default function NoBooksYet(props: INoBooksYetProps) {
  return <h2 className="no-book-yet">Find any book you want!</h2>;
}
