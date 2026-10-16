import { DashboardNew } from '@/components/dashboard/DashboardNew';
import { useAuthStore } from '@/store/authStore';

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return <DashboardNew userName={firstName} />;
}
