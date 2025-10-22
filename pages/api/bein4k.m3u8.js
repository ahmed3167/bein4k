export default async function handler(req, res) {
  // 🔗 رابط ملف m3u8 الأصلي
  const target = "http://134.19.178.202/bein-4/index.m3u8";

  try {
    const response = await fetch(target);
    if (!response.ok) return res.status(response.status).send("Fetch failed");

    // نوع الملف
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");

    let body = await response.text();

    // تصحيح روابط ts النسبية
    const base = target.substring(0, target.lastIndexOf("/") + 1);
    body = body.replace(/(\n)(?!https?:\/\/)([^#\n]+)/g, `$1${base}$2`);

    res.send(body);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
}
