"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function FeaturedSectionStats() {
  const data = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 60 },
    { name: "Apr", value: 80 },
    { name: "May", value: 100 },
    { name: "Jun", value: 130 },
    { name: "Jul", value: 160 },
  ];

	return (
		<section className="w-full max-w-6xl mx-auto text-left">
			<div className="">
				<h3 className="text-sm md:text-2xl font-bold text-cyan-300 mb-8">
					Boostez votre visibilité avec{" "}
					<span className="text-gray-500 font-medium text-lg dark:text-gray-400">
						Nos stratégies SEO avancées 
					</span>
				</h3>

        {/* Stats grid */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
      <div>
        <p className="text-3xl font-medium text-gray-900 dark:text-white">
          +250%
        </p>
        <p className="text-gray-500 text-md">Croissance moyenne du trafic</p>
      </div>
      <div>
        <p className="text-3xl font-medium text-gray-900 dark:text-white">
          #1
        </p>
        <p className="text-gray-500 text-md">Potentiel de classement Google</p>
      </div>
      <div>
        <p className="text-3xl font-medium text-gray-900 dark:text-white">
          3x
        </p>
        <p className="text-gray-500 text-md">Taux de conversion amélioré</p>
      </div>
      <div>
        <p className="text-3xl font-medium text-gray-900 dark:text-white">
          100%
        </p>
        <p className="text-gray-500 text-md">Core Web Vitals optimisés</p>
      </div>
    </div> */}
      </div>

      {/* Area Chart */}
      <div className="w-full h-48 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBlue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
