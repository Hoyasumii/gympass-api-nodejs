import app from "./app";

app.listen({
  host: "0.0.0.0",
  port: parseInt(process.env.PORT),
}, (err, address) => {
  if (err) throw err;

  console.log(`🔥 Server is running at: ${address}`)
});
