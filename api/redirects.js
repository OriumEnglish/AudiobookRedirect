export default async function handler(req, res) {
    const { query } = req;
    const key = query.key;

    // GitHub JSON URL (본인 저장소 URL로 변경!)
    const jsonUrl = "https://raw.githubusercontent.com/OriumEnglish/AudiobookRedirect/main/data.json";

    try {
        const response = await fetch(jsonUrl);
        const data = await response.json();

        // 모든 카테고리를 탐색하며 key 찾기
        for (const category in data) {
            if (data[category][key]) {
                return res.redirect(301, data[category][key]); // 영구 리디렉션
            }
        }

        return res.status(404).json({ error: "Not Found" });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch data" });
    }
}
