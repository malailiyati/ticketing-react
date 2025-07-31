import { Link } from "react-router";

function ListItem(props) {
  return (
    <li>
      <Link to={props.to}>{props.listText}</Link>
    </li>
  );
}

export default ListItem;
