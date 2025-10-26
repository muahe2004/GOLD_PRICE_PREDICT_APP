import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Prediction {
  date: string;
  price: number;
}

export const GoldChart = ({ data }: { data: Prediction[] }) => {
  return (
    <div
      style={{
        flex: "0 0 70%",
        minWidth: "300px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "20px", color: "#333" }}>Biểu đồ tuần</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#ff7300"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#ff7300", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Component Table
export const GoldTable = ({ data }: { data: Prediction[] }) => {
  return (
    <div
      style={{
        flex: "0 0 70%",
        minWidth: "300px",
        margin: "0 auto",      
        textAlign: "center",   
      }}
    >
      <h3 style={{ marginBottom: "20px", color: "#333" }}>Bảng dự đoán</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          overflow: "hidden",
          margin: "0 auto",    
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f7b733", color: "#fff", fontWeight: "bold" }}>
            <th style={{ padding: "12px 0" }}>Ngày</th>
            <th style={{ padding: "12px 0" }}>Giá dự đoán (USD/ounce)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={item.date}
              style={{
                backgroundColor: idx % 2 === 0 ? "#fff7e6" : "#fff4e1",
                transition: "background-color 0.3s",
              }}
            >
              <td style={{ padding: "12px" }}>{item.date}</td>
              <td style={{ padding: "12px" }}>{item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};