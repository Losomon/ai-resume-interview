import { Link } from "react-router-dom"; import { EmptyState } from "../components/ui/EmptyState"; import { Button } from "../components/ui/Button";
export default function NotFound() { return <EmptyState title="Page not found" body="This link doesn't lead anywhere. Head back to your dashboard." action={<Link to="/dashboard"><Button>Go to dashboard</Button></Link>} />; }
