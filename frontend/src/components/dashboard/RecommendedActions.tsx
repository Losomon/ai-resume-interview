import { Card } from "../ui/Card"; import { Button } from "../ui/Button"; import { SparkIcon } from "../ui/SparkIcon";
export const RecommendedActions = () => (<Card><p className="flex items-center gap-1.5 text-sm text-mute"><SparkIcon size={12} />Recommended next step</p>
  <h2 className="mt-1 text-lg font-medium text-ink">Improve your Spring Boot experience section</h2>
  <p className="mt-1 max-w-xl text-sm">4 of your recent target positions mention Spring Boot experience that isn't currently visible in your resume.</p>
  <Button to="/resumes" className="mt-4">Review recommendation</Button></Card>);
