import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
    { name: "Semana 1", ventas: 120 },
    { name: "Semana 2", ventas: 200 },
    { name: "Semana 3", ventas: 150 },
    { name: "Semana 4", ventas: 80 },
    { name: "Semana 5", ventas: 170 },
];

export default function Ventas() {
    return (
        <div className="container">
            <h3 className="text-center">Gráfico de Ventas</h3>
            <BarChart
                width={600}
                height={400}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas" fill="#8884d8" />
            </BarChart>
        </div>
    );
}
