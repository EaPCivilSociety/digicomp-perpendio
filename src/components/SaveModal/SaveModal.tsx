import React, { memo, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import { compress } from 'shrink-string';
import { useTranslations } from 'i18n';

import { getGoals, getResults } from 'store/results';

type ModalProps = {
  open: boolean;
  setOpen: any;
};

const SaveModal = ({ open, setOpen }: ModalProps) => {
  const results = useSelector(getResults);
  const goals = useSelector(getGoals);
  const { t } = useTranslations();

  const [clipboard, setClipboard] = useState({
    value: '',
    copied: false,
  });

  useEffect(() => {
    const generateCode = async () => {
      const json = JSON.stringify({ results, goals });
      const base64 = await compress(json);

      setClipboard({ value: base64, copied: false });
    };
    generateCode();
  }, [results, goals]);

  const activeClass = open ? 'is--active' : undefined;

  return (
    <div className={`modal-overlay ${activeClass}`}>
      <div className="card modal-card">
        <h1>{t('saveModalSaveYourProgress')}</h1>
        <p>{t('saveModalCopyThisCode')}</p>

        <div className="modal-form d-flex flex-column justify-content-center">
          <div className="input-group mr-0 mr-md-3 mb-3 mb-md-0 modal-input-group">
            <label htmlFor="inputURL" className="sr-only">
              {t('saveModalCode')}
            </label>
            <input
              type="text"
              className="form-control modal-input"
              id="inputURL"
              placeholder={t('saveModalCode')}
              value={clipboard.value}
              onChange={({ target: { value } }) =>
                setClipboard({ value, copied: false })
              }
            />
            <div className="input-group-append">
              <CopyToClipboard
                text={clipboard.value}
                onCopy={() =>
                  setClipboard((prevState) => ({ ...prevState, copied: true }))
                }
              >
                <span className="btn btn-outline-secondary btn-copy-to-clipboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />{' '}
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  </svg>
                </span>
              </CopyToClipboard>
            </div>
          </div>

          {clipboard.copied ? (
            <div className="mb-2 mt-1 text-center">
              <span>{t('saveModalCopied')}</span>
            </div>
          ) : null}

          <button
            type="button"
            className="btn btn-primary btn-sm modal-btn-done mt-4"
            onClick={setOpen}
          >
            <span>{t('saveModalDone')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(SaveModal);
