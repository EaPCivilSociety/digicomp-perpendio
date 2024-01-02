import React from 'react';

import { resources, categories } from 'data';
import { Category } from 'store/categories/types';

const ResourcesPage = () => {
  const printCategories = [
    'General Resources',
    ...categories.map((c: Category) => c.en.name),
  ];

  const renderAuthorYear = (author: string, year: string) => {
    if (!!author && !!year) {
      return `(${author}, ${year})`;
    } else if (!!author || !!year) {
      return `(${author || year})`;
    } else {
      return '';
    }
  };

  return (
    <div className="card page-card">
      <h1>Resources</h1>

      {printCategories.map((c) => (
        <div className="resources-section" key={c}>
          <h3 className="resources-h3">{c}</h3>
          {resources
            .filter((r: any) => r.category === c)
            .map((ctr: any) => (
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
