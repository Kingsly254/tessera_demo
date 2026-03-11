import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __erpDemoSql: ReturnType<typeof postgres> | undefined;
}

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  return databaseUrl;
}

export function getSql() {
  if (!global.__erpDemoSql) {
    global.__erpDemoSql = postgres(getDatabaseUrl(), {
      ssl: "require",
      max: 1,
    });
  }

  return global.__erpDemoSql;
}
