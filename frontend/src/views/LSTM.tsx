import React, { useState } from "react";

export default function GoldLSTMViewFetch() {
    const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const recentPrices: number[][] = [
        [1430, 1432, 1435, 1431, 1000, 0.5],
        [1433, 1435, 1436, 1432, 1200, 0.7],
        [1434, 1436, 1437, 1433, 1100, 0.6],
        [1435, 1437, 1438, 1434, 1150, 0.8],
        [1436, 1438, 1439, 1435, 1300, 0.5],
        [1437, 1439, 1440, 1436, 1250, 0.7],
        [1438, 1440, 1441, 1437, 1400, 0.6],
        [1439, 1441, 1442, 1438, 1350, 0.8],
        [1440, 1442, 1443, 1439, 1500, 0.9],
        [1441, 1443, 1444, 1440, 1450, 1.0],
    ];

    const handlePredict = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/gold-price/api/predicts/lstm-next-day",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ scaled_data: recentPrices }),
                }
            );

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || "Lỗi server");
            }

            const data = await response.json();
            setPredictedPrice(data.predicted_next_day_price);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                background: "linear-gradient(135deg, #fef08a, #fef3c7, #fb923c)",
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
                    borderRadius: "1rem",
                    padding: "32px",
                    maxWidth: "480px",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                <h2
                    style={{
                        fontSize: "2rem",
                        fontWeight: "700",
                        marginBottom: "24px",
                        color: "#b45309",
                    }}
                >
                    Dự đoán giá vàng ngày tiếp theo
                </h2>

                <button
                    onClick={handlePredict}
                    disabled={loading}
                    style={{
                        width: "100%",
                        background: "linear-gradient(to right, #facc15, #eab308)",
                        color: "#fff",
                        fontWeight: 600,
                        padding: "12px 0",
                        borderRadius: "0.75rem",
                        cursor: loading ? "not-allowed" : "pointer",
                        transform: loading ? "none" : "scale(1)",
                        transition: "all 0.3s",
                    }}
                    >
                    {loading ? "Đang dự đoán..." : "Dự đoán"}
                </button>

                {predictedPrice !== null && (
                    <div
                        style={{
                        marginTop: "24px",
                        padding: "16px",
                        borderRadius: "1rem",
                        background: "linear-gradient(to right, #d1fae5, #a7f3d0)",
                        display: "inline-block",
                        }}
                    >
                        <p
                        style={{
                            fontSize: "1.25rem",
                            fontWeight: "700",
                            color: "#065f46",
                        }}
                        >
                        💰 Giá dự đoán: {predictedPrice.toFixed(2)} USD/ounce
                        </p>
                    </div>
                )}

                {error && (
                    <p style={{ marginTop: "16px", color: "#b91c1c", fontWeight: 600 }}>
                        {error}
                    </p>
                )}

                <div
                    style={{
                        marginTop: "24px",
                        fontSize: "0.875rem",
                        color: "#6b7280",
                    }}
                >
                    Dữ liệu gửi: 10 ngày gần nhất, gồm Price, Open, High, Low, Vol.,
                    Change%
                </div>
            </div>
        </div>
    );
}