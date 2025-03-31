import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

export default function TickerForecast() {
  const router = useRouter();
  const { ticker } = router.query;

  const [fullData, setFullData] = useState([]);
  const [animatedData, setAnimatedData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 예측 데이터 요청
  useEffect(() => {
    if (!ticker) return;
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://finoptima-price-forecast-render.onrender.com/forecast",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ticker }),
          }
        );
        const json = await res.json();
        if (!json.forecast || !Array.isArray(json.forecast)) {
          console.error("예측 데이터 없음:", json);
          return;
        }
        setFullData(json.forecast);
      } catch (err) {
        console.error("예측 요청 실패:", err);
      }
      setLoading(false);
    };
    fetchForecast();
  }, [ticker]);

  // 애니메이션 효과
  useEffect(() => {
    if (fullData.length === 0) return;
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedData((prev) => [...prev, fullData[index]]);
      index++;
      if (index >= fullData.length) clearInterval(interval);
    }, 1000 / fullData.length);
    return () => clearInterval(interval);
  }, [fullData]);

  // 날짜별로 실제와 예측 데이터를 병합
  const combinedData = Object.values(
    animatedData.reduce((acc, cur) => {
      const { date, type, price } = cur;
      if (!acc[date]) {
        acc[date] = { date, actual: null, forecast: null };
      }
      if (type === "actual") {
        acc[date].actual = price;
      } else if (type === "forecast") {
        acc[date].forecast = price;
      }
      return acc;
    }, {})
  );

  // 실제 데이터의 마지막 날짜를 경계로 사용
  const actualData = fullData.filter((item) => item.type === "actual");
  const boundaryDate = actualData.length > 0 ? actualData[actualData.length - 1].date : null;

  return (
    <div
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "30px" }}>
        Forecast for {ticker}
      </h1>
      {loading ? (
        <p>Loading prediction chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#222", border: "none" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ color: "#fff", paddingBottom: "20px" }}
            />
            {boundaryDate && (
              <ReferenceLine
                x={boundaryDate}
                stroke="#FF0000"
                label={{ value: "Forecast", position: "top", fill: "#FF0000" }}
              />
            )}
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="#FFFFFF"
              strokeWidth={3}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              name="Forecast"
              stroke="#00C8FF"
              strokeWidth={3}
              strokeDasharray="6 3"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
