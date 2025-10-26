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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-yellow-100 to-orange-200 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-800">
          Dự đoán giá vàng ngày tiếp theo
        </h2>

        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 disabled:opacity-50"
        >
          {loading ? "Đang dự đoán..." : "Dự đoán"}
        </button>

        {predictedPrice !== null && (
          <div
            className="mt-6 p-4 rounded-xl shadow-inner bg-gradient-to-r from-green-100 to-green-200 inline-block"
          >
            <p className="text-xl md:text-2xl font-bold text-green-700">
              💰 Giá dự đoán: {predictedPrice.toFixed(2)} USD/ounce
            </p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-600 font-semibold">{error}</p>
        )}

        <div className="mt-6 text-sm text-gray-500">
          Dữ liệu gửi: 10 ngày gần nhất, gồm Price, Open, High, Low, Vol., Change%
        </div>
      </div>
    </div>
  );
}
