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
  status: boolean;
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

//type baru untuk menyesuaikan perubahan pada batch
type LamaranItem = {
  id: number;
  id_mahasiswa: number;
  id_lowongan_magang: string;
  status: string;
  batch: number;
  batch_data: { id: number; batch_number: number; is_active: boolean };
  lowongan_magang: { posisi: string; kelompok_peminatan: string };
  mahasiswa: { nama_depan: string; nama_belakang: string };
  created_at: string;
  update_at: string;
};

type LamaranListResponse = {
  status: boolean;
  data: LamaranItem[];
  message?: string;
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

const EMPTY_PIE = [{ name: "Tidak ada data", value: 1 }];
const EMPTY_COLOR = ["#e5e7eb"]

function PieLegend({
  data,
  colors,
}: {
  data: ChartDataItem[];
  colors: string[];
}) {
  if (data.length === 0) {
    return (
      <p className="text-center text-sm text-gray-400">Tidak ada data</p>
    )
  }
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

  const [batches, setBatches] = useState<BatchResponse["data"]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
  const [batchDropdownOpen, setBatchDropdownOpen] = useState(false);

  const selectedBatch =
    batches.find((b) => b.id === selectedBatchId) ?? null;

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
    const fetchBatches = async () => {
      try {
        const res = await api.get<BatchResponse>("/batch-api/");
        if (res.data?.status) {
          const list = res.data.data || [];
          setBatches(list);
          const defaultBatch = list.find((b) => b.is_active) ?? list[0];
          if (defaultBatch) setSelectedBatchId(defaultBatch.id);
        } else {
          setErrorMessage("Gagal mengambil daftar batch.");
          setLoading(false);
        }
      } catch (err) {
        setErrorMessage(getAxiosErrorMessage(err));
        setLoading(false);
      }
    };
    fetchBatches();
  }, [api]);

  useEffect(() => {
    if (selectedBatchId === null) return;
    const batch = batches.find((b) => b.id === selectedBatchId);
    if (!batch) return;
    const batchNumber = batch.batch_number;

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

        const batchParams = { params: { batch: batchNumber } };

        const handle404 = (err: unknown) => {
          if (axios.isAxiosError(err) && err.response?.status === 404) {
            return { data: { status: true, data: [] } } as any;
          }
          throw err;
        };

        const [lamaranRes, countryRes, uniRes] = await Promise.all([
          api.get<LamaranListResponse>("/lamaran-magang-api/get", {
            params: { limit: 9999, page: 1 },
          }),
          api
            .get<CountryStatsResponse>("/lamaran-magang-api/statistics/country", batchParams)
            .catch(handle404),
          api
            .get<ApplicationsListResponse>("/lamaran-magang-api/statistics/university", batchParams)
            .catch(handle404),
        ]);

        const all = lamaranRes.data?.data ?? [];

        // filter manual per batch
        const rows = all.filter((r) => Number(r.batch) === Number(batchNumber));

        const norm = (s?: string) => (s ?? "").toLowerCase().trim();

        // === Stat Cards ===
        const totalPendaftar = rows.length;
        const totalDiterima = rows.filter((r) => norm(r.status) === "diterima").length;
        const totalDitolak = rows.filter((r) => norm(r.status) === "ditolak").length;
        const sedangDiproses = rows.filter((r) => norm(r.status) === "diproses").length;

        const statCardsFromApi: StatCard[] = [
          { title: "Total Pendaftar", value: totalPendaftar, icon: <Users size={24} />, iconColor: "#0088ff" },
          { title: "Total Diterima", value: totalDiterima, icon: <UserCheck size={24} />, iconColor: "#00cc00" },
          { title: "Total Ditolak", value: totalDitolak, icon: <UserX size={24} />, iconColor: "#ff3333" },
          { title: "Sedang Diproses", value: sedangDiproses, icon: <Clock size={24} />, iconColor: "#ffaa00" },
        ];

        // === Position (dari nested lowongan_magang.posisi) ===
        const positionCounts = groupCount(
          rows.map((r) => (r.lowongan_magang?.posisi ?? "").trim())
        );

        // === Penerimaan ===
        // hanya isi kalau ada data, biar fallback EMPTY_PIE aktif saat kosong
        const penerimaanCounts: ChartDataItem[] = totalPendaftar > 0
          ? [
            { name: "Total Pendaftar", value: totalPendaftar },
            { name: "Total Diterima", value: totalDiterima },
            { name: "Total Ditolak", value: totalDitolak },
          ]
          : [];
        // === Negara (dari /statistics/country?batch=batchNumber) ===
        const countries = countryRes.data?.data ?? [];
        const negaraCounts: ChartDataItem[] = countries.map((c) => ({
          name: c.negara,
          value: c.total,
        }));

        // === Universitas (dari /statistics/university?batch=batchNumber) ===
        const uniRaw: Array<{ universitas: string; total: number }> =
          (uniRes.data as any)?.data ?? [];
        const uniSorted = [...uniRaw].sort((a, b) => b.total - a.total);
        const top = uniSorted.slice(0, 5);
        const othersValue = uniSorted.slice(5).reduce((acc, x) => acc + x.total, 0);
        const uniCounts: ChartDataItem[] = [
          ...top.map((u) => ({ name: u.universitas, value: u.total })),
          ...(othersValue > 0 ? [{ name: "Lainnya", value: othersValue }] : []),
        ];

        setStatCards(statCardsFromApi);
        setPositionData(positionCounts);
        setPenerimaanData(penerimaanCounts);
        setNegaraData(negaraCounts);
        setUniversitasData(uniCounts);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setErrorMessage(getAxiosErrorMessage(err));
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [api, selectedBatchId, batches]);

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
              <div className="relative">
                {/* Batch Filter */}
                <button
                  onClick={() => setBatchDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-[20px] py-[10px] text-gray-700 hover:bg-gray-50">
                  {selectedBatch
                    ? `Batch ${selectedBatch.batch_number} - ${new Date(selectedBatch.created_at).getFullYear()}`
                    : "Pilih Batch"}
                  <ChevronDown size={18} />
                </button>

                {batchDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-56 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                    {batches.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          setSelectedBatchId(b.id);
                          setBatchDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-50 ${b.id === selectedBatchId
                          ? "font-semibold text-blue-600"
                          : "text-gray-700"
                          }`}
                      >
                        <span>
                          Batch {b.batch_number} - {new Date(b.created_at).getFullYear()}
                        </span>
                        {b.is_active && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                            Aktif
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Search Box */}
                {/* <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-[20px] py-[10px]">
                  <Search size={18} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nama, Jurusan,"
                    className="w-52 text-sm text-gray-700 placeholder-gray-400 outline-none"
                  />
                </div> */}
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
                          data={positionData.length > 0 ? positionData : EMPTY_PIE}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {(positionData.length > 0 ? positionData : EMPTY_PIE).map((_, index) => (
                            <Cell
                              key={`position-cell-${index}`}
                              fill={
                                positionData.length > 0
                                  ? CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                                  : EMPTY_COLOR[0]
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
                          data={universitasData.length > 0 ? universitasData : EMPTY_PIE}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {(universitasData.length > 0 ? universitasData : EMPTY_PIE).map((_, index) => (
                            <Cell
                              key={`universitas-cell-${index}`}
                              fill={
                                universitasData.length > 0
                                  ? CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                                  : EMPTY_COLOR[0]
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
                          data={negaraData.length > 0 ? negaraData : EMPTY_PIE}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {(negaraData.length > 0 ? negaraData : EMPTY_PIE).map((_, index) => (
                            <Cell
                              key={`negara-cell-${index}`}
                              fill={
                                negaraData.length > 0
                                  ? CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                                  : EMPTY_COLOR[0]
                              }
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
                          data={penerimaanData.length > 0 ? penerimaanData : EMPTY_PIE}
                          cx="50%"
                          cy="50%"
                          innerRadius={0}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {(penerimaanData.length > 0 ? penerimaanData : EMPTY_PIE).map((_, index) => (
                            <Cell
                              key={`penerimaan-cell-${index}`}
                              fill={
                                penerimaanData.length > 0
                                  ? CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                                  : EMPTY_COLOR[0]
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
