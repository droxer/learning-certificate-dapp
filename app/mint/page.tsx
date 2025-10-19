// 教师端：发证表单页面
"use client";

import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";
import { useState } from "react";

export default function MintPage() {
  const { t } = useTranslation();
  const { address, isConnected } = useAccount();
  const [formData, setFormData] = useState({
    recipient: "",
    courseName: "",
    studentName: "",
    completionDate: "",
    grade: "",
    ipfsHash: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would call the smart contract
    console.log("Minting certificate:", formData);
    alert("Certificate minted successfully! (This is a demo)");
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-10">
      <header className="space-y-4">
        <span className="feature-badge">{t("certificate.mintTitle")}</span>
        <h1 className="section-title">{t("certificate.mintTitle")}</h1>
        <p className="max-w-2xl text-base text-slate-300">
          {t("common.description")}
        </p>
      </header>

      {!isConnected ? (
        <div className="glass-panel flex flex-col items-center gap-4 px-6 py-10 text-center">
          <h3 className="text-2xl font-semibold text-white">{t("wallet.connectTitle")}</h3>
          <p className="max-w-lg text-slate-300">{t("wallet.connect")}</p>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-wide text-slate-300">
            {t("wallet.ready")}
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel space-y-6 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="form-label">{t("certificate.studentName")}</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label">
                {t("certificate.recipient")} ({t("form.required")})
              </label>
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                className="form-input"
                placeholder="0x..."
                required
              />
            </div>
            <div>
              <label className="form-label">
                {t("certificate.courseName")} ({t("form.required")})
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label">
                {t("certificate.completionDate")} ({t("form.required")})
              </label>
              <input
                type="date"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label">{t("certificate.grade")}</label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">{t("certificate.ipfsHash")}</label>
              <input
                type="text"
                name="ipfsHash"
                value={formData.ipfsHash}
                onChange={handleChange}
                className="form-input"
                placeholder="Qm..."
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              {t("certificate.submit")} &rarr; {formData.recipient || "0x..."}
            </p>
            <button type="submit" className="btn-primary sm:w-auto">
              {t("certificate.submit")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
