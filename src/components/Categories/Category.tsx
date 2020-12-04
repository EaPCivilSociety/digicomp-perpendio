/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslations } from 'i18n';
import React from 'react';

type CategoryProps = {
  title: string;
  description: string;
  status: boolean;
  onClick(): void;
};

const Category = ({ title, description, status, onClick }: CategoryProps) => {
  const { t } = useTranslations();

  return (
    <div onClick={onClick} className="card card-elevation-xs category-card">
      <div className="card-header">{title}</div>
      <div className="card-status">
        {status && <div className="status">{t('categoryInProgress')}</div>}
      </div>
      <div className="card-content">{description}</div>
    </div>
  );
};

export default Category;
