import app from "./server";
import routes from "./routes";
import connect from "./config/database";

// PORT
const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
  await connect();
  routes(app);
});
