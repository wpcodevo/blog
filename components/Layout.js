import dynamic from "next/dynamic";
const Aside2 = dynamic(() => import("./Aside2"));

const Layout = ({ children, blog }) => {
  return (
    <div className='layoutWrapper'>
      <div className='wrapper-lg no-border'>
        <main className='main-content no-pad'>{children}</main>
      </div>
      {/* Aside */}
      <Aside2 blog={blog} />
    </div>
  );
};

export default Layout;
