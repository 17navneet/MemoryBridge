import AppHeader from "../../components/AppHeader";
import BottomNav from "../../components/BottomNav";
import { useAuth } from "../../auth/AuthContext";

const ProfilePage = () => {

  const { user } = useAuth();

  return (

    <div className="min-h-screen bg-background pb-20">

      <AppHeader
        title="Profile"
        subtitle="Your account"
      />

      <main className="max-w-lg mx-auto px-4 py-8">

        <div className="bg-card rounded-2xl shadow-soft p-6 text-center">

          <div className="w-20 h-20 mx-auto rounded-full bg-teal-light flex items-center justify-center text-primary text-2xl font-bold mb-4">
            {user?.name?.[0]}
          </div>

          <h2 className="font-heading text-lg font-bold mb-1">
            {user?.name}
          </h2>

          <p className="text-sm text-muted-foreground mb-4">
            {user?.email}
          </p>

          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Role
          </div>

          <p className="font-medium capitalize">
            {user?.role}
          </p>

        </div>

      </main>

      <BottomNav/>

    </div>
  );
};

export default ProfilePage;