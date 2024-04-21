const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const { connectToValkey } = require("./helpers/valkey");
const cacheRoute = require("./routes/cache");
(async () => {
  await connectToValkey();
})();

app.use(express.json())

app.use("/cache", cacheRoute);

app.listen(port, () => {
  console.log(`CNGT demo project listening on port ${port}`);
});
