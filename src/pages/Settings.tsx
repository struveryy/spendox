
import { Helmet } from "react-helmet";

const Settings = () => {
  return (
    <>
      <Helmet>
        <title>SpendoX - Settings</title>
      </Helmet>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </header>

      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
        <p className="text-muted-foreground mb-4">
          This page will allow you to customize your account settings and preferences.
        </p>
      </div>
    </>
  );
};

export default Settings;
