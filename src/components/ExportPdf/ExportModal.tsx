import { pdf } from '@react-pdf/renderer';
import { useTranslations } from 'i18n';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { compress } from 'shrink-string';
import { getCategories } from 'store/categories';
import { getSelectedLanguage } from 'store/languages';
import { getGoals, getResults } from 'store/results';
import { getStatements } from 'store/statements';
import PdfDocument from './PdfDocument';
import downloadFile from './util/download-file';

type ExportModalProps = {
  open: boolean;
  setOpen: () => void;
};

export default function ExportModal({ open, setOpen }: ExportModalProps) {
  const { t } = useTranslations();
  const [compilerName, setCompilerName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [generating, setGenerating] = useState(false);
  const results = useSelector(getResults);
  const categories = useSelector(getCategories);
  const language = useSelector(getSelectedLanguage);
  const statements = useSelector(getStatements);
  const goals = useSelector(getGoals);
  const [code, setCode] = useState('');

  function generateAndDownload() {
    setGenerating(true);

    pdf(
      <PdfDocument
        t={t}
        compilerName={compilerName}
        organizationName={organizationName}
        code={code}
        results={results}
        categories={categories}
        language={language}
        statements={statements}
        goals={goals}
      />
    )
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        downloadFile(url);
        URL.revokeObjectURL(url);
      })
      .finally(() => setGenerating(false));
  }

  useEffect(() => {
    if (!open) {
      setGenerating(false);
    }
  }, [open]);

  useEffect(() => {
    const generateCode = async () => {
      const json = JSON.stringify({ results, goals });
      const base64 = await compress(json);

      setCode(base64);
    };
    if (open) {
      generateCode();
    }
  }, [results, goals, open]);

  const activeClass = open ? 'is--active' : undefined;

  return (
    <div className={`modal-overlay ${activeClass}`}>
      <div className="card modal-card">
        <button type="button" className="close" onClick={setOpen}>
          &times;
        </button>
        <h1>{t('exportModalExportPdf')}</h1>
        <p>{t('exportModalDetails')}</p>

        <div className="modal-form d-flex flex-column justify-content-center">
          <div className="form-group">
            <label htmlFor="inputURL" className="sr-only">
              {t('exportModalNameCompiler')}
            </label>
            <input
              type="text"
              className="form-control"
              id="inputURL"
              placeholder={t('exportModalNameCompiler')}
              value={compilerName}
              onChange={({ target: { value } }) => setCompilerName(value)}
              disabled={generating}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputURL" className="sr-only">
              {t('exportModalNameOrganization')}
            </label>
            <input
              type="text"
              className="form-control"
              id="inputURL"
              placeholder={t('exportModalNameOrganization')}
              value={organizationName}
              onChange={({ target: { value } }) => setOrganizationName(value)}
              disabled={generating}
            />
          </div>

          <button
            className="btn btn-primary btn-sm mt-2 btn-block justify-content-center"
            onClick={generateAndDownload}
            disabled={generating}
          >
            {generating ? t('exportModalLoading') : t('exportModalExportPdf')}
          </button>
        </div>
      </div>
    </div>
  );
}
