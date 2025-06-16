// pages/404.js

export default function Custom404() {
  return (
    <div style={{
      backgroundColor: 'white',
      color: 'black',
      height: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif'
    }}>
      <img src="/404.jpg" alt="404 :(" className="md:w-[20vw] w-40" />
      <h1 className="text-rose-700">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-700">Sorry, we couldn’t find the page you were looking for.</p>
    </div>
  );
}
