import React from "react";
import { MouseEvent } from "react";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    alert(event);
  };
  //   let selectedIndex = 0;
  const [selected, setSelectedIndex] = React.useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      {items.length == 0 ? <p>No item found</p> : null}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selected == index ? "list-group-item active" : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
  //wrap in braces because it is not a jsx syntax
}

export default ListGroup;
