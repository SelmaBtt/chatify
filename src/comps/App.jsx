import Switch from "./utils/Switch"
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://86016073ff1e60586d5765b367a2e1d9@o4507859854360576.ingest.de.sentry.io/4507859867926608",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["http://localhost:5173/"],
  // Session Replay
  replaysSessionSampleRate: 0.1, // Sample 10% of sessions
  replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors
});



function App() {
  return (
    <>
      <Switch />
    </>
  )
}

export default App
