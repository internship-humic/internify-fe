import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Search,
  ChevronDown,
  Users,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import axios, { AxiosError } from "axios";
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

// ====== BE RESPONSE TYPES ======
type DashboardStatsResponse = {
  status: boolean;
  data: {
    total_pendaftar: number;
    total_diterima: number;
    total_ditolak: number;
    sedang_diproses: number;
    acceptance_rate: string;
    rejection_rate: string;
    pending_rate: string;
  };
  message: string;
  code?: number;
};

type PositionStatsResponse = {
  status: boolean;
  data: Array<{
    posisi: string;
    total: number;
    diterima: number;
    ditolak: number;
  }>;
  message?: string;
  code?: number;
};

type CountryStatsResponse = {
  status: boolean;
  data: Array<{
    negara: string;
    total: number;
    diterima: number;
    ditolak: number;
    diproses: number;
  }>;
  message?: string;
  code?: number;
};

type BatchResponse = {
  success: boolean;
  message: string;
  data: Array<{
    id: number;
    batch_number: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }>;
};

const UNIVERSITAS_COLORS = ["#001a66", "#334d99", "#6699cc", "#99b3ff"];
const PENERIMAAN_COLORS = ["#0088ff", "#00cc00", "#ff3333"];
const NEGARA_COLORS = ["#cc3333", "#dd6666", "#ee9999", "#f0b3b3", "#f5cccc"];

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  "https://internify-ruddy.vercel.app";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [statCards, setStatCards] = useState<StatCard[]>([]);
  const [universitasData, setUniversitasData] = useState<ChartDataItem[]>([]);
  const [penerimaanData, setPenerimaanData] = useState<ChartDataItem[]>([]);
  const [negaraData, setNegaraData] = useState<ChartDataItem[]>([]);

  const [, setBatches] = useState<BatchResponse["data"]>([]);

  const getTokenFromCookie = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  };

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Accept: "application/json",
      },
      timeout: 15000,
    });

    instance.interceptors.request.use((config) => {
      const token = getTokenFromCookie();
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  }, []);

  const getAxiosErrorMessage = (err: unknown) => {
    if (!axios.isAxiosError(err)) {
      return "Terjadi kesalahan saat mengambil data dashboard.";
    }

    const axErr = err as AxiosError<any>;
    const status = axErr.response?.status;

    const msgFromBe =
      axErr.response?.data?.message ||
      axErr.response?.data?.error ||
      axErr.message;

    if (status === 401) {
      return msgFromBe || "Unauthorized (401). Silakan login ulang.";
    }

    return msgFromBe || `Request gagal (status ${status ?? "unknown"}).`;
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const token = getTokenFromCookie();
        if (!token) {
          setErrorMessage(
            "Token tidak ditemukan di cookie. Silakan login ulang."
          );
          setLoading(false);
          return;
        }

        const [statsRes, positionRes, countryRes, batchRes] = await Promise.all(
          [
            api.get<DashboardStatsResponse>(
              "/lamaran-magang-api/statistics/dashboard"
            ),
            api.get<PositionStatsResponse>(
              "/lamaran-magang-api/statistics/position"
            ),
            api.get<CountryStatsResponse>(
              "/lamaran-magang-api/statistics/country"
            ),
            api.get<BatchResponse>("/batch-api"),
          ]
        );

        const statsJson = statsRes.data;
        const positionJson = positionRes.data;
        const countryJson = countryRes.data;
        const batchJson = batchRes.data;

        if (!statsJson?.status) {
          setErrorMessage(
            statsJson?.message ||
              "Gagal mengambil data dashboard (statistics/dashboard)."
          );
          setLoading(false);
          return;
        }

        if (!positionJson?.status) {
          setErrorMessage(
            positionJson?.message ||
              "Gagal mengambil data dashboard (statistics/position)."
          );
          setLoading(false);
          return;
        }

        if (!countryJson?.status) {
          setErrorMessage(
            countryJson?.message ||
              "Gagal mengambil data dashboard (statistics/country)."
          );
          setLoading(false);
          return;
        }

        if (batchJson?.success) {
          setBatches(batchJson.data || []);
        } else {
          console.warn("Fetch batch gagal:", batchJson?.message);
        }

        const stats = statsJson.data;
        const positions = positionJson.data || [];
        const countries = countryJson.data || [];

        const statCardsFromApi: StatCard[] = [
          {
            title: "Total Pendaftar",
            value: stats.total_pendaftar,
            subtitle: "+200 dari batch sebelumnya",
            icon: <Users size={24} />,
            iconColor: "#0088ff",
          },
          {
            title: "Total Diterima",
            value: stats.total_diterima,
            subtitle: `${stats.acceptance_rate} acceptance rate`,
            icon: <UserCheck size={24} />,
            iconColor: "#00cc00",
          },
          {
            title: "Total Ditolak",
            value: stats.total_ditolak,
            subtitle: `${stats.rejection_rate} rejection rate`,
            icon: <UserX size={24} />,
            iconColor: "#ff3333",
          },
          {
            title: "Sedang Diproses",
            value: stats.sedang_diproses,
            subtitle: `${stats.pending_rate} pending review`,
            icon: <Clock size={24} />,
            iconColor: "#ffaa00",
          },
        ];

        const penerimaanFromApi: ChartDataItem[] = [
          { name: "Total Pendaftar", value: stats.total_pendaftar },
          { name: "Total Diterima", value: stats.total_diterima },
          { name: "Total Ditolak", value: stats.total_ditolak },
        ];

        const universitasFromApi: ChartDataItem[] = positions.map((p) => ({
          name: p.posisi,
          value: p.total,
        }));

        const negaraFromApi: ChartDataItem[] = countries.map((c) => ({
          name: c.negara,
          value: c.total,
        }));

        setStatCards(statCardsFromApi);
        setPenerimaanData(penerimaanFromApi);
        setUniversitasData(universitasFromApi);
        setNegaraData(negaraFromApi);

        setLoading(false);
      } catch (err) {
        console.error("Terjadi kesalahan saat mengambil data dashboard:", err);
        setErrorMessage(getAxiosErrorMessage(err));
        setLoading(false);
      }
    };

    console.log("AXIOS BASE URL:", API_BASE_URL);

    fetchDashboardData();
  }, [api]);

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
            <p className="text-center text-gray-600">
              Memuat data dashboard...
            </p>
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
                                  NEGARA_COLORS[index % NEGARA_COLORS.length]
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
