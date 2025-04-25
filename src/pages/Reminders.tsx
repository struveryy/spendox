
import { Helmet } from "react-helmet";

const Reminders = () => {
  return (
    <>
      <Helmet>
        <title>SpendoX - Reminders</title>
      </Helmet>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Reminders</h1>
        <p className="text-muted-foreground">Set and manage payment reminders</p>
      </header>

      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Payment Reminders</h2>
        <p className="text-muted-foreground mb-4">
          This page will allow you to create and manage payment reminders and recurring bills.
        </p>
      </div>
    </>
  );
};

export default Reminders;
