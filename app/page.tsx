import { SiteShell } from './ui/site-shell';
import { Dashboard } from './components/dashboard';

export default function HomePage() {
  return <SiteShell><Dashboard /></SiteShell>;
}
