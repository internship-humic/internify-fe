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

type ApplicationsListResponse = {
  status: boolean;
  data: Array<{
    universitas?: string | null;
  }>;
  message?: string;
  code?: number;
};

const CATEGORY_COLORS = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
  "#393b79", "#637939", "#8c6d31", "#843c39", "#7b4173",
  "#3182bd", "#e6550d", "#31a354", "#756bb1", "#636363",
  "#6baed6", "#fd8d3c", "#74c476", "#9e9ac8", "#969696",
  "#9ecae1", "#fdae6b", "#a1d99b", "#bcbddc", "#bdbdbd",
];


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  "https://internify-ruddy.vercel.app";

// helper: group by key -> count
function groupCount(list: Array<string>) {
  const map = new Map<string, number>();
  for (const raw of list) {
    const key = (raw || "").trim();
    if (!key) continue;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function PieLegend({
  data,
  colors,
}: {
  data: ChartDataItem[];
  colors: string[];
}) {
  return (
    <div className="space-y-3 text-sm">
      {data.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-gray-700">{item.name}</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [statCards, setStatCards] = useState<StatCard[]>([]);

  const [positionData, setPositionData] = useState<ChartDataItem[]>([]);
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
      headers: { Accept: "application/json" },
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
          setErrorMessage("Token tidak ditemukan di cookie. Silakan login ulang.");
          setLoading(false);
          return;
        }

        const [statsRes, positionRes, countryRes, batchRes, appsRes] =
          await Promise.all([
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
            api.get<ApplicationsListResponse>("/lamaran-magang-api/statistics/university"),
          ]);

        const statsJson = statsRes.data;
        const positionJson = positionRes.data;
        const countryJson = countryRes.data;
        const batchJson = batchRes.data;
        const appsJson = appsRes.data;

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

        if (!appsJson?.status) {
          console.warn(
            "Fetch applicants list gagal (untuk universitas chart):",
            appsJson?.message
          );
        }

        const stats = statsJson.data;
        const positions = positionJson.data || [];
        const countries = countryJson.data || [];

        // === Stat Cards ===
        const statCardsFromApi: StatCard[] = [
          {
            title: "Total Pendaftar",
            value: stats.total_pendaftar,
            icon: <Users size={24} />,
            iconColor: "#0088ff",
          },
          {
            title: "Total Diterima",
            value: stats.total_diterima,
            icon: <UserCheck size={24} />,
            iconColor: "#00cc00",
          },
          {
            title: "Total Ditolak",
            value: stats.total_ditolak,
            icon: <UserX size={24} />,
            iconColor: "#ff3333",
          },
          {
            title: "Sedang Diproses",
            value: stats.sedang_diproses,
            icon: <Clock size={24} />,
            iconColor: "#ffaa00",
          },
        ];

        // === Position ===
        const positionCounts: ChartDataItem[] = positions.map((p) => ({
          name: p.posisi,
          value: p.total,
        }));

        // === Universitas ===
        const applicants = appsJson?.status ? appsJson.data || [] : [];
        const uniCountsRaw = groupCount(
          applicants.map((a) => (a.universitas ?? "").toString())
        );

        // Top 5 + Lainnya
        const topN = 5;
        const top = uniCountsRaw.slice(0, topN);
        const rest = uniCountsRaw.slice(topN);
        const othersValue = rest.reduce((acc, x) => acc + x.value, 0);
        const uniCounts: ChartDataItem[] =
          othersValue > 0 ? [...top, { name: "Lainnya", value: othersValue }] : top;

        // === Negara ===
        const negaraCounts: ChartDataItem[] = countries.map((c) => ({
          name: c.negara,
          value: c.total,
        }));

        // === Penerimaan ===
        const penerimaanCounts: ChartDataItem[] = [
          { name: "Total Pendaftar", value: stats.total_pendaftar },
          { name: "Total Diterima", value: stats.total_diterima },
          { name: "Total Ditolak", value: stats.total_ditolak },
        ];

        setStatCards(statCardsFromApi);
        setPositionData(positionCounts);
        setUniversitasData(uniCounts);
        setNegaraData(negaraCounts);
        setPenerimaanData(penerimaanCounts);

        setLoading(false);
      } catch (err) {
        console.error("Terjadi kesalahan saat mengambil data dashboard:", err);
        setErrorMessage(getAxiosErrorMessage(err));
        setLoading(false);
      }
    };

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

                    <p className="text-2xl font-bold text-gray-900">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* ====== Charts ====== */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* 1) Position */}
                <div className="rounded-lg border border-gray-300 bg-white p-6">
                  <h2 className="mb-6 text-lg font-bold text-gray-900">
                    Position
                  </h2>

                  <div className="mb-6 flex justify-center">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={positionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {positionData.map((_, index) => (
                            <Cell
                              key={`position-cell-${index}`}
                              fill={
                                CATEGORY_COLORS[
                                  index % CATEGORY_COLORS.length
                                ]
                              }
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <PieLegend data={positionData} colors={CATEGORY_COLORS} />
                </div>

                {/* 2) Universitas */}
                <div className="rounded-lg border border-gray-300 bg-white p-6">
                  <h2 className="mb-6 text-lg font-bold text-gray-900">
                    Universitas
                  </h2>

                  <div className="mb-6 flex justify-center">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={universitasData}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {universitasData.map((_, index) => (
                            <Cell
                              key={`universitas-cell-${index}`}
                              fill={
                                CATEGORY_COLORS[
                                  index % CATEGORY_COLORS.length
                                ]
                              }
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <PieLegend
                    data={universitasData}
                    colors={CATEGORY_COLORS}
                  />
                </div>

                {/* 3) Negara */}
                <div className="rounded-lg border border-gray-300 bg-white p-6">
                  <h2 className="mb-6 text-lg font-bold text-gray-900">
                    Negara
                  </h2>

                  <div className="mb-6 flex justify-center">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={negaraData}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {negaraData.map((_, index) => (
                            <Cell
                              key={`negara-cell-${index}`}
                              fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <PieLegend data={negaraData} colors={CATEGORY_COLORS} />
                </div>

                {/* 4) Penerimaan */}
                <div className="rounded-lg border border-gray-300 bg-white p-6">
                  <h2 className="mb-6 text-lg font-bold text-gray-900">
                    Penerimaan
                  </h2>

                  <div className="mb-6 flex justify-center">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={penerimaanData}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {penerimaanData.map((_, index) => (
                            <Cell
                              key={`penerimaan-cell-${index}`}
                              fill={
                                CATEGORY_COLORS[
                                  index % CATEGORY_COLORS.length
                                ]
                              }
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <PieLegend data={penerimaanData} colors={CATEGORY_COLORS} />
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
