import app from "./app";
import supabaseClient from "./database/supabaseClient";

app.listen(3001, (err) => {
  console.log(`App listening on port ${3001}`);
});
