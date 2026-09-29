import { EmptyState } from "../components/ui/EmptyState"; import { Button } from "../components/ui/Button";
export default function NotFound() { return <EmptyState title="Page not found" body="This link doesn't lead anywhere. Head back to your dashboard." action={<Button to="/dashboard">Go to dashboard</Button>} />; }
