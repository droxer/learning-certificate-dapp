// 教师端：发证表单页面
"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import CertificatePreview from "@/components/CertificateCard";
import EmptyState from "@/components/EmptyState";
import type { Certificate as CertificateData } from "@/components/CertificateCard";

export default function MintPage() {
  const { t } = useTranslation();
  const { isConnected } = useAccount();
  const [formData, setFormData] = useState({
    recipient: "",
    courseName: "",
    studentName: "",
    completionDate: "",
    grade: "",
    ipfsHash: "",
  });

  const [formErrors, setFormErrors] = useState({
    recipient: "",
    courseName: "",
    studentName: "",
    completionDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {
      recipient: "",
      courseName: "",
      studentName: "",
      completionDate: ""
    };

    let isValid = true;

    if (!formData.studentName.trim()) {
      errors.studentName = t("certificate.studentNameRequired");
      isValid = false;
    }

    if (!formData.recipient.trim()) {
      errors.recipient = t("certificate.recipientRequired");
      isValid = false;
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(formData.recipient)) {
      errors.recipient = t("certificate.recipientInvalid");
      isValid = false;
    }

    if (!formData.courseName.trim()) {
      errors.courseName = t("certificate.courseNameRequired");
      isValid = false;
    }

    if (!formData.completionDate) {
      errors.completionDate = t("certificate.completionDateRequired");
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Minting certificate:", formData);
      alert(t("certificate.mintSuccessDemo"));
    }
  };

  const defaultPreview: CertificateData = useMemo(
    () => ({
      id: 0,
      courseName: t("certificate.samples.decentralizedIdentity"),
      studentName: t("certificate.samples.studentName"),
      completionDate: "2024-01-10",
      grade: "A",
      ipfsHash: "Qm...",
    }),
    [t]
  );

  const previewCertificate: CertificateData = useMemo(
    () => ({
      id: 0,
      courseName: formData.courseName || defaultPreview.courseName,
      studentName: formData.studentName || defaultPreview.studentName,
      completionDate: formData.completionDate || defaultPreview.completionDate,
      grade: formData.grade || defaultPreview.grade,
      ipfsHash: formData.ipfsHash || defaultPreview.ipfsHash,
    }),
    [formData, defaultPreview]
  );

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t("certificate.mintTitle")}
            </h1>
            <p className="text-gray-600 mt-2">
              {t("common.description")}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ConnectButton chainStatus="icon" showBalance={false} />
            <span className={`px-4 py-2 text-sm font-medium rounded-full ${
              isConnected
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}>
              {isConnected ? t("wallet.connected") : t("wallet.disconnected")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t("certificate.issuanceChecklist")}
            </h2>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 text-sm font-bold rounded-full flex items-center justify-center mt-0.5">1</span>
                <span className="text-gray-700 pt-1">{t("certificate.courseName")} <span className="text-red-500">*</span></span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 text-sm font-bold rounded-full flex items-center justify-center mt-0.5">2</span>
                <span className="text-gray-700 pt-1">{t("certificate.recipient")} (0x…)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 text-sm font-bold rounded-full flex items-center justify-center mt-0.5">3</span>
                <span className="text-gray-700 pt-1">{t("certificate.completionDate")} <span className="text-red-500">*</span></span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 text-sm font-bold rounded-full flex items-center justify-center mt-0.5">4</span>
                <span className="text-gray-700 pt-1">
                  {t("common.optionalField", { field: t("certificate.ipfsHash") })}
                </span>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-blue-50 text-blue-700 text-sm rounded-xl">
              {t("certificate.ipfsReminder")}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("certificate.statistics")}</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">{t("certificate.metrics.minted")}</span>
                <span className="font-bold text-lg text-gray-900">128</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">{t("certificate.metrics.courses")}</span>
                <span className="font-bold text-lg text-gray-900">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t("certificate.metrics.wallets")}</span>
                <span className="font-bold text-lg text-gray-900">342</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!isConnected && (
        <EmptyState
          title={t("wallet.connectTitle")}
          description={t("wallet.connect")}
          type="warning"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("certificate.details")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="form-label">
                  {t("certificate.studentName")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className={`form-input w-full ${
                    formErrors.studentName ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                  required
                />
                {formErrors.studentName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.studentName}</p>
                )}
              </div>

              <div>
                <label className="form-label">
                  {t("certificate.recipient")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleChange}
                  className={`form-input w-full ${
                    formErrors.recipient ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                  placeholder="0x..."
                  required
                />
                {formErrors.recipient && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.recipient}</p>
                )}
              </div>

              <div>
                <label className="form-label">
                  {t("certificate.courseName")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  className={`form-input w-full ${
                    formErrors.courseName ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                  required
                />
                {formErrors.courseName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.courseName}</p>
                )}
              </div>

              <div>
                <label className="form-label">
                  {t("certificate.completionDate")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleChange}
                  className={`form-input w-full ${
                    formErrors.completionDate ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
                  }`}
                  required
                />
                {formErrors.completionDate && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.completionDate}</p>
                )}
              </div>

              <div>
                <label className="form-label">{t("certificate.grade")}</label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="form-input w-full"
                />
              </div>

              <div>
                <label className="form-label">{t("certificate.ipfsHash")}</label>
                <input
                  type="text"
                  name="ipfsHash"
                  value={formData.ipfsHash}
                  onChange={handleChange}
                  className="form-input w-full"
                  placeholder="Qm..."
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                {t("certificate.submit")} → {formData.recipient || "0x..."}
              </p>
              <button
                type="submit"
                className="btn btn-primary px-6 py-3 rounded-lg font-medium"
                disabled={!isConnected}
              >
                {t("certificate.submit")}
              </button>
            </div>
          </form>
        </div>

        <div>
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("certificate.preview")}</h3>
            <p className="text-sm text-gray-600">
              {t("certificate.previewDescription")}
            </p>
          </div>
          <CertificatePreview certificate={previewCertificate} />
        </div>
      </section>
    </div>
  );
}
