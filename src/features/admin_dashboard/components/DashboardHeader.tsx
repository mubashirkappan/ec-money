export default function DashboardHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, Adam 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your wallet and payments efficiently.
        </p>
      </div>
    </div>
  );
}