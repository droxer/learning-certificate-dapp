// 学生端：查看证书页面
"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import CertificateCard from "@/components/CertificateCard";
import EmptyState from "@/components/EmptyState";

interface Certificate {
  id: number;
  courseName: string;
  studentName: string;
  completionDate: string;
  grade: string;
  ipfsHash: string;
}

const formatAddress = (address?: string | null) => {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

export default function StudentPage() {
  const { t } = useTranslation();
  const { address, isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const demoCertificates = useMemo<Certificate[]>(
    () => [
      {
        id: 1,
        courseName: t("certificate.samples.blockchainFundamentals"),
        studentName: t("certificate.samples.studentName"),
        completionDate: "2023-12-01",
        grade: "A",
        ipfsHash: "Qm...",
      },
      {
        id: 2,
        courseName: t("certificate.samples.smartContract"),
        studentName: t("certificate.samples.studentName"),
        completionDate: "2024-01-15",
        grade: "A+",
        ipfsHash: "Qn...",
      },
    ],
    [t]
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setCertificates(demoCertificates);
    } else {
      setCertificates([]);
    }
  }, [address, isConnected, demoCertificates]);

  const latestCertificate = certificates[0];
  const formattedAddress = formatAddress(address);

  const totalCertificatesMessage = !isConnected
    ? t("wallet.disconnected")
    : certificates.length === 0
      ? t("certificate.noCert")
      : t("certificate.totalCount", { count: certificates.length });

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("certificate.dashboard")}
            </h1>
            <p className="text-gray-600 mt-2">
              {isConnected ? t("common.description") : t("wallet.connectTitle")}
            </p>
          </div>
          {isConnected && (
            <span className="px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              {t("wallet.connected")}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-6 mb-8">
          {hasMounted && (
            <ConnectButton chainStatus="icon" showBalance={false} />
          )}
          <div className="text-sm">
            <span className="text-gray-500">{t("wallet.address")}: </span>
            <span className="font-medium text-gray-900">{formattedAddress || "—"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{t("certificate.total")}</h2>
            <p className="text-4xl font-bold text-blue-600 my-3">{certificates.length}</p>
            <p className="text-sm text-gray-500">{totalCertificatesMessage}</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-green-50 to-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{t("certificate.latest")}</h2>
            {latestCertificate ? (
              <div className="space-y-2">
                <p className="font-semibold text-gray-900 text-lg">{latestCertificate.courseName}</p>
                <p className="text-sm text-gray-600">{latestCertificate.studentName}</p>
                <p className="text-sm text-gray-500">
                  {t("certificate.date")}: {latestCertificate.completionDate}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">{t("certificate.noCert")}</p>
            )}
          </div>
        </div>
      </section>

      {isConnected && certificates.length > 0 && (
        <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {t("certificate.latest")}
            </h2>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {t("certificate.totalCount", { count: certificates.length })}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>
        </section>
      )}

      {isConnected && certificates.length === 0 && (
        <EmptyState
          title={t("certificate.noCert")}
          description={t("certificate.noCertHint")}
          type="default"
          action={
            <div className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full inline-block">
              {t("wallet.connected")}
            </div>
          }
        />
      )}

      {!isConnected && (
        <EmptyState
          title={t("wallet.connect")}
          description={t("wallet.connectTitle")}
          type="warning"
          icon={
            <svg
              className="w-6 h-6"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '24px', height: '24px' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          }
          action={
            <div className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full inline-block">
              {t("wallet.connect")}
            </div>
          }
        />
      )}
    </div>
  );
}
