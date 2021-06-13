import Aside from "./Aside";

const Layout = ({ children, tags }) => {
  return (
    <div className='layoutWrapper'>
      <div className='wrapper-lg no-border'>
        <main className='main-content no-pad'>{children}</main>
      </div>
      {/* Aside */}
      <Aside tags={tags} />
    </div>
  );
};

export default Layout;
