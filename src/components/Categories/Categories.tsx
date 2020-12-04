import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

import { getCategories } from 'store/categories';
import { DEFAULT_LANGUAGE, getSelectedLanguage } from 'store/languages';
import { getResults } from 'store/results';

import Category from './Category';
import { getStatements } from 'store/statements';

type CategoriesProps = {
  showOnlyUnanswered?: boolean;
};

const Categories = ({ showOnlyUnanswered }: CategoriesProps) => {
  const categories = useSelector(getCategories);
  const selectedLanguage = useSelector(getSelectedLanguage);
  const results = useSelector(getResults);
  const statements = useSelector(getStatements);
  const history = useHistory();

  return (
    <div className="categories">
      <div className="container">
        <div className="row categories-row">
          {categories.map((cat) => {
            const categoryResults = results.filter(
              (r) => r.category === cat.id
            );

            const categoryStatements = statements.filter(
              (s) => s.category === cat.id
            );

            // If one category has all statements answered remove it from the list
            if (categoryResults.length === categoryStatements.length) {
              return null;
            }

            if (showOnlyUnanswered && categoryResults.length > 0) {
              return null;
            }

            const categoryData =
              cat[selectedLanguage.id] || cat[DEFAULT_LANGUAGE];

            return (
              <div key={cat.id} className="col-12 col-md-4">
                <Category
                  title={categoryData.name}
                  description={categoryData.description}
                  status={!_.isEmpty(categoryResults)}
                  onClick={() => history.push(`/statement/${cat.id}`)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
