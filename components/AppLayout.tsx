const Header = () => {
  return (
    <nav className="fixed h-16 w-full top-0 z-[100] border-b border-gray-900/10 bg-opacity-80 backdrop-blur-md">
      <div className="text-white text-center h-full flex items-center justify-center text-2xl">
        Vercel-OMP
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="flex">
      <div></div>
    </footer>
  );
};

const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className="pt-16 min-h-screen flex-col bg-white bg-gradient-to-br from-dark-mode-basic-bg-lighten to-dark-mode-basic-bg">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
