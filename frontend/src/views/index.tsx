import React, { useState } from "react";
import "../styles/index.css";
import { getDaysInWeek } from "../utils/getDaysInWeek";
import { GoldChart, GoldTable } from "../components/goldChartAndTable";

interface Prediction {
    date: string;
    price: number;
}

export default function IndexView() {
    const [week, setWeek] = useState("");
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState(false);

    const MIN_DATE = new Date("2025-10-20");

    const handleSelectWeek = async () => {
        if (!week) return alert("Chọn tuần trước!");
        const days = getDaysInWeek(week);

        if (days.every((d) => new Date(d) < MIN_DATE)) {
            alert("Chỉ cho phép chọn tuần có ngày từ 20/10/2025 trở đi!");
            return;
        }

        setWeekDays(days);
        setLoading(true);
        const results: Prediction[] = [];

        try {
            for (const day of days) {
                const body = { target_date: day };
                const response = await fetch(
                    "http://localhost:8000/gold-price/api/predicts/index",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    }
                );

                if (!response.ok) throw new Error(`Lỗi API cho ngày ${day}`);

                const data = await response.json();
                results.push({ date: day, price: data.predicted_price });
            }

            setPredictions(results);
        } catch (error) {
            console.error(error);
            alert("Gọi API thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
        style={{
            minHeight: "100vh",             
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",   
            alignItems: "center",           
            background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
            padding: "40px 20px",
            fontFamily: "Arial, sans-serif",
        }}
        >
        <h1 style={{ margin: 0, color: "#333" }}>Chọn tuần để dự đoán</h1>

        <div
            style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            }}
        >
            <input
            type="week"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
            }}
            />
            <button
            onClick={handleSelectWeek}
            disabled={loading}
            style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#f7b733",
                color: "#fff",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
            }}
            >
            {loading ? "Đang dự đoán..." : "Dự đoán tuần"}
            </button>
        </div>

        {predictions.length > 0 && (
            <div
                style={{
                marginTop: "30px",
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                gap: "2%",
                justifyContent: "center",
                flexWrap: "wrap",
                }}
            >
                <GoldChart data={predictions} />
                <GoldTable data={predictions} />
            </div>
            )}
        </div>
    );
}