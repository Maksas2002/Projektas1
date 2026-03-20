import app, { PORT } from "./app.js";

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
});