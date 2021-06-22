import dynamic from "next/dynamic";
const Aside = dynamic(() => import("./Aside"));

const Layout = ({ children }) => {
  return (
    <div className='layoutWrapper'>
      <div className='wrapper-lg no-border'>
        <main className='main-content no-pad'>{children}</main>
      </div>
      {/* Aside */}
      <Aside />
    </div>
  );
};

export default Layout;
