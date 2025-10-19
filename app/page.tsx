// 学生端：查看证书页面
"use client";

import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import CertificateCard from "@/components/CertificateCard";

interface Certificate {
  id: number;
  courseName: string;
  studentName: string;
  completionDate: string;
  grade: string;
  ipfsHash: string;
}

export default function StudentPage() {
  const { t } = useTranslation();
  const { address, isConnected } = useAccount();
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // 这里应该从区块链读取证书数据
  // For demo purposes, we'll use mock data
  useEffect(() => {
    if (isConnected && address) {
      // Mock certificates data
      setCertificates([
        {
          id: 1,
          courseName: "Blockchain Fundamentals",
          studentName: "张三",
          completionDate: "2023-12-01",
          grade: "A",
          ipfsHash: "Qm..."
        },
        {
          id: 2,
          courseName: "Smart Contract Development",
          studentName: "张三",
          completionDate: "2024-01-15",
          grade: "A+",
          ipfsHash: "Qn..."
        }
      ]);
    }
  }, [address, isConnected]);

  return (
    <div className="space-y-10">
      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="feature-badge">{t("certificate.title")}</span>
          {isConnected && address && (
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
              {t("wallet.connected")}
            </span>
          )}
        </div>
        <div className="space-y-3">
          <h2 className="section-title">
            {isConnected ? t("certificate.dashboard") : t("wallet.connect")}
          </h2>
          <p className="max-w-3xl text-base text-slate-300">
            {t("common.description")}
          </p>
        </div>
        {isConnected && address && (
          <div className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            <div className="glass-panel px-5 py-4">
              <p className="text-xs uppercase tracking-widest text-indigo-200">
                {t("wallet.address")}
              </p>
              <p className="mt-2 truncate text-sm font-semibold text-white">{address}</p>
            </div>
            <div className="glass-panel px-5 py-4">
              <p className="text-xs uppercase tracking-widest text-indigo-200">
                {t("certificate.total")}
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">{certificates.length}</p>
            </div>
            <div className="glass-panel px-5 py-4 sm:col-span-2 lg:col-span-1">
              <p className="text-xs uppercase tracking-widest text-indigo-200">
                {t("certificate.latest")}
              </p>
              <p className="mt-2 text-sm text-slate-200">
                {certificates[0]?.courseName ?? t("certificate.noCert")}
              </p>
            </div>
          </div>
        )}
      </header>

      {!isConnected ? (
        <div className="glass-panel flex flex-col items-center gap-4 px-6 py-10 text-center">
          <h3 className="text-2xl font-semibold text-white">{t("wallet.connectTitle")}</h3>
          <p className="max-w-lg text-slate-300">{t("wallet.connect")}</p>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-wide text-slate-300">
            {t("wallet.ready")}
          </span>
        </div>
      ) : certificates.length === 0 ? (
        <div className="glass-panel flex flex-col items-center gap-4 px-6 py-10 text-center">
          <h3 className="text-2xl font-semibold text-white">{t("certificate.noCert")}</h3>
          <p className="max-w-lg text-slate-300">{t("certificate.noCertHint")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      )}
    </div>
  );
}
