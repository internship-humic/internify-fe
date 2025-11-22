import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Search, ChevronDown, Users, UserCheck, UserX, Clock } from "lucide-react";
import NavbarAdmin from "../Layout/NavbarAdmin";
import SidebarAdmin from "../Layout/SidebarAdmin";

type ChartDataItem = {
  name: string;
  value: number;
};

type StatCard = {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
};

type DashboardApiResponse = {
  totalPendaftar: number;
  totalDiterima: number;
  totalDitolak: number;
  totalDiproses: number;
  universitas: ChartDataItem[];
  negara: ChartDataItem[];
};

const UNIVERSITAS_COLORS = ["#001a66", "#334d99", "#6699cc", "#99b3ff"];
const PENERIMAAN_COLORS = ["#0088ff", "#00cc00", "#ff3333"];
const NEGARA_COLORS = ["#cc3333", "#dd6666", "#ee9999", "#f0b3b3", "#f5cccc"];

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [statCards, setStatCards] = useState<StatCard[]>([]);
  const [universitasData, setUniversitasData] = useState<ChartDataItem[]>([]);
  const [penerimaanData, setPenerimaanData] = useState<ChartDataItem[]>([]);
  const [negaraData, setNegaraData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/lowongan-magang-api/get`
        );
        const result = await response.json();

        if (!response.ok) {
          console.error("Gagal mengambil data dashboard:", result.message);
          setErrorMessage(result.message || "Gagal mengambil data dashboard.");
          setLoading(false);
          return;
        }

        const data: DashboardApiResponse = result.data;

        const statCardsFromApi: StatCard[] = [
          {
            title: "Total Pendaftar",
            value: data.totalPendaftar,
            subtitle: "+200 dari batch sebelumnya", // sesuaikan bila BE sudah support
            icon: <Users size={24} />,
            iconColor: "#0088ff",
          },
          {
            title: "Total Diterima",
            value: data.totalDiterima,
            subtitle: `${(
              (data.totalDiterima / (data.totalPendaftar || 1)) *
              100
            ).toFixed(1)}% acceptance rate`,
            icon: <UserCheck size={24} />,
            iconColor: "#00cc00",
          },
          {
            title: "Total Ditolak",
            value: data.totalDitolak,
            subtitle: `${(
              (data.totalDitolak / (data.totalPendaftar || 1)) *
              100
            ).toFixed(1)}% rejection rate`,
            icon: <UserX size={24} />,
            iconColor: "#ff3333",
          },
          {
            title: "Sedang Diproses",
            value: data.totalDiproses,
            subtitle: `${(
              (data.totalDiproses / (data.totalPendaftar || 1)) *
              100
            ).toFixed(1)}% pending review`,
            icon: <Clock size={24} />,
            iconColor: "#ffaa00",
          },
        ];

        const penerimaanFromApi: ChartDataItem[] = [
          { name: "Total Pendaftar", value: data.totalPendaftar },
          { name: "Total Diterima", value: data.totalDiterima },
          { name: "Total Ditolak", value: data.totalDitolak },
        ];

        setStatCards(statCardsFromApi);
        setUniversitasData(data.universitas || []);
        setPenerimaanData(penerimaanFromApi);
        setNegaraData(data.negara || []);
        setLoading(false);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data dashboard:", error);
        setErrorMessage("Terjadi kesalahan saat mengambil data dashboard.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <NavbarAdmin />

      <div className="flex flex-row">
        <SidebarAdmin />

        <div className="w-full flex-col flex-wrap bg-white p-10">
          {/* Header Section */}
          <div className="mb-[50px] flex flex-row items-center justify-between">
            <h2 className="text-[24px] font-semibold">Dashboard</h2>

            <div className="flex items-center gap-4">
              {/* Batch Filter */}
              <button className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-[20px] py-[10px] text-gray-700 hover:bg-gray-50">
                Batch 3 - 2025
                <ChevronDown size={18} />
              </button>

              {/* Search Box */}
              <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-[20px] py-[10px]">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Nama, Jurusan,"
                  className="w-52 text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Loading / Error State */}
          {loading && (
            <p className="text-center text-gray-600">Memuat data dashboard...</p>
          )}

          {!loading && errorMessage && (
            <p className="text-center text-red-500">{errorMessage}</p>
          )}

          {!loading && !errorMessage && (
            <>
              {/* Stat Cards */}
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((card, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-300 bg-white p-6"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className="rounded-lg bg-gray-100 p-2"
                        style={{ color: card.iconColor }}
                      >
                        {card.icon}
                      </div>
                      <h3 className="text-sm font-medium text-blue-600">
                        {card.title}
                      </h3>
                    </div>
                    <div className="mb-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {card.value}
                      </p>
                    </div>
                    <p className="text-xs" style={{ color: card.iconColor }}>
                      {card.subtitle}
                    </p>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Universitas Chart */}
                <div className="rounded-lg border border-gray-300 bg-white p-6">
                  <h2 className="mb-6 text-lg font-bold text-gray-900">
                    Universitas
                  </h2>

                  <div className="mb-6 flex justify-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={universitasData}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {universitasData.map((_, index) => (
                            <Cell
                              key={`universitas-cell-${index}`}
                              fill={
                                UNIVERSITAS_COLORS[
                                  index % UNIVERSITAS_COLORS.length
                                ]
                              }
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legend */}
                  <div className="space-y-3 text-sm">
                    {universitasData.map((item, index) => (
                      <div
                        key={`universitas-legend-${index}`}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded"
                            style={{
                              backgroundColor:
                                UNIVERSITAS_COLORS[
                                  index % UNIVERSITAS_COLORS.length
                                ],
                            }}
                          />
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Penerimaan & Negara */}
                <div className="space-y-6">
                  {/* Penerimaan Chart */}
                  <div className="rounded-lg border border-gray-300 bg-white p-6">
                    <h2 className="mb-6 text-lg font-bold text-gray-900">
                      Penerimaan
                    </h2>

                    <div className="mb-6 flex justify-center">
                      <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                          <Pie
                            data={penerimaanData}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {penerimaanData.map((_, index) => (
                              <Cell
                                key={`penerimaan-cell-${index}`}
                                fill={
                                  PENERIMAAN_COLORS[
                                    index % PENERIMAAN_COLORS.length
                                  ]
                                }
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="space-y-2 text-sm">
                      {penerimaanData.map((item, index) => (
                        <div
                          key={`penerimaan-legend-${index}`}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="h-3 w-3 rounded"
                            style={{
                              backgroundColor:
                                PENERIMAAN_COLORS[
                                  index % PENERIMAAN_COLORS.length
                                ],
                            }}
                          />
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Negara Chart */}
                  <div className="rounded-lg border border-gray-300 bg-white p-6">
                    <h2 className="mb-6 text-lg font-bold text-gray-900">
                      Negara
                    </h2>

                    <div className="mb-6 flex justify-center">
                      <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                          <Pie
                            data={negaraData}
                            cx="50%"
                            cy="50%"
                            innerRadius={0}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {negaraData.map((_, index) => (
                              <Cell
                                key={`negara-cell-${index}`}
                                fill={
                                  NEGARA_COLORS[
                                    index % NEGARA_COLORS.length
                                  ]
                                }
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="space-y-2 text-sm">
                      {negaraData.map((item, index) => (
                        <div
                          key={`negara-legend-${index}`}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="h-3 w-3 rounded"
                            style={{
                              backgroundColor:
                                NEGARA_COLORS[index % NEGARA_COLORS.length],
                            }}
                          />
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
