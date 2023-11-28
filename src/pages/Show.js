import React, { useEffect } from "react";
import showStore from "../stores/showStore";
import { useParams } from "react-router-dom";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Show = () => {
  const store = showStore();
  const params = useParams();
  const netlifyFunctionURL =
    "https://your-netlify-domain.netlify.app/.netlify/functions/proxy";

  useEffect(() => {
    store.fetchData(params.id);
    console.log(params);
    console.log("store: ", store.data);
  }, []);

  if (!store.data) return <></>;

  const Coin = () => {
    // Construct the URL for the proxy
    const imageUrl = store.data.image.large;
    const proxyUrl = `${netlifyFunctionURL}?imageUrl=${encodeURIComponent(
      imageUrl
    )}`;

    // Use the proxy URL to load the texture
    const texture = useLoader(TextureLoader, proxyUrl);

    return (
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderBufferGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    );
  };

  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} />
        <Coin />
        <OrbitControls />
      </Canvas>
      <header>
        <img src={store.data.image.large} alt="image" />
        <h2>
          {store.data.name} ({store.data.symbol})
        </h2>
      </header>
      <AreaChart
        width={500}
        height={400}
        data={store.graphData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </div>
  );
};

export default Show;
