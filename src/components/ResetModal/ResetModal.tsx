import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useTranslations } from 'i18n';
import { reset } from 'store/results';

type ModalProps = {
  open: boolean;
  setOpen: any;
};

const ResetModal = ({ open, setOpen }: ModalProps) => {
  const { t } = useTranslations();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleReset = () => {
    dispatch(reset());
    setOpen();
    history.push('/');
  };

  const activeClass = open ? 'is--active' : undefined;

  return (
    <div className={`modal-overlay ${activeClass}`}>
      <div className="card modal-card">
        <h1>{t('resetModalRestartAssessment')}</h1>
        <p>
          <strong>{t('resetModalTitle')}</strong>
        </p>
        <p>{t('resetModalSubtitle')}</p>
        <div className="modal-form d-flex flex-column flex-md-row justify-content-center">
          <button
            type="button"
            className="btn btn-primary btn-sm modal-btn-reset mt-4"
            onClick={setOpen}
          >
            <span>{t('resetModalCancel')}</span>
          </button>
          <button
            type="button"
            className="btn btn-outline btn-sm modal-btn-reset mt-4"
            onClick={handleReset}
          >
            <span>{t('resetModalConfirm')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ResetModal);
