import app from "./app";
import supabaseClient from "./database/supabaseClient";

app.listen(3001, (err) => {
  console.log(`App listening on port ${3001}`);
});

async function createBucket() {
  const { data, error } = await supabaseClient.storage.createBucket(
    "merchant-media",
    {
      public: true,
    }
  );
}

createBucket();