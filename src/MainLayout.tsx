import React from 'react';

import Navigation from 'components/Navigation/Navigation';
import Footer from 'components/Footer/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="app">
      <Navigation />
      <main className="content">{children}</main>
      <Footer />
      <div className="app-background" />
    </div>
  );
};

export default MainLayout;
