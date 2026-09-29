import { MotionConfig } from "framer-motion"; import { BrowserRouter } from "react-router-dom"; import AppRoutes from "./routes/AppRoutes";
// reducedMotion="user" makes Framer Motion honor the OS "reduce motion" setting site-wide.
export default function App() { return <MotionConfig reducedMotion="user"><BrowserRouter><AppRoutes /></BrowserRouter></MotionConfig>; }
