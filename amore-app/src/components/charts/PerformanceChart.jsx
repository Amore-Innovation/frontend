import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import ChartTooltip from "./CustomToolTip.jsx";

const COLORS = {
    open: "#12B981",
    click: "#FF25C8",
    conv: "#1F5796",
    roi: "#001A4C",
};

export default function PerformanceChart({ data, visibleKeys }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<ChartTooltip />} />

                {visibleKeys.map((key) => (
                    <Line
                        key={key}
                        type="linear"
                        dataKey={key}
                        stroke={COLORS[key]}
                        strokeWidth={4}
                        dot={{ r: 4 }}
                        activeDot={{ r: 4 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}