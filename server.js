"use strict";

const subdomain = "gateopener2023";
const vonageNumber = "16084030204";

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/voice/answer", (req, res) => {
  console.log("NCCO request:");
  console.log(`  - callee: ${req.query.to}`);
  console.log("---");
  res.json([
    {
      action: "talk",
      text: "Please wait while we connect you.",
    },
    {
      action: "connect",
      from: vonageNumber,
      endpoint: [{ type: "phone", number: req.query.to }],
    },
  ]);
});

app.all("/voice/event", (req, res) => {
  console.log("EVENT:");
  console.dir(req.body);
  console.log("---");
  res.sendStatus(200);
});

if (subdomain == "https://gate-opener-028o.onrender.com/voice/answer") {
  console.log("\n\t🚨🚨🚨 Please change the SUBDOMAIN value");
  return false;
}
if (vonageNumber == "NUMBER") {
  console.log("\n\t🚨🚨🚨 Please change the NUMBER value");
  return false;
}
app.listen(3000);

const localtunnel = require("localtunnel");
(async () => {
  const tunnel = await localtunnel({
    subdomain: subdomain,
    port: 3000,
  });
  console.log(`App available at: ${tunnel.url}`);
})();
