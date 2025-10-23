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
    <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
            {t("certificate.course")}
          </span>
          <h2 className="text-xl font-bold text-gray-900 mt-1">
            {certificate.courseName}
          </h2>
        </div>
        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          {certificate.grade || t("certificate.pending")}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-gray-600">{t("certificate.issued")}</span>
          <span className="font-medium text-gray-900">{certificate.studentName}</span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-gray-600">{t("certificate.date")}</span>
          <span className="font-medium text-gray-900">{certificate.completionDate}</span>
        </div>
        {certificate.ipfsHash && (
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-gray-600">{t("certificate.ipfsLabel")}</span>
            <span className="font-mono text-sm text-blue-600 truncate max-w-[120px]">{certificate.ipfsHash}</span>
          </div>
        )}
      </div>

      <button className="mt-6 w-full btn btn-secondary text-sm py-2.5">
        {t("certificate.view")}
      </button>
    </div>
  );
};

export default CertificateCard;
