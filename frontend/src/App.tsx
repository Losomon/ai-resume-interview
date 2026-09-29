import { MotionConfig } from "framer-motion";
import Landing from "./pages/Landing";
// reducedMotion="user" makes Framer Motion honor the OS "reduce motion" setting site-wide.
export default function App() { return <MotionConfig reducedMotion="user"><Landing /></MotionConfig>; }
