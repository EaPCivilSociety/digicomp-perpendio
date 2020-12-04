import React from 'react';

export const useToggle = (initialValue: any = false) => {
  const [value, setValue] = React.useState(initialValue);

  const toggle = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setValue((v: boolean) => !v);
    },
    []
  );

  return [value, toggle];
};
