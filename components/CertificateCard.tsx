// 证书卡片组件
"use client";

import { useTranslation } from "react-i18next";

export interface Certificate {
  id: number;
  courseName: string;
  studentName: string;
  completionDate: string;
  grade: string;
  ipfsHash: string;
}

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="card-surface flex flex-col gap-5">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-200">
            {t("certificate.course")}
          </span>
          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
            {certificate.grade || t("certificate.pending")}
          </span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-white">{certificate.courseName}</h2>
      </div>

      <dl className="grid gap-3 text-sm text-slate-300">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
          <dt className="font-medium text-slate-200">{t("certificate.issued")}</dt>
          <dd className="text-right text-white">{certificate.studentName}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
          <dt className="font-medium text-slate-200">{t("certificate.date")}</dt>
          <dd className="text-right text-white">{certificate.completionDate}</dd>
        </div>
        {certificate.ipfsHash && (
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3">
            <dt className="font-medium text-indigo-200">IPFS</dt>
            <dd className="truncate text-right text-indigo-100">{certificate.ipfsHash}</dd>
          </div>
        )}
      </dl>

      <button className="btn-secondary self-start">
        {t("certificate.view")}
      </button>
    </div>
  );
};

export default CertificateCard;
