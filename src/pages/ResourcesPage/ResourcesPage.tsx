import React from 'react';

import { resources } from 'data';
import { Category } from 'store/categories/types';

const ResourcesPage = () => {
  const types = [
    'Articles, talks & case studies',
    'Tools and resource libraries',
  ];

  const printCategories = [...resources.map((c: Category) => c.category)];

  const renderAuthorYear = (author: string, year: string) => {
    if (!!author && !!year) {
      return `(${author}, ${year})`;
    } else if (!!author || !!year) {
      return `(${author || year})`;
    } else {
      return '';
    }
  };

  const renderCategoryType = (category: string, type: string) => {
    const ctResources = resources.filter(
      (r: any) => r.category === category && r.type === type
    );

    if (ctResources.length === 0) {
      return null;
    }

    return (
      <div key={type}>
        <h3>{type}</h3>

        {ctResources.map((ctr: any) => (
          <p key={ctr.title}>
            <strong>{ctr.title}</strong>
            {ctr.publication ? ', ' + ctr.publication : ''}{' '}
            {renderAuthorYear(ctr.author, ctr.year)}
            <br />
            <small>
              <a href={ctr.url}>{ctr.url}</a>
            </small>
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="card page-card">
      <h1>Resources</h1>

      {printCategories.map((c) => (
        <div key={c}>
          <h2>{c}</h2>
          {types.map((t) => renderCategoryType(c, t))}
          <br />
        </div>
      ))}

      {/* <p
        dangerouslySetInnerHTML={{
          __html: t('ResourcesCIVICUSSupportTeam'),
        }}
      /> */}
    </div>
  );
};

export default ResourcesPage;
