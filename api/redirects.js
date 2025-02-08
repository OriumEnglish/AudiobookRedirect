export default async function handler(req, res) {
    const { query } = req;
    const key = query.key;

    // GitHub JSON URL (본인 저장소 URL로 변경!)
    const jsonUrl = "https://raw.githubusercontent.com/USERNAME/redirect-links/main/data.json";

    try {
        const response = await fetch(jsonUrl);
        const data = await response.json();

        if (data[key]) {
            return res.redirect(301, data[key]); // 영구 리디렉션
        } else {
            return res.status(404).json({ error: "Not Found" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch data" });
    }
}
