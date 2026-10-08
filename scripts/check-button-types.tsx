import { Link } from "react-router-dom";
import { ExButton, type ExButtonProps } from "../dist/index.js";

<ExButton onClick={(event) => { event.currentTarget.disabled = true; }}>Save</ExButton>;
<ExButton href="/guide" onClick={(event) => { event.currentTarget.href; }}>Guide</ExButton>;
<ExButton as={Link} to="/dashboard" replace state={{ from: "settings" }} onClick={(event) => { event.currentTarget.href; }}>Dashboard</ExButton>;
<ExButton as={Link} to={{ pathname: "/dashboard", search: "?tab=profile" }} />;
const props: ExButtonProps<typeof Link> = { as: Link, to: "/dashboard", disabled: true };
<ExButton {...props} />;

// @ts-expect-error Router Link requires a destination.
<ExButton as={Link}>Missing destination</ExButton>;
// @ts-expect-error A destination without a router component must not silently render a button.
<ExButton to="/dashboard">Missing router</ExButton>;
// @ts-expect-error Links cannot submit forms.
<ExButton as={Link} to="/dashboard" type="submit" />;
// @ts-expect-error Native links cannot submit forms.
<ExButton href="/dashboard" type="submit" />;
