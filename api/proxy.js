export default async function handler(req, res) {
  const target = req.query.url;

  if (!target) {
    res.status(400).send("Missing url");
    return;
  }

  try {
    const response = await fetch(target);

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    const buffer = await response.arrayBuffer();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", contentType);

    res.status(response.status).send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({
      error: "Proxy failed",
      message: err.toString()
    });
  }
}
