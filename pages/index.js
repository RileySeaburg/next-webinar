import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import Link from 'next/link';
import cookie from 'js-cookie';

function Home() {
  const { data, revalidate } = useSWR('/api/me', async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <div>
      <Head>
        <title>Welcome to landing page</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <h1>Next Webinar</h1>

      {loggedIn && (
        <>
          <p>Welcome {data.email}!</p>
          <h2>You are successfully logged in!</h2>
          <button
            onClick={() => {
              cookie.remove('token');
              revalidate();
            }}
          >
            Logout
          </button>
        </>
      )}
      {!loggedIn && (
        <>
          <Link href='/login'>Login</Link>
          <p>or</p>
          <Link href='/signup'>Sign Up</Link>
        </>
      )}
    </div>
  );
}

export default Home;
